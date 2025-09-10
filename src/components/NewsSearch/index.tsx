import { useState } from 'react';
import SearchBar from './SearchBar';
import NewsCard from './NewsCard';
import { NewsArticle } from './types';

export default function NewsSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchNews = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_5921965a23e025e6112bd6d2305dabca6b8df&q=${encodeURIComponent(
          searchQuery
        )}&language=en`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      setArticles(data.results || []);
    } catch (err) {
      setError('Failed to fetch news articles. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchNews();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Global News</h1>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>

      {articles.length === 0 && !loading && searchQuery && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600">No news articles found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
}