import { Search, Loader } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface NewsArticle {
  title: string;
  description: string;
  image_url: string;
  category: string[];
  pubDate: string;
  link: string;
}

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
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for news articles..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
          <button 
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495020689067-958852a7765e';
                }}
              />
            )}
            <div className="p-4">
              {article.category?.[0] && (
                <span className="text-sm text-blue-600 font-semibold capitalize">
                  {article.category[0]}
                </span>
              )}
              <h3 className="text-xl font-semibold mt-2">{article.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">
                {article.description || 'No description available'}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(article.pubDate), { addSuffix: true })}
                </span>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          </article>
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