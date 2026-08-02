import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  isClickable?: boolean;
  imageHeader?: React.ReactNode;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  isClickable = false,
  imageHeader,
  className = '',
  ...props
}: CardProps) {
  const classes = [
    styles.card,
    styles[variant],
    styles[`pad-${padding}`],
    isClickable ? styles.clickable : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {imageHeader && (
        <div className={styles.imageHeader}>
          {imageHeader}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
