
import React from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useFreshAuth } from '@/contexts/FreshAuthContext';
import { useNavigation } from './navbar/useNavigation';
import { navLinks } from './navbar/navLinks';
import DesktopNav from './navbar/DesktopNav';
import MobileMenu from './navbar/MobileMenu';

console.log('Navbar: Component loading');

const Navbar = () => {
  console.log('Navbar: Starting to render Navbar component');
  
  const { user } = useFreshAuth();
  console.log('Navbar: Got user from FreshAuth:', user ? 'User logged in' : 'No user');
  
  const { 
    isMenuOpen, 
    isScrolled, 
    toggleMenu, 
    closeMenu, 
    isLinkActive, 
    handleNavigation 
  } = useNavigation();

  console.log('Navbar: Navigation hook initialized');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Logo />
          
          <DesktopNav 
            navLinks={navLinks} 
            isLinkActive={isLinkActive} 
            handleNavigation={handleNavigation}
            closeMenu={closeMenu}
            user={user}
          />
          
          <button 
            className="md:hidden text-black z-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <MobileMenu 
          isMenuOpen={isMenuOpen} 
          closeMenu={closeMenu}
          navLinks={navLinks}
          isLinkActive={isLinkActive}
          handleNavigation={handleNavigation}
          user={user}
        />
      </div>
    </header>
  );
};

export default Navbar;
