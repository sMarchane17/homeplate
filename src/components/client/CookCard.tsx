'use client';
import React from 'react';
import styles from './CookCard.module.css';
import Link from 'next/link';

interface CookCardProps {
  id: string;
  name: string;
  image: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  tags: string[];
}

export default function CookCard({ id, name, image, specialty, rating, reviews, distance, tags }: CookCardProps) {
  return (
    <Link href={`/cook/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.gradientOverlay}></div>
        <div className={styles.pickupBadge}>Pickup / À emporter</div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.rating}>
            <span className={styles.star}>★</span> {rating} ({reviews})
          </div>
        </div>
        <p className={styles.specialty}>{specialty}</p>
        <p className={styles.distance}>📍 {distance}</p>
        <div className={styles.tags}>
          {tags.map((tag, idx) => (
            <span key={idx} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
