
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  navLinks: Array<{ name: string; href: string; isAnchorLink: boolean }>;
  isLinkActive: (link: { href: string; isAnchorLink: boolean }) => boolean;
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isAnchorLink: boolean }) => void;
  user: any;
}

const MobileMenu = ({ 
  isMenuOpen, 
  closeMenu, 
  navLinks, 
  isLinkActive, 
  handleNavigation,
  user 
}: MobileMenuProps) => {
  const isMobile = useIsMobileOptimized();
  
  return (
    <div 
      id="mobile-menu"
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeMenu}
      aria-hidden={!isMenuOpen}
    >
      <nav 
        className={`absolute right-0 top-0 h-screen w-64 bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        aria-label="Mobile Navigation"
      >
        <div className="pt-16 flex flex-col space-y-4">
          {navLinks.map((link) => (
            link.isAnchorLink ? (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-black hover:bg-yrealty-blue transition-colors rounded-md ${isLinkActive(link) ? 'font-bold' : 'font-medium'}`}
                onClick={(e) => handleNavigation(e, link)}
                aria-current={isLinkActive(link) ? 'page' : undefined}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-black hover:bg-yrealty-blue transition-colors rounded-md ${isLinkActive(link) ? 'font-bold' : 'font-medium'}`}
                onClick={closeMenu}
                aria-current={isLinkActive(link) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            )
          ))}
          
          {user ? (
            <Link to="/profile" className="mx-4 mt-4 btn-primary text-center font-bold" onClick={closeMenu}>
              Profile
            </Link>
          ) : (
            <Link to="/auth" className="mx-4 mt-2 btn-primary text-center font-bold" onClick={closeMenu}>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
