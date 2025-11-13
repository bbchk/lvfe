import ButtonGroup from "./comps/button_group/button_group";
// import OffcanvasToggler from "./comps/offcanvas/main_offcanvas.toggler";
// <OffcanvasToggler />

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchRounded } from '@mui/icons-material';

import useDoOnKey from 'hooks/useDoOnKey.js';
import { startLoading } from 'store/slices/global_comps/global_comps.slice';
import { slugify, unslugify } from '@bbuukk/slugtrans/slugify';
import { transliterate, untransliterate } from '@bbuukk/slugtrans/transliterate';

// import logoSvg from '/public/assets/logo.svg';
// console.log(logoSvg);

import { useSession, signIn, signOut } from '@src/contexts/AuthContext'
import { useDispatch } from 'react-redux'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CART_MODAL } = GLOBAL_COMPS

import {
  ChecklistRtlRounded,
  FavoriteBorderRounded,
  ShoppingCartRounded,
} from '@mui/icons-material'


import {header_container, header, underline, loader_line, logo }  from "./header.module.scss";

import { useSelector } from "react-redux";
import ButtonIcon from "comps/buttons/icon.button";

const Header = () => {
  const { loading } = useSelector((state) => state.modals);
  const dispatch = useDispatch()
  const { data: session } = useSession()

  return (
    <header className={`${header_container}`}>
      <nav className={`${header}`}>
        <Logo />


        <ButtonIcon
          tooltipText={'Кошик покупок'}
          ariaDescribedby='Відкрити вікно кошику'
          onClick={() => dispatch(toggle(CART_MODAL))}
        >
          <ShoppingCartRounded />
        </ButtonIcon>
      </nav>

      <div className={`${underline}`}>
        {loading && <div className={loader_line} />}
      </div>
    </header>
  );
};


export const Logo = () => {
  return (
    <>
      <a className={logo} href='/'>
        <img
          src={'/assets/logo.svg'}
          alt='Логотип'
          aria-label='Перейти на головну сторінку'
          width={50}
          height={50}
        />
        <span>Живий світ</span>
      </a>
    </>
  )
}


// const SearchBar = () => {
//   const navigate = useNavigate();
//   const { categoryPath } = useParams();
//
//   const dispatch = useDispatch();
//   const [searchText, setSearchText] = useState('');
//
//   useDoOnKey('Escape', () => {
//     const searchInput = document.getElementById('search_bar_input');
//     if (searchInput) {
//       searchInput.blur();
//     }
//   });
//
//   // Effect to sync the search bar text with the URL
//   useEffect(() => {
//     const isSearchPage = categoryPath?.includes('search=');
//     if (isSearchPage) {
//       // Extract the search query from the URL parameter
//       const slugQuery = categoryPath.split('search=')[1];
//       const query = untransliterate(unslugify(slugQuery));
//       setSearchText(query);
//     } else {
//       // Clear the search text if not on a search page
//       setSearchText('');
//     }
//   }, [categoryPath]);
//
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchText.trim()) return; // Don't search for empty strings
//
//     dispatch(startLoading());
//     const query = slugify(transliterate(searchText));
//
//     // --- Start of Fix ---
//     // Use the navigate function to change the URL
//     navigate(`/products/search=${query}/page=1`);
//     // --- End of Fix ---
//   };
//
//   return (
//     <form
//       className={`${s.search_bar} ${hs.search_bar}`}
//       role='search'
//       onSubmit={handleSearch}
//     >
//       <input
//         id='search_bar_input'
//         className={` ${s.search_field}`}
//         type='search'
//         placeholder='я хочу знайти...'
//         aria-label='Пошукова стрічка'
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//       />
//       <button
//         className={`button_submit ${s.search_button}`}
//         type='submit'
//         aria-label='Здійснити пошук'
//       >
//         <p>знайти</p>
//         <SearchRounded />
//       </button>
//     </form>
//   );
// };

export default Header;
