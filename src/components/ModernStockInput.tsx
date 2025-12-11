import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SearchResult } from '../hooks/useStockSearch';

interface ModernStockInputProps {
  value: string;
  onChange: (value: string) => void;
  onStockSelect?: (code: string, name: string) => void;
  search: (query: string) => SearchResult[];
  isLoading?: boolean;
}

export default function ModernStockInput({ value, onChange, onStockSelect, search, isLoading = false }: ModernStockInputProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    if (value.trim().length > 0) {
      const results = search(value);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
      setCurrentPage(0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
      setCurrentPage(0);
    }
  }, [value, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = searchResults.slice(startIndex, endIndex);

  const handleStockClick = (stock: SearchResult) => {
    const displayValue = `${stock.code} ${stock.name}`;
    onChange(displayValue);
    setShowDropdown(false);

    if (onStockSelect) {
      onStockSelect(stock.code, stock.name);
    }
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowDropdown(true);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="relative w-full">
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="銘柄名を入力して検索"
          className="w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none transition-all duration-200"
          style={{
            height: '56px',
            color: '#1f2937',
            background: '#ffffff',
            borderColor: '#d1d5db',
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1a56db';
          }}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = '#d1d5db';
            }
          }}
          onFocus={(e) => {
            handleInputFocus();
            e.currentTarget.style.borderColor = '#1a56db';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26, 86, 219, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
          disabled={isLoading}
        />
      </div>

      {showDropdown && currentResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999] w-full mt-2 rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200"
          style={{
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
        >
          <div className="max-h-80 overflow-y-auto">
            {currentResults.map((stock, index) => (
              <button
                key={`${stock.code}-${index}`}
                onClick={() => handleStockClick(stock)}
                className="w-full px-4 py-3 text-left transition-all duration-200 border-b last:border-b-0"
                style={{
                  borderColor: '#e5e7eb',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="font-semibold whitespace-nowrap text-blue-700">
                      {stock.code}
                    </div>
                    <div
                      className="text-sm truncate text-gray-700"
                      title={stock.name}
                    >
                      {stock.name.length > 12 ? `${stock.name.slice(0, 12)}...` : stock.name}
                    </div>
                  </div>
                  <div
                    className="text-xs px-2 py-1 font-medium whitespace-nowrap rounded bg-blue-100 text-blue-700 border border-blue-200"
                  >
                    {stock.market}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div
              className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200"
            >
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
                前へ
              </button>

              <div className="text-sm font-semibold text-gray-700">
                {currentPage + 1} / {totalPages}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                次へ
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="absolute left-0 right-0 top-full mt-2 text-center text-sm text-gray-600">
          読み込み中...
        </div>
      )}
    </div>
  );
}
