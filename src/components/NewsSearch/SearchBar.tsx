import { Search, Loader } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function SearchBar({ searchQuery, onSearchChange, onSubmit, loading }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
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
  );
}