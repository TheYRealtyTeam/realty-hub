
import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  link: {
    name: string;
    href: string;
    isAnchorLink: boolean;
  };
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export const NavLink = ({ link, isActive, onClick, className = '' }: NavLinkProps) => {
  if (link.isAnchorLink) {
    return (
      <a
        href={link.href}
        className={`nav-link text-black font-medium ${isActive ? 'active' : ''} ${className}`}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
      >
        {link.name}
      </a>
    );
  }

  return (
    <Link
      to={link.href}
      className={`nav-link text-black font-medium ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {link.name}
    </Link>
  );
};
