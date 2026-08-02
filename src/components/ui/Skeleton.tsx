import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Skeleton({
  variant = 'rect',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const classes = [
    styles.skeleton,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  const style = {
    width: width,
    height: height,
  };

  return <div className={classes} style={style} />;
}
