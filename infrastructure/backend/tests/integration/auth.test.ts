import { TestDatabase, TestRedis, generateTestToken, createTestUser } from '../utils/test-helpers';
import { UserService } from '../../src/services/user.service';
import jwt from 'jsonwebtoken';

describe('Authentication and Authorization Integration Tests', () => {
  let testDb: TestDatabase;
  let testRedis: TestRedis;
  let userService: UserService;

  beforeAll(async () => {
    testDb = new TestDatabase();
    testRedis = new TestRedis();
    await testDb.connect();
    await testRedis.connect();
  });

  afterAll(async () => {
    await testDb.disconnect();
    await testRedis.disconnect();
  });

  beforeEach(async () => {
    await testDb.cleanup();
    await testRedis.cleanup();
    userService = new UserService(testDb.getClient(), testRedis.getClient());
  });

  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'SecurePassword123!',
        authProvider: 'email' as const,
      };

      const result = await userService.registerUser(userData);

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(userData.email);
      expect(result.user.name).toBe(userData.name);
      expect(result.user.role).toBe('learner');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should not allow duplicate email registration', async () => {
      const userData = {
        email: 'duplicate@example.com',
        name: 'User One',
        password: 'Password123!',
        authProvider: 'email' as const,
      };

      await userService.registerUser(userData);

      await expect(
        userService.registerUser(userData)
      ).rejects.toThrow('User already exists');
    });

    it('should hash password before storing', async () => {
      const userData = {
        email: 'secure@example.com',
        name: 'Secure User',
        password: 'PlainTextPassword',
        authProvider: 'email' as const,
      };

      const result = await userService.registerUser(userData);
      const user = await testDb.getClient().user.findUnique({
        where: { id: result.user.id },
      });

      expect(user?.passwordHash).toBeDefined();
      expect(user?.passwordHash).not.toBe(userData.password);
    });
  });

  describe('User Login', () => {
    it('should login with correct credentials', async () => {
      const password = 'CorrectPassword123!';
      const user = await createTestUser(testDb.getClient(), {
        email: 'login@example.com',
        passwordHash: await userService.hashPassword(password),
      });

      const result = await userService.loginUser({
        email: user.email,
        password,
      });

      expect(result.user.id).toBe(user.id);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should reject login with incorrect password', async () => {
      const user = await createTestUser(testDb.getClient(), {
        email: 'wrongpass@example.com',
        passwordHash: await userService.hashPassword('CorrectPassword'),
      });

      await expect(
        userService.loginUser({
          email: user.email,
          password: 'WrongPassword',
        })
      ).rejects.toThrow('Invalid credentials');
    });

    it('should reject login for non-existent user', async () => {
      await expect(
        userService.loginUser({
          email: 'nonexistent@example.com',
          password: 'AnyPassword',
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('JWT Token Management', () => {
    it('should generate valid JWT tokens', async () => {
      const user = await createTestUser(testDb.getClient());
      const token = generateTestToken(user.id, user.role);

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      expect(decoded.userId).toBe(user.id);
      expect(decoded.role).toBe(user.role);
    });

    it('should validate JWT tokens correctly', async () => {
      const user = await createTestUser(testDb.getClient());
      const token = generateTestToken(user.id, user.role);

      const result = await userService.validateToken(token);

      expect(result.valid).toBe(true);
      expect(result.userId).toBe(user.id);
      expect(result.role).toBe(user.role);
    });

    it('should reject expired tokens', async () => {
      const user = await createTestUser(testDb.getClient());
      const expiredToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '-1h' }
      );

      const result = await userService.validateToken(expiredToken);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('expired');
    });

    it('should reject invalid tokens', async () => {
      const result = await userService.validateToken('invalid.token.here');

      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('OAuth Authentication', () => {
    it('should handle Google OAuth callback', async () => {
      const oauthData = {
        provider: 'google' as const,
        email: 'oauth@example.com',
        name: 'OAuth User',
        providerId: 'google-123456',
      };

      const result = await userService.handleOAuthCallback(oauthData);

      expect(result.user.email).toBe(oauthData.email);
      expect(result.user.authProvider).toBe('google');
      expect(result.accessToken).toBeDefined();
    });

    it('should link existing user on OAuth login', async () => {
      const email = 'existing@example.com';
      const existingUser = await createTestUser(testDb.getClient(), {
        email,
        authProvider: 'email',
      });

      const oauthData = {
        provider: 'google' as const,
        email,
        name: 'OAuth User',
        providerId: 'google-123456',
      };

      const result = await userService.handleOAuthCallback(oauthData);

      expect(result.user.id).toBe(existingUser.id);
      expect(result.user.authProvider).toBe('google');
    });
  });

  describe('Role-Based Access Control', () => {
    it('should enforce learner role permissions', async () => {
      const learner = await createTestUser(testDb.getClient(), { role: 'learner' });
      const token = generateTestToken(learner.id, learner.role);

      const hasAccess = await userService.checkPermission(token, 'read:content');
      const noAccess = await userService.checkPermission(token, 'admin:users');

      expect(hasAccess).toBe(true);
      expect(noAccess).toBe(false);
    });

    it('should enforce instructor role permissions', async () => {
      const instructor = await createTestUser(testDb.getClient(), { role: 'instructor' });
      const token = generateTestToken(instructor.id, instructor.role);

      const hasContentAccess = await userService.checkPermission(token, 'read:content');
      const hasReviewAccess = await userService.checkPermission(token, 'write:reviews');
      const noAdminAccess = await userService.checkPermission(token, 'admin:users');

      expect(hasContentAccess).toBe(true);
      expect(hasReviewAccess).toBe(true);
      expect(noAdminAccess).toBe(false);
    });

    it('should enforce admin role permissions', async () => {
      const admin = await createTestUser(testDb.getClient(), { role: 'admin' });
      const token = generateTestToken(admin.id, admin.role);

      const hasAllAccess = await userService.checkPermission(token, 'admin:users');

      expect(hasAllAccess).toBe(true);
    });
  });

  describe('Session Management', () => {
    it('should store session in Redis', async () => {
      const user = await createTestUser(testDb.getClient());
      const sessionId = await userService.createSession(user.id);

      const session = await testRedis.getClient().get(`session:${sessionId}`);

      expect(session).toBeDefined();
      expect(JSON.parse(session!).userId).toBe(user.id);
    });

    it('should invalidate session on logout', async () => {
      const user = await createTestUser(testDb.getClient());
      const sessionId = await userService.createSession(user.id);

      await userService.logout(sessionId);

      const session = await testRedis.getClient().get(`session:${sessionId}`);
      expect(session).toBeNull();
    });

    it('should expire sessions after 24 hours', async () => {
      const user = await createTestUser(testDb.getClient());
      const sessionId = await userService.createSession(user.id);

      const ttl = await testRedis.getClient().ttl(`session:${sessionId}`);

      expect(ttl).toBeGreaterThan(0);
      expect(ttl).toBeLessThanOrEqual(86400); // 24 hours in seconds
    });
  });
});
