import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import '../../styles/home-Searchbox.css'

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  placeholder = 'Search...', 
  onSearch = () => {} 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Focus the input when opened
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Add click outside listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchBoxRef}>
  <button
    aria-label="Search"
    className="search-button"
    onClick={toggleSearch}
  >
    <SearchIcon size={20} />
  </button>

  <div className={`search-box ${isOpen ? 'open' : 'closed'}`}>
    <form onSubmit={handleSearch} className="search-form">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`search-input ${isOpen ? 'open' : 'closed'}`}
      />
      {isOpen && (
        <button 
          type="button"
          aria-label="Close search"
          className="close-button"
          onClick={toggleSearch}
        >
          <X size={16} />
        </button>
      )}
    </form>
  </div>
</div>

  );
};

export default SearchBox;