import gsap from 'gsap';
import HamburgerIcon from '../../../shared/Icons/HamburgerIcon';
import SideNav from '../SideNav/SideNav';
import './HeaderMenu.scss';

export default function HeaderMenu() {

   const closeSidePanel = () => {
      gsap.fromTo('.db-side-panel', { translateX: 0 }, { translateX: '100%', ease: 'power2.in' });
   };

   const openSidePanel = () => {
      gsap.fromTo('.db-side-panel', { translateX: '100%' }, { translateX: '0', ease: 'power2.in' });
   };

   return (
      <div className="db-header-menu">
         <div onClick={openSidePanel}>
            <HamburgerIcon />
         </div>
         <SideNav close={closeSidePanel} />
      </div>
   );
}
