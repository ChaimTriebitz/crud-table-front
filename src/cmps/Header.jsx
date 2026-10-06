import { NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/imgs/logo1.webp';
import { useEffect } from 'react';
import { useGlobalState } from '../hooks';
import { ACTIONS } from '../state';

const links = [
   { name: 'Banks', link: '/banks' },
   { name: 'Lenders', link: '/lenders' },
]

export const Header = () => {
   const { dispatch } = useGlobalState()
   const { pathname } = useLocation()

   useEffect(() => {
      dispatch({ type: ACTIONS.SET, entity: 'page', payload: pathname.replace(/^\/+/, '') })
   }, [pathname])

   return (
      <header className='header'>
         <img className='logo' src={logo} alt="company logo" />
         {/* <div className="logo">Table of Contents Editor</div> */}
         <nav className='nav'>
            {
               links.map(link =>
                  <NavLink
                     to={link.link}
                     className='link'
                     key={link.name}
                  >
                     {link.name}
                  </NavLink>
               )
            }
         </nav>
      </header>
   )
}
