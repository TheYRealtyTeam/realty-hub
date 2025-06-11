
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  console.log('useNavigation: Hook called');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          const sectionId = section.getAttribute('id') || '';
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/') {
      setActiveSection('home');
    } else {
      const mainPath = pathname.split('/')[1];
      setActiveSection(mainPath || 'home');
    }
  }, [location.pathname]);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isLinkActive = (link: { href: string, isAnchorLink: boolean }) => {
    if (link.isAnchorLink) {
      const anchorId = link.href.split('#')[1];
      return activeSection === anchorId;
    } else {
      if (link.href === '/') {
        return location.pathname === '/';
      } else {
        return location.pathname.startsWith(link.href);
      }
    }
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string, isAnchorLink: boolean }) => {
    closeMenu();
    
    if (link.isAnchorLink) {
      e.preventDefault();
      const sectionId = link.href.split('#')[1];
      const element = document.getElementById(sectionId);
      
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      } else if (location.pathname !== '/') {
        window.location.href = link.href;
      }
    }
  };

  return {
    isMenuOpen,
    isScrolled,
    activeSection,
    toggleMenu,
    closeMenu,
    isLinkActive,
    handleNavigation,
  };
};
