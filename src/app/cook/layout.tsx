'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './cook-layout.module.css';

export default function CookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  const navItems = [
    { href: '/cook/dashboard', icon: '📊', label: { en: 'Dashboard', fr: 'Tableau de bord' } },
    { href: '/cook/menu', icon: '🍽️', label: { en: 'My Menu', fr: 'Mon Menu' } },
    { href: '/cook/orders', icon: '📝', label: { en: 'Orders', fr: 'Commandes' } },
    { href: '/cook/profile', icon: '👤', label: { en: 'My Profile', fr: 'Mon Profil' } },
  ];

  // Load logged-in user details dynamically
  const [user, setUser] = useState<{ name: string } | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('active_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const initials = user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'MC';
  const userName = user ? user.name : 'Marie Curie';

  return (
    <div className={styles.layout}>
      {/* Mobile Toggle */}
      <button 
        className={styles.mobileToggle} 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🔥</span>
            <span>HomePlate</span>
          </div>
          
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{userName}</span>
              <span className={styles.userRole}>{lang === 'en' ? 'Chef' : 'Chef'}</span>
            </div>
          </div>
          
          <button className={styles.langToggle} onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${pathname.startsWith(item.href) ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label[lang]}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
