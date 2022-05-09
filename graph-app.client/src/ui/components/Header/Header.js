import { Link } from "react-router-dom";
import MainMenu from "../MainMenu/MainMenu";
import { AuthContext } from "../../../domain/providers/AuthProvider";
import { useContext } from "react";

import {header, menuWrap, logo, linkbtn} from "./Header.module.scss"

const Header = () => {

  const { authenticated } = useContext(AuthContext)

  return (
    <div className={header}>
      <div className={logo}>  
      <Link to="/home">
        Graph App
      </Link>
      </div>
        <div className={menuWrap}>
        {
          authenticated ? (
          
              <MainMenu />

          ) : (
            <div  className={linkbtn}>
              <Link to="/login">
                Login
              </Link>
            </div>
          )
        }
        </div>
    </div>
  );
};

export default Header;
