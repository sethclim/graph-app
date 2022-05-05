import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import styles from "./MainMenu.module.scss"
import { Link } from 'react-router-dom';


const MainMenu = () => {
    return (
      <Menu as="div" className={styles.menu}>
        <Menu.Button className={styles.menuButton}>
          <MenuIcon className={styles.menuSvg} />
        </Menu.Button>    
        <Transition
            as={Fragment}
            enter=""
            enterFrom=""
            enterTo=""
            leave=""
            leaveFrom=""
            leaveTo=""
          >
        <Menu.Items className={styles.menuItems}>
          <Menu.Item className={styles.item}>
            {({ active }) => (
              <Link
                className={active && styles.active}
                to="/saved"
              >
                Saved Graphs
               
              </Link>
            )}
          </Menu.Item>
          <Menu.Item className={styles.item}>
            {({ active }) => (
              <Link
                className={`${active && 'bg-blue-500'}`}
                to="/home"
              >
                Graph
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  export default MainMenu;