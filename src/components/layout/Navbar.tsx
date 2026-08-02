'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/i18n';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Dynamic user state loaded from localStorage on client-side
  const [user, setUser] = useState<{ name: string; email: string; role: string; specialty?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Read session
    const storedUser = localStorage.getItem('active_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('active_user');
    setUser(null);
    window.location.href = '/';
  };

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'fr' : 'en');
  };

  const initials = user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD';

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
          <Link href="/explore" className={styles.navLink}>{t('nav.explore')}</Link>
          
          <div className={styles.divider} />
          
          <button onClick={toggleLanguage} className={styles.langToggle}>
            {locale.toUpperCase()}
          </button>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {user.role === 'cook' ? (
                <Link href="/cook/dashboard" className={styles.navLink} style={{ color: 'var(--color-primary-500)', fontWeight: 600 }}>
                  🧑‍🍳 {t('nav.dashboard')}
                </Link>
              ) : (
                <Link href="/my-orders" className={styles.navLink}>
                  🛒 {t('nav.orders')}
                </Link>
              )}
              <Avatar initials={initials} status="online" hasBorder />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {t('nav.logout')}
              </Button>
            </div>
          ) : (
            <div className={styles.authGroup}>
              <Link href="/login">
                <Button variant="ghost">{t('login')}</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary">{t('signup')}</Button>
              </Link>
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
          <Link href="/about" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
          <Link href="/how-it-works" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>{t('howItWorks')}</Link>
          <Link href="/explore" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>{t('nav.explore')}</Link>
          <button onClick={() => { toggleLanguage(); setIsMenuOpen(false); }} className={styles.mobileLink}>
            Language: {locale.toUpperCase()}
          </button>
          
          {user ? (
            <div className={styles.mobileAuthGroup}>
              {user.role === 'cook' ? (
                <Link href="/cook/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" fullWidth>🧑‍🍳 {t('nav.dashboard')}</Button>
                </Link>
              ) : (
                <Link href="/my-orders" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" fullWidth>🛒 {t('nav.orders')}</Button>
                </Link>
              )}
              <Button variant="outline" fullWidth onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                {t('nav.logout')}
              </Button>
            </div>
          ) : (
            <div className={styles.mobileAuthGroup}>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" fullWidth>{t('login')}</Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" fullWidth>{t('signup')}</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
