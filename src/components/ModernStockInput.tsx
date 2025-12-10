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
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan animate-neon-pulse" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neon-pink animate-neon-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-electric-yellow animate-neon-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neon-purple animate-neon-pulse" style={{ animationDelay: '0.9s' }} />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="例: 7203 / トヨタ / ソニー"
          className="w-full px-4 py-3 text-base backdrop-blur-sm border-2 focus:outline-none placeholder-gray-500 transition-all duration-200 font-cyber-sans shadow-neon-cyan"
          style={{
            height: '52px',
            color: '#00F0FF',
            background: 'rgba(10, 0, 21, 0.8)',
            borderColor: '#00F0FF',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.1)',
            textShadow: '0 0 5px rgba(0, 240, 255, 0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF006E';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.5), inset 0 0 15px rgba(255, 0, 110, 0.1)';
          }}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = '#00F0FF';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.1)';
            }
          }}
          onFocus={(e) => {
            handleInputFocus();
            e.currentTarget.style.borderColor = '#FF006E';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.6), inset 0 0 20px rgba(255, 0, 110, 0.2)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#00F0FF';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.1)';
          }}
          disabled={isLoading}
        />
      </div>

      {showDropdown && currentResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999] w-full mt-3 shadow-neon-cyan overflow-hidden animate-fadeIn backdrop-blur-xl"
          style={{
            background: 'rgba(10, 0, 21, 0.95)',
            border: '2px solid #00F0FF',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.1)',
            clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
          }}
        >
          <div className="max-h-80 overflow-y-auto">
            {currentResults.map((stock, index) => (
              <button
                key={`${stock.code}-${index}`}
                onClick={() => handleStockClick(stock)}
                className="w-full px-5 py-2.5 text-left transition-all duration-150 border-b last:border-b-0 group/item relative"
                style={{
                  borderColor: 'rgba(0, 240, 255, 0.2)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 240, 255, 0.15)';
                  e.currentTarget.classList.add('animate-glitch');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.classList.remove('animate-glitch');
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className="font-semibold whitespace-nowrap font-cyber-mono"
                      style={{
                        color: '#00F0FF',
                        textShadow: '0 0 5px rgba(0, 240, 255, 0.5)',
                      }}
                    >
                      {stock.code}
                    </div>
                    <div
                      className="text-sm truncate font-cyber-sans"
                      title={stock.name}
                      style={{ color: '#cbd5e1' }}
                    >
                      {stock.name.length > 6 ? `${stock.name.slice(0, 6)}...` : stock.name}
                    </div>
                  </div>
                  <div
                    className="text-xs px-3 py-1 font-medium whitespace-nowrap font-cyber"
                    style={{
                      color: '#FF006E',
                      background: 'rgba(255, 0, 110, 0.15)',
                      border: '1px solid rgba(255, 0, 110, 0.5)',
                      boxShadow: '0 0 5px rgba(255, 0, 110, 0.3)',
                      clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
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
                background: 'rgba(10, 0, 21, 0.8)',
                borderTop: '1px solid rgba(0, 240, 255, 0.3)',
              }}
            >
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1 px-4 py-2 text-sm font-cyber disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                style={{
                  color: '#00F0FF',
                  background: 'rgba(0, 240, 255, 0.15)',
                  border: '1px solid #00F0FF',
                  boxShadow: '0 0 5px rgba(0, 240, 255, 0.3)',
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                前へ
              </button>

              <div
                className="text-sm font-cyber-mono font-semibold"
                style={{
                  color: '#FFE700',
                  textShadow: '0 0 5px rgba(255, 231, 0, 0.5)',
                }}
              >
                {currentPage + 1} / {totalPages}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 text-sm font-cyber disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                style={{
                  color: '#00F0FF',
                  background: 'rgba(0, 240, 255, 0.15)',
                  border: '1px solid #00F0FF',
                  boxShadow: '0 0 5px rgba(0, 240, 255, 0.3)',
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
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
        <div
          className="absolute left-0 right-0 top-full mt-2 text-center text-sm font-cyber-mono animate-neon-pulse"
          style={{
            color: '#00F0FF',
            textShadow: '0 0 5px rgba(0, 240, 255, 0.5)',
          }}
        >
          読み込み中...
        </div>
      )}
    </div>
  );
}
