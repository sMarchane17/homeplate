import React from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'none';
  hasBorder?: boolean;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  status = 'none',
  hasBorder = false,
}: AvatarProps) {
  const containerClasses = [
    styles.container,
    styles[size],
    hasBorder ? styles.bordered : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.initials}>
          {initials || alt.charAt(0).toUpperCase()}
        </div>
      )}
      {status !== 'none' && (
        <span className={`${styles.status} ${styles[status]}`} />
      )}
    </div>
  );
}
