'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './menu.module.css';

export default function MenuPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Mains', 'Starters', 'Desserts'];

  const dishes = [
    { id: 1, name: { en: 'Beef Bourguignon', fr: 'Bœuf Bourguignon' }, desc: { en: 'Classic French beef stew braised in red wine', fr: 'Ragoût de bœuf classique braisé au vin rouge' }, price: 18.50, category: 'Mains', active: true, img: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: { en: 'Coq au Vin', fr: 'Coq au Vin' }, desc: { en: 'Chicken braised with wine, lardons, mushrooms', fr: 'Poulet braisé au vin, lardons, champignons' }, price: 16.00, category: 'Mains', active: true, img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: { en: 'Ratatouille', fr: 'Ratatouille' }, desc: { en: 'Traditional vegetable stew from Provence', fr: 'Ragoût de légumes traditionnel de Provence' }, price: 12.00, category: 'Mains', active: false, img: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: { en: 'French Onion Soup', fr: 'Soupe à l\'Oignon' }, desc: { en: 'Rich beef broth, caramelized onions, gruyere', fr: 'Bouillon de bœuf riche, oignons caramélisés, gruyère' }, price: 9.50, category: 'Starters', active: true, img: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4850?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 5, name: { en: 'Tarte Tatin', fr: 'Tarte Tatin' }, desc: { en: 'Upside-down caramelized apple tart', fr: 'Tarte aux pommes caramélisées à l\'envers' }, price: 7.00, category: 'Desserts', active: true, img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { id: 6, name: { en: 'Crème Brûlée', fr: 'Crème Brûlée' }, desc: { en: 'Rich custard base topped with hardened caramelized sugar', fr: 'Base de crème riche surmontée de sucre caramélisé durci' }, price: 8.50, category: 'Desserts', active: false, img: 'https://images.unsplash.com/photo-1473663673752-1f4a9b6c0757?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  ];

  const filteredDishes = activeTab === 'All' ? dishes : dishes.filter(d => d.category === activeTab);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{lang === 'en' ? 'My Menu' : 'Mon Menu'}</h1>
          <p className={styles.subtitle}>
            {lang === 'en' ? 'Manage your dishes and availability' : 'Gérez vos plats et disponibilités'}
          </p>
        </div>
        <Link href="/menu/new" className={styles.primaryBtn}>
          {lang === 'en' ? '+ Add Dish' : '+ Ajouter un plat'}
        </Link>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder={lang === 'en' ? 'Search dishes...' : 'Rechercher des plats...'} 
            className={styles.searchInput}
          />
        </div>
        <div className={styles.tabs}>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`${styles.tab} ${activeTab === cat ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredDishes.map(dish => (
          <div key={dish.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={dish.img} alt={dish.name[lang]} className={styles.image} />
              <div className={styles.categoryBadge}>{dish.category}</div>
            </div>
            <div className={styles.content}>
              <div className={styles.cardHeader}>
                <h3 className={styles.dishName}>{dish.name[lang]}</h3>
                <span className={styles.price}>€{dish.price.toFixed(2)}</span>
              </div>
              <p className={styles.description}>{dish.desc[lang]}</p>
              
              <div className={styles.cardFooter}>
                <div className={styles.toggleWrapper}>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked={dish.active} />
                    <span className={styles.slider}></span>
                  </label>
                  <span className={styles.toggleLabel}>
                    {dish.active 
                      ? (lang === 'en' ? 'Available' : 'Disponible') 
                      : (lang === 'en' ? 'Hidden' : 'Masqué')}
                  </span>
                </div>
                <button className={styles.editBtn}>
                  {lang === 'en' ? 'Edit' : 'Modifier'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
