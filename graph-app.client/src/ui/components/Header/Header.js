import MainMenu from "../MainMenu/MainMenu";

import {header, menuWrap, logo} from "./Header.module.scss"

const Header = () => {
  return (
    <div className={header}>
      <div className={logo}>  
        <p>Graph App</p>
      </div>
      <div className={menuWrap}>
          <MainMenu />
      </div>
    </div>
  );
};

export default Header;
