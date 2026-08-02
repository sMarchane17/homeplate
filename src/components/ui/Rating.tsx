import React, { useState } from 'react';
import styles from './Rating.module.css';

export interface RatingProps {
  value: number;
  max?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  color?: string;
}

export default function Rating({
  value,
  max = 5,
  interactive = false,
  onChange,
  size = 'md',
  showValue = false,
  color = 'var(--color-accent-500)',
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  const renderStar = (index: number) => {
    const isFilled = index <= displayValue;
    const isHalf = !isFilled && index - 0.5 <= displayValue;

    return (
      <span
        key={index}
        className={`${styles.star} ${interactive ? styles.interactive : ''}`}
        style={{ color: isFilled || isHalf ? color : 'var(--color-neutral-700)' }}
        onClick={() => handleClick(index)}
        onMouseEnter={() => interactive && setHoverValue(index)}
        onMouseLeave={() => interactive && setHoverValue(null)}
      >
        {isFilled ? '★' : isHalf ? '★' : '☆'}
      </span>
    );
  };

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.stars}>
        {Array.from({ length: max }, (_, i) => renderStar(i + 1))}
      </div>
      {showValue && <span className={styles.value}>{value.toFixed(1)}</span>}
    </div>
  );
}
