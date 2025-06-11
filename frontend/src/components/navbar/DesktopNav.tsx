
import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; isAnchorLink: boolean }>;
  isLinkActive: (link: { href: string; isAnchorLink: boolean }) => boolean;
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isAnchorLink: boolean }) => void;
  closeMenu: () => void;
  user: any;
}

const DesktopNav = ({ navLinks, isLinkActive, handleNavigation, closeMenu, user }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-2" aria-label="Main Navigation">
      {navLinks.map((link) => (
        <NavLink 
          key={link.name}
          link={link}
          isActive={isLinkActive(link)}
          onClick={(e) => link.isAnchorLink ? handleNavigation(e, link) : closeMenu()}
        />
      ))}
      
      {user ? (
        <Link to="/profile" className="ml-4 btn-primary font-bold">
          Profile
        </Link>
      ) : (
        <Link to="/auth" className="ml-1 btn-primary font-bold">
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default DesktopNav;
