import { useState, useEffect } from 'react';
import { useAppSelector } from '../store';
import axios from 'axios';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  preferences?: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: number;
    codeTheme: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
}

function UserProfile() {
  const { token, user } = useAppSelector((state) => state.auth);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    theme: 'auto' as const,
    fontSize: 14,
    codeTheme: 'monokai',
    emailNotifications: true,
    pushNotifications: true,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/users/${user?.id}/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(response.data);
        setFormData({
          name: response.data.name || '',
          bio: response.data.bio || '',
          theme: response.data.preferences?.theme || 'auto',
          fontSize: response.data.preferences?.fontSize || 14,
          codeTheme: response.data.preferences?.codeTheme || 'monokai',
          emailNotifications: response.data.preferences?.notifications?.email ?? true,
          pushNotifications: response.data.preferences?.notifications?.push ?? true,
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load profile', err);
        setLoading(false);
      }
    };

    if (token && user) fetchProfile();
  }, [token, user]);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/v1/users/${user?.id}/profile`,
        {
          name: formData.name,
          bio: formData.bio,
          preferences: {
            theme: formData.theme,
            fontSize: formData.fontSize,
            codeTheme: formData.codeTheme,
            notifications: {
              email: formData.emailNotifications,
              push: formData.pushNotifications,
            },
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update profile');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {profile?.avatarUrl && (
          <div className="mb-6 text-center">
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto"
            />
          </div>
        )}

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Font Size</label>
              <input
                type="number"
                min="12"
                max="24"
                value={formData.fontSize}
                onChange={(e) => setFormData({ ...formData, fontSize: parseInt(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Code Theme</label>
              <select
                value={formData.codeTheme}
                onChange={(e) => setFormData({ ...formData, codeTheme: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="monokai">Monokai</option>
                <option value="dracula">Dracula</option>
                <option value="github">GitHub</option>
                <option value="vs-dark">VS Dark</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                />
                <span className="text-sm">Email Notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.pushNotifications}
                  onChange={(e) => setFormData({ ...formData, pushNotifications: e.target.checked })}
                />
                <span className="text-sm">Push Notifications</span>
              </label>
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">{profile?.name}</h2>
            <p className="text-gray-600 mb-1">{profile?.email}</p>
            {profile?.bio && <p className="text-gray-700 mt-4">{profile.bio}</p>}
            
            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-500">Theme: {profile?.preferences?.theme}</p>
              <p className="text-sm text-gray-500">Font Size: {profile?.preferences?.fontSize}px</p>
              <p className="text-sm text-gray-500">Code Theme: {profile?.preferences?.codeTheme}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;