import { Menu, Transition } from '@headlessui/react'
// import { Bars3Icon } from '@heroicons/react/24/solid'
// import { Fragment } from 'react'
// import styles from "./MainMenu.module.scss"
// import { Link } from 'react-router-dom';



const MainMenu = () => {
    return (
      // <Menu as="div" className={styles.menu}>
      <Menu as="div">
        {/* <Menu.Button className={styles.menuButton}>
          <Bars3Icon className={styles.menuSvg} />
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
          <Menu.Item className={styles.item}>
            {({ active }) => (
              <Link
                className={`${active && 'bg-blue-500'}`}
                to="/"
              >
                Logout
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
        </Transition> */}
      </Menu>
    )
  }

  export default MainMenu;