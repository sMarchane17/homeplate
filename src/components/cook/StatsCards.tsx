import React from 'react';
import styles from './StatsCards.module.css';

interface Stat {
  icon: string;
  label: { en: string; fr: string };
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}

interface StatsCardsProps {
  stats: Stat[];
  lang: 'en' | 'fr';
}

export default function StatsCards({ stats, lang }: StatsCardsProps) {
  return (
    <div className={styles.grid}>
      {stats.map((stat, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.icon}>{stat.icon}</span>
            {stat.trend && (
              <span className={`${styles.trend} ${styles[stat.trendDirection || 'neutral']}`}>
                {stat.trendDirection === 'up' ? '↑' : stat.trendDirection === 'down' ? '↓' : ''} {stat.trend}
              </span>
            )}
          </div>
          <div className={styles.content}>
            <h3 className={styles.value}>{stat.value}</h3>
            <p className={styles.label}>{stat.label[lang]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
