import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'coming-soon';
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  showDot = false,
  className = '',
  ...props
}: BadgeProps) {
  const classes = [
    styles.badge,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {showDot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
