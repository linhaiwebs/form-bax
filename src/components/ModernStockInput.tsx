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
    <div className="relative w-full animate-fadeIn" style={{ animationDelay: '0.1s' }}>
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="例: 7203 / トヨタ / ソニー"
          className="w-full px-5 py-4 text-base backdrop-blur-xl border-2 rounded-xl focus:outline-none placeholder-gray-400 transition-all duration-300 font-body shadow-soft"
          style={{
            height: '60px',
            color: '#1F2937',
            background: 'rgba(255, 255, 255, 0.75)',
            borderColor: 'rgba(96, 165, 250, 0.3)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(96, 165, 250, 0.15), 0 8px 48px rgba(110, 231, 183, 0.10)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
          onFocus={(e) => {
            handleInputFocus();
            e.currentTarget.style.borderColor = '#60A5FA';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(96, 165, 250, 0.20), 0 12px 64px rgba(110, 231, 183, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          disabled={isLoading}
        />
      </div>

      {showDropdown && currentResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999] w-full mt-3 rounded-xl shadow-soft-lg overflow-hidden animate-fadeIn backdrop-blur-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid rgba(96, 165, 250, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="max-h-80 overflow-y-auto">
            {currentResults.map((stock, index) => (
              <button
                key={`${stock.code}-${index}`}
                onClick={() => handleStockClick(stock)}
                className="w-full px-5 py-3 text-left transition-all duration-200 border-b last:border-b-0 group/item relative"
                style={{
                  borderColor: 'rgba(96, 165, 250, 0.1)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(96, 165, 250, 0.08)';
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(1deg) rotateY(2deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="font-semibold whitespace-nowrap font-display text-sky-600">
                      {stock.code}
                    </div>
                    <div
                      className="text-sm truncate font-body text-text-muted"
                      title={stock.name}
                    >
                      {stock.name.length > 6 ? `${stock.name.slice(0, 6)}...` : stock.name}
                    </div>
                  </div>
                  <div
                    className="text-xs px-3 py-1 font-medium whitespace-nowrap font-display rounded-lg"
                    style={{
                      color: '#60A5FA',
                      background: 'rgba(96, 165, 250, 0.1)',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                    }}
                  >
                    {stock.market}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div
              className="flex items-center justify-between px-5 py-3 backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderTop: '1px solid rgba(96, 165, 250, 0.2)',
              }}
            >
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1 px-4 py-2 text-sm font-display disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-lg shadow-soft-sm"
                style={{
                  color: '#60A5FA',
                  background: 'rgba(96, 165, 250, 0.1)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 0) {
                    e.currentTarget.style.background = 'rgba(96, 165, 250, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(96, 165, 250, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                前へ
              </button>

              <div className="text-sm font-display font-semibold text-sky-600">
                {currentPage + 1} / {totalPages}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 text-sm font-display disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-lg shadow-soft-sm"
                style={{
                  color: '#60A5FA',
                  background: 'rgba(96, 165, 250, 0.1)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages - 1) {
                    e.currentTarget.style.background = 'rgba(96, 165, 250, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(96, 165, 250, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                次へ
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="absolute left-0 right-0 top-full mt-2 text-center text-sm font-body text-sky-600 animate-soft-pulse">
          読み込み中...
        </div>
      )}
    </div>
  );
}
