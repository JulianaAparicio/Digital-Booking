import './Header.scss';
import Logo from '../../shared/Logo/Logo';
import { Context } from '../../core/Context';
import { useContext } from 'react';
import HeaderButtons from './HeaderButtons/HeaderButton';
import { Avatar } from '../Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../core/services/Auth';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import { useEffect } from 'react';
import gsap from 'gsap';
import { useLayoutEffect } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Header = () => {
   const { user, setUser } = useContext(Context);
   const browserNavigate = useNavigate();

   const logOut = () => {
      setUser(null);
      logoutUser();
      browserNavigate('/');
   };

   useLayoutEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
   });

   useEffect(() => {
      let progressBarAnimation = gsap.to('#progress-bar', {
         width: '100%',
         scrollTrigger: {
            trigger: '#root',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
         },
      });

      const resizeObserver = new ResizeObserver(entries => {
         progressBarAnimation.revert();

         progressBarAnimation = gsap.to('#progress-bar', {
            width: '100%',
            scrollTrigger: {
               trigger: '#root',
               start: 'top top',
               end: 'bottom bottom',
               scrub: true,
            },
         });
      });

      resizeObserver.observe(document.getElementById('app'));

      return () => {
         progressBarAnimation.revert();
      };
   }, []);

   return (
      <header className="db-header db-header-container">
         <div id="progress-bar" />
         <a href="/">
            <Logo />
         </a>
         <div className="db-header-items">
            {user ? <HeaderAdmin user={user} /> : null}
            {user ? <Avatar {...user} logOut={logOut} /> : <HeaderButtons />}
         </div>
         <HeaderMenu />
      </header>
   );
};

export default Header;
