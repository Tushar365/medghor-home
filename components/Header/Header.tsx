// Header.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  return (
    <Link 
      href={href} 
      className={styles.navLink}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleClickOutside = () => setIsMobileMenuOpen(false);
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Go to homepage">
            <Image 
              src="/images/logo.png"
              alt="Godel Logo" 
              width={150}
              height={50}
              className={styles.logoImage}
              priority
              onError={(e) => {
                // Show text fallback if logo fails
                e.currentTarget.style.display = 'none';
                const textElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (textElement) {
                  textElement.style.display = 'block';
                }
              }}
            />
            <span className={styles.logoText} style={{ display: 'none' }}>
              Godel
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <NavLink href="/dashboard" onClick={closeMobileMenu}>
            Open Dashboard +
          </NavLink>
          <NavLink href="/office" onClick={closeMobileMenu}>
            Office +
          </NavLink>
          {/* Uncomment when ready to use
          <NavLink href="/about" onClick={closeMobileMenu}>About Us</NavLink>
          <NavLink href="/blog" onClick={closeMobileMenu}>Blog</NavLink>
          <NavLink href="/playground" onClick={closeMobileMenu}>Playground</NavLink>
          */}
        </nav>
      </div>
    </header>
  );
};

export default Header;