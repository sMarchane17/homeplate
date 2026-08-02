'use client';
import React from 'react';
import styles from './client-layout.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {children}
      </main>
      
      <nav className={styles.bottomNav}>
        <Link href="/explore" className={`${styles.navItem} ${pathname === '/explore' ? styles.active : ''}`}>
          <span className={styles.icon}>🔍</span>
          <span>Explore</span>
        </Link>
        <Link href="/cart" className={`${styles.navItem} ${pathname === '/cart' ? styles.active : ''}`}>
          <span className={styles.icon}>🛒</span>
          <span>Cart</span>
        </Link>
        <Link href="/orders" className={`${styles.navItem} ${pathname === '/orders' ? styles.active : ''}`}>
          <span className={styles.icon}>📋</span>
          <span>Orders</span>
        </Link>
        <Link href="/profile" className={`${styles.navItem} ${pathname === '/profile' ? styles.active : ''}`}>
          <span className={styles.icon}>👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
