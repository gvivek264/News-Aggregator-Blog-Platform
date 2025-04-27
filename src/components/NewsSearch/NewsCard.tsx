import { formatDistanceToNow } from 'date-fns';
import { NewsArticle } from './types';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
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
  );
}