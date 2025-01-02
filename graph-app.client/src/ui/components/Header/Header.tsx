import { Link } from "react-router-dom";
import MainMenu from "../MainMenu/MainMenu";
import { AuthContext } from "../../../domain/providers/AuthProvider";
import { useContext } from "react";

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/react-router'

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
               <SignedOut>
                <Link to="/login">
                  Login
                </Link>
              </SignedOut>
               {/* <SignedOut>
                <SignInButton />
              </SignedOut> */}
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          )
        }
        </div>
    </div>
  );
};

export default Header;
