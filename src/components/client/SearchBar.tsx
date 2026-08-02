'use client';
import React, { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''}`}>
      <span className={styles.searchIcon}>🔍</span>
      <input 
        type="text" 
        className={styles.input} 
        placeholder="Rechercher un cuisinier, un plat... / Search for a cook, a dish..." 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button className={styles.locationBtn} title="Location">📍</button>
    </div>
  );
}
