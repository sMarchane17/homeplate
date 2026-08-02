'use client';

import React, { useState } from 'react';
import DishForm from '@/components/cook/DishForm';
import styles from './new-dish.module.css';

export default function NewDishPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{lang === 'en' ? 'Add New Dish' : 'Ajouter un nouveau plat'}</h1>
        <p className={styles.subtitle}>
          {lang === 'en' ? 'Fill out the details to add a new dish to your menu.' : 'Remplissez les détails pour ajouter un nouveau plat à votre menu.'}
        </p>
      </header>

      <DishForm lang={lang} />
    </div>
  );
}
