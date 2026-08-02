'use client';
import React, { useState } from 'react';
import styles from './DishCard.module.css';

interface DishCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badges: string[];
  prepTime: string;
}

export default function DishCard({ id, name, description, price, image, badges, prepTime }: DishCardProps) {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => setQuantity(q => q + 1);
  const handleRemove = () => setQuantity(q => Math.max(0, q - 1));

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.gradientOverlay}></div>
        <div className={styles.badges}>
          {badges.map((badge, idx) => (
            <span key={idx} className={`${styles.badge} ${styles['badge' + badge.replace(/\s+/g, '')]}`}>
              {badge}
            </span>
          ))}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.name}>{name}</h4>
          <span className={styles.price}>€{price.toFixed(2)}</span>
        </div>
        
        <p className={styles.description}>{description}</p>
        
        <div className={styles.footer}>
          <span className={styles.prepTime}>⏱️ {prepTime}</span>
          
          {quantity === 0 ? (
            <button className={styles.addBtn} onClick={handleAdd}>
              + Ajouter / Add
            </button>
          ) : (
            <div className={styles.quantityControl}>
              <button className={styles.qBtn} onClick={handleRemove}>-</button>
              <span className={styles.qty}>{quantity}</span>
              <button className={styles.qBtn} onClick={handleAdd}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
