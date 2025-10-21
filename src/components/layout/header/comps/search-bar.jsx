import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SearchRounded } from '@mui/icons-material';

import s from './search-bar.module.scss';
import hs from '../header.module.scss';

import useDoOnKey from 'hooks/useDoOnKey.js';
import { startLoading } from 'store/slices/global_comps/global_comps.slice';
import { slugify, unslugify } from '@bbuukk/slugtrans/slugify';
import { transliterate, untransliterate } from '@bbuukk/slugtrans/transliterate';

const SearchBar = () => {
  // --- Start of Fix ---
  const navigate = useNavigate();
  const { categoryPath } = useParams(); // Get URL params from react-router-dom
  // --- End of Fix ---

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  // Custom hook to handle the "Escape" key press
  useDoOnKey('Escape', () => {
    const searchInput = document.getElementById('search_bar_input');
    if (searchInput) {
      searchInput.blur();
    }
  });

  // Effect to sync the search bar text with the URL
  useEffect(() => {
    const isSearchPage = categoryPath?.includes('search=');
    if (isSearchPage) {
      // Extract the search query from the URL parameter
      const slugQuery = categoryPath.split('search=')[1];
      const query = untransliterate(unslugify(slugQuery));
      setSearchText(query);
    } else {
      // Clear the search text if not on a search page
      setSearchText('');
    }
  }, [categoryPath]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return; // Don't search for empty strings

    dispatch(startLoading());
    const query = slugify(transliterate(searchText));

    // --- Start of Fix ---
    // Use the navigate function to change the URL
    navigate(`/products/search=${query}/page=1`);
    // --- End of Fix ---
  };

  return (
    <form
      className={`${s.search_bar} ${hs.search_bar}`}
      role='search'
      onSubmit={handleSearch}
    >
      <input
        id='search_bar_input'
        className={` ${s.search_field}`}
        type='search'
        placeholder='я хочу знайти...'
        aria-label='Пошукова стрічка'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className={`button_submit ${s.search_button}`}
        type='submit'
        aria-label='Здійснити пошук'
      >
        <p>знайти</p>
        <SearchRounded />
      </button>
    </form>
  );
};

export default SearchBar;
