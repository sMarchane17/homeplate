'use client';
import React, { useState, useEffect } from 'react';
import styles from './explore.module.css';
import CookCard from '@/components/client/CookCard';
import SearchBar from '@/components/client/SearchBar';

const MOCK_COOKS = [
  { id: '1', name: 'Marie Dupont', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800', specialty: 'Cuisine Française Traditionnelle', rating: 4.9, reviews: 124, distance: '1.2 km', tags: ['Français', 'Halal'] },
  { id: '2', name: 'Mamadou Diallo', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800', specialty: 'Spécialités Africaines', rating: 4.8, reviews: 89, distance: '2.5 km', tags: ['Africain', 'Halal'] },
  { id: '3', name: 'Chen Wei', image: 'https://images.unsplash.com/photo-1541614101331-1a5a3e19a40a?auto=format&fit=crop&q=80&w=800', specialty: 'Authentique Asiatique', rating: 4.7, reviews: 210, distance: '3.1 km', tags: ['Asiatique', 'Végétarien'] },
  { id: '4', name: 'Sophie Martin', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800', specialty: 'Pâtisseries & Desserts', rating: 5.0, reviews: 45, distance: '0.8 km', tags: ['Desserts', 'Sans Gluten'] },
  { id: '5', name: 'Amine Benali', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=800', specialty: 'Saveurs Libanaises', rating: 4.9, reviews: 156, distance: '4.0 km', tags: ['Libanais', 'Halal', 'Vegan'] },
  { id: '6', name: 'Carlos Rodriguez', image: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?auto=format&fit=crop&q=80&w=800', specialty: 'Tacos & Mexicain', rating: 4.6, reviews: 78, distance: '1.5 km', tags: ['Mexicain'] },
  { id: '7', name: 'Priya Sharma', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800', specialty: 'Currys Indiens', rating: 4.8, reviews: 112, distance: '2.2 km', tags: ['Indien', 'Végétarien'] },
  { id: '8', name: 'Giovanni Rossi', image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800', specialty: 'Pasta & Pizza Maison', rating: 4.7, reviews: 93, distance: '1.9 km', tags: ['Italien'] }
];

const CATEGORIES = ['Tous', 'Africain', 'Asiatique', 'Français', 'Italien', 'Libanais', 'Mexicain', 'Indien', 'Desserts'];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [showMap, setShowMap] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCooks = activeCategory === 'Tous' 
    ? MOCK_COOKS 
    : MOCK_COOKS.filter(cook => cook.tags.includes(activeCategory));

  if (!mounted) return null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <SearchBar />
      </header>

      <div className={styles.controls}>
        <div className={styles.categoriesContainer}>
          <div className={styles.categories}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filtersRow}>
          <p className={styles.resultsCount}>{filteredCooks.length} cuisiniers trouvés / cooks found</p>
          <div className={styles.actions}>
            <select className={styles.sortSelect} defaultValue="rating">
              <option value="distance">Distance</option>
              <option value="rating">Notes / Rating</option>
              <option value="price">Prix / Price</option>
            </select>
            <button className={styles.mapToggle} onClick={() => setShowMap(!showMap)}>
              {showMap ? 'Liste / List' : 'Carte / Map'}
            </button>
          </div>
        </div>
      </div>

      {showMap ? (
        <div className={styles.mapPlaceholder}>
          <div className={styles.mapIcon}>🗺️</div>
          <p>Carte interactive disponible prochainement</p>
          <p className={styles.mapSubtext}>Interactive map coming soon</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredCooks.map((cook, index) => (
            <div key={cook.id} className={styles.cardWrapper} style={{ animationDelay: `${index * 0.1}s` }}>
              <CookCard {...cook} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
