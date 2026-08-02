'use client';
import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/i18n';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={styles.gradientTop} />
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>🍽️</span>
              <span className={styles.logoText}>HomePlate</span>
            </Link>
            <p className={styles.desc}>
              Discover and order stunning, authentic home-cooked meals from passionate local chefs in your neighborhood.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Company</h4>
            <Link href="/about" className={styles.link}>{t('about')}</Link>
            <Link href="/how-it-works" className={styles.link}>{t('howItWorks')}</Link>
            <Link href="/contact" className={styles.link}>{t('contact')}</Link>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Chefs</h4>
            <Link href="/become-a-cook" className={styles.link}>{t('becomeACook')}</Link>
            <Link href="/faq" className={styles.link}>{t('faq')}</Link>
            <Link href="/guidelines" className={styles.link}>Guidelines</Link>
          </div>

          <div className={styles.newsletterCol}>
            <h4 className={styles.heading}>Stay Updated</h4>
            <p className={styles.newsletterDesc}>Get the latest meals straight to your inbox.</p>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="Your email" className={styles.input} />
              <button className={styles.subscribeBtn}>Subscribe</button>
            </div>
          </div>
          
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} HomePlate. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink}>TW</a>
            <a href="#" className={styles.socialLink}>IG</a>
            <a href="#" className={styles.socialLink}>FB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
