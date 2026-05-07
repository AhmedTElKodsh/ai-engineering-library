import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          AI Engineering Curriculum
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Master AI Engineering through hands-on projects and structured learning
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">7 Comprehensive Modules</h3>
            <p className="text-gray-600">From Python basics to advanced AI engineering concepts</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Hands-on Projects</h3>
            <p className="text-gray-600">Build real AI applications with guided mini-projects</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Daily content, milestones, and personalized pacing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;