'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock user state
  const user = null; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'fr' : 'en');
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🍽️</span>
          <span className={styles.logoText}>HomePlate</span>
        </Link>

        {/* Desktop Nav */}
        <div className={styles.desktopNav}>
          <Link href="/about" className={styles.navLink}>{t('about')}</Link>
          <Link href="/how-it-works" className={styles.navLink}>{t('howItWorks')}</Link>
          
          <div className={styles.divider} />
          
          <button onClick={toggleLanguage} className={styles.langToggle}>
            {locale.toUpperCase()}
          </button>
          
          {user ? (
            <Avatar initials="JD" status="online" hasBorder />
          ) : (
            <div className={styles.authGroup}>
              <Button variant="ghost">{t('login')}</Button>
              <Button variant="primary">{t('signup')}</Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}></span>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className={styles.mobileNav}>
          <Link href="/about" className={styles.mobileLink}>{t('about')}</Link>
          <Link href="/how-it-works" className={styles.mobileLink}>{t('howItWorks')}</Link>
          <button onClick={toggleLanguage} className={styles.mobileLink}>
            Language: {locale.toUpperCase()}
          </button>
          <div className={styles.mobileAuthGroup}>
            <Button variant="ghost" fullWidth>{t('login')}</Button>
            <Button variant="primary" fullWidth>{t('signup')}</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
