'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StatsCards from '@/components/cook/StatsCards';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en'); // Mocking context for now
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

  const stats = [
    { icon: '💰', label: { en: 'Revenue Today', fr: 'Revenu du jour' }, value: '€245.50', trend: '12%', trendDirection: 'up' as const },
    { icon: '📦', label: { en: 'Orders Today', fr: 'Commandes du jour' }, value: '8', trend: '2', trendDirection: 'up' as const },
    { icon: '🍲', label: { en: 'Active Dishes', fr: 'Plats actifs' }, value: '14' },
    { icon: '⭐', label: { en: 'Average Rating', fr: 'Note moyenne' }, value: '4.8', trend: '0.1', trendDirection: 'up' as const },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Sophie M.', items: '2x Bœuf Bourguignon', total: '€45.00', status: 'pending', time: '10 min ago' },
    { id: '#ORD-002', customer: 'Jean P.', items: '1x Coq au Vin, 1x Tarte Tatin', total: '€32.50', status: 'preparing', time: '45 min ago' },
    { id: '#ORD-003', customer: 'Marie D.', items: '3x Ratatouille', total: '€42.00', status: 'ready', time: '1 hr ago' },
    { id: '#ORD-004', customer: 'Lucas T.', items: '1x Quiche Lorraine', total: '€15.00', status: 'completed', time: '3 hrs ago' },
  ];

  const name = user ? user.name : 'Marie';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{lang === 'en' ? `Welcome back, ${name}! 👋` : `Bon retour, ${name}! 👋`}</h1>
          <p className={styles.subtitle}>
            {lang === 'en' ? "Here's what's happening with your kitchen today." : "Voici ce qui se passe dans votre cuisine aujourd'hui."}
          </p>
        </div>
        <div className={styles.actions}>
          <Link href="/cook/menu/new" className={styles.primaryBtn}>
            {lang === 'en' ? '+ Add New Dish' : '+ Ajouter un plat'}
          </Link>
        </div>
      </header>

      <StatsCards stats={stats} lang={lang} />

      <div className={styles.grid}>
        <div className={styles.chartSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{lang === 'en' ? 'Revenue Overview' : 'Aperçu des revenus'}</h2>
          </div>
          <div className={styles.chartPlaceholder}>
            <div className={styles.chartBars}>
              {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                <div key={i} className={styles.barContainer}>
                  <div className={styles.bar} style={{ height: `${height}%` }}></div>
                  <span className={styles.dayLabel}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.ordersSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{lang === 'en' ? 'Recent Orders' : 'Commandes récentes'}</h2>
            <Link href="/orders" className={styles.viewAll}>
              {lang === 'en' ? 'View All' : 'Voir tout'} →
            </Link>
          </div>
          <div className={styles.orderList}>
            {recentOrders.map((order, i) => (
              <div key={i} className={styles.orderCard}>
                <div className={styles.orderInfo}>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={styles.customerName}>{order.customer}</span>
                </div>
                <div className={styles.orderDetails}>
                  <span className={styles.items}>{order.items}</span>
                  <span className={styles.time}>{order.time}</span>
                </div>
                <div className={styles.orderMeta}>
                  <span className={`${styles.status} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                  <span className={styles.total}>{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
