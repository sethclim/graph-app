import { Link } from "react-router-dom";
import MainMenu from "../MainMenu/MainMenu";
import { AuthContext } from "../../../domain/providers/AuthProvider";
import { useContext } from "react";

import styles from "./Header.module.scss"

const Header = () => {

  const { authenticated } = useContext(AuthContext)

  return (
    <div className={styles.header}>
      <div className={styles.logo}>  
      <Link to="/home">
        Graph App
      </Link>
      </div>
        <div className={styles.menuWrap}>
        {
          authenticated ? (
          
              <MainMenu />

          ) : (
            <div  className={styles.linkbtn}>
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
