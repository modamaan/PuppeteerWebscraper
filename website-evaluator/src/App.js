import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Ensure Tailwind styles are imported

const App = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    console.log("url is = ",url);
    

    try {
      const response = await axios.post('http://localhost:5000/api/evaluate', { url });
      setResult(response.data);
    } catch (error) {
      console.error('Error evaluating website:', error);
      setResult({ error: 'Failed to evaluate website.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center p-6 bg-blue-600 text-white w-full max-w-4xl rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Website Evaluator</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="p-3 text-black mb-4 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Evaluating...' : 'Evaluate'}
          </button>
        </form>
        {result && (
          <div className="mt-6 p-4 bg-white shadow-lg rounded-lg w-full max-w-md">
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <div className="text-black" >
                <p><strong className="font-semibold">Design Quality:</strong> {result.designQuality}</p>
                <p><strong className="font-semibold">SEO Score:</strong> {result.seoScore}</p>
                <p><strong className="font-semibold">Performance Score:</strong> {result.performanceScore}</p>
                <p><strong className="font-semibold">Accessibility Score:</strong> {result.accessibilityScore}</p>
                <p><strong className="font-semibold">Overall Quality:</strong> {result.overallQuality}</p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default App;

