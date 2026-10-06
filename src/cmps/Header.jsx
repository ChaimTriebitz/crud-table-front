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
      dispatch({
         type: ACTIONS.SET,
         entity: 'page',
         payload: pathname.replace(/^\/+/, '') || 'banks',
      })
   }, [pathname, dispatch])

   const pageName = pathname === '/lenders' ? 'Lenders' : 'Banks'

   return (
      <header className='header'>
         <div className='brand'>
            <img className='logo' src={logo} alt='Vito' />
            <div className='brand-copy'>
               <strong>Vito</strong>
               <span>Relationship manager</span>
            </div>
         </div>

         <div className='header-page'>
            <span>Workspace</span>
            <strong>{pageName}</strong>
         </div>

         <nav className='nav' aria-label='Main navigation'>
            {links.map(({ name, link }) => (
               <NavLink to={link} className='link' key={name}>
                  {name}
               </NavLink>
            ))}
         </nav>
      </header>
   )
}
