import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import axios from 'axios';

interface Certificate {
  id: string;
  title: string;
  issuedAt: string;
  verificationCode: string;
  certificateUrl?: string;
}

function CertificateDisplay() {
  const { token, user } = useAppSelector((state) => state.auth);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/certificates/users/${user?.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCertificates(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load certificates', err);
        setLoading(false);
      }
    };

    if (token && user) fetchCertificates();
  }, [token, user]);

  const handleShare = (platform: string, cert: Certificate) => {
    const text = `I just earned the "${cert.title}" certificate from AI Engineering Curriculum! 🎓 Verification: ${cert.verificationCode}`;
    const url = `https://linkedin.com/share?text=${encodeURIComponent(text)}`;
    if (platform === 'linkedin') {
      window.open(url, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleDownload = async (cert: Certificate) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/certificates/${cert.id}/download`,
        { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${cert.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download certificate');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading certificates...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>
      {certificates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No certificates earned yet.</p>
          <p className="text-sm text-gray-400 mt-2">Complete all modules to earn your certificate!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg shadow p-6 border-2 border-yellow-400">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-xl font-bold">{cert.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded mb-4">
                <p className="text-xs text-gray-500">Verification Code</p>
                <p className="font-mono text-sm">{cert.verificationCode}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleDownload(cert)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => handleShare('linkedin', cert)}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
                >
                  Share on LinkedIn
                </button>
                <button
                  onClick={() => handleShare('twitter', cert)}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
                >
                  Share on Twitter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CertificateDisplay;