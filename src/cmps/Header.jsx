import { NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/imgs/logo1.webp'
import { useEffect } from 'react'
import { useGlobalState } from '../hooks'
import { ACTIONS } from '../state'

const links = [
   { name: 'Banks', link: '/banks' },
   { name: 'Lenders', link: '/lenders' },
]

export const Header = () => {
   const { dispatch } = useGlobalState()
   const { pathname } = useLocation()

   useEffect(() => {
      dispatch({ type: ACTIONS.SET, entity: 'page', payload: pathname.replace(/^\/+/, '') })
   }, [pathname, dispatch])

   return (
      <header className='header'>
         <div className='brand'>
            <img className='logo' src={logo} alt='Vito logo' />
            <div className='brand-copy'>
               <strong>Vito</strong>
               <span>Lending CRM</span>
            </div>
         </div>

         <div className='header-page'>
            <span>Workspace</span>
            <strong>Contacts &amp; lending partners</strong>
         </div>

         <nav className='nav' aria-label='Primary navigation'>
            {links.map(link => (
               <NavLink
                  to={link.link}
                  className='link'
                  key={link.name}
               >
                  {link.name}
               </NavLink>
            ))}
         </nav>
      </header>
   )
}
