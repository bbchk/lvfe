import SearchBar from "./comps/search-bar";
import ButtonGroup from "./comps/button_group/button_group";
import Logo from "./comps/logo";
// import OffcanvasToggler from "./comps/offcanvas/main_offcanvas.toggler";
// <OffcanvasToggler />

// import { mainContent, bigListItem, sideContent } from './styles.module.scss';

import {header_container, header, underline, loader_line }  from "./header.module.scss";

import { useSelector } from "react-redux";

const Header = () => {
  const { loading } = useSelector((state) => state.modals);

  return (
    <header className={`${header_container}`}>
      <nav className={`${header}`}>
        <Logo />
        <SearchBar />
        <ButtonGroup />
      </nav>

      <div className={`${underline}`}>
        {loading && <div className={loader_line} />}
      </div>
    </header>
  );
};

export default Header;
