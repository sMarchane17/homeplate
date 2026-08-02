import os

base_dir = r"C:\Users\smarc\.gemini\antigravity\scratch\homeplate"

files = {
    "src/app/(client)/layout.tsx": """'use client';
import React from 'react';
import styles from './client-layout.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {children}
      </main>
      
      <nav className={styles.bottomNav}>
        <Link href="/explore" className={`${styles.navItem} ${pathname === '/explore' ? styles.active : ''}`}>
          <span className={styles.icon}>🔍</span>
          <span>Explore</span>
        </Link>
        <Link href="/cart" className={`${styles.navItem} ${pathname === '/cart' ? styles.active : ''}`}>
          <span className={styles.icon}>🛒</span>
          <span>Cart</span>
        </Link>
        <Link href="/orders" className={`${styles.navItem} ${pathname === '/orders' ? styles.active : ''}`}>
          <span className={styles.icon}>📋</span>
          <span>Orders</span>
        </Link>
        <Link href="/profile" className={`${styles.navItem} ${pathname === '/profile' ? styles.active : ''}`}>
          <span className={styles.icon}>👤</span>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
""",
    "src/app/(client)/client-layout.module.css": """.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary, #0A0A0A);
  color: var(--color-text-primary, #FAFAFA);
}

.mainContent {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 80px;
}

.bottomNav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
}

.navItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--color-text-muted, #737373);
  font-size: 0.75rem;
  transition: all 0.2s ease;
  gap: 4px;
}

.navItem:hover {
  color: var(--color-text-secondary, #E5E5E5);
}

.navItem.active {
  color: var(--color-primary, #FF6B35);
}

.icon {
  font-size: 1.5rem;
}

@media (min-width: 768px) {
  .bottomNav {
    display: none;
  }
  .mainContent {
    padding-bottom: 0;
  }
}
""",
    "src/components/client/CookCard.tsx": """'use client';
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
""",
    "src/components/client/CookCard.module.css": """.card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-secondary, #141414);
  border-radius: var(--radius-xl, 16px);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(255, 107, 53, 0.15);
}

.imageContainer {
  position: relative;
  height: 200px;
  width: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gradientOverlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.9), transparent);
}

.pickupBadge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--color-primary, #FF6B35);
  color: white;
  padding: 4px 10px;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary, #FAFAFA);
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: var(--color-text-secondary, #E5E5E5);
}

.star {
  color: var(--color-accent, #FFB800);
}

.specialty {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary, #E5E5E5);
}

.distance {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted, #737373);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tag {
  background-color: var(--color-bg-tertiary, #1A1A1A);
  color: var(--color-text-secondary, #E5E5E5);
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: var(--radius-md, 8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
""",
    "src/components/client/SearchBar.tsx": """'use client';
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
""",
    "src/components/client/SearchBar.module.css": """.searchContainer {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full, 9999px);
  padding: 8px 16px;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.searchContainer.focused {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-primary, #FF6B35);
  box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
  transform: scale(1.02);
}

.searchIcon {
  color: var(--color-text-muted, #737373);
  font-size: 1.2rem;
  margin-right: 12px;
}

.input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-text-primary, #FAFAFA);
  font-size: 1rem;
  outline: none;
}

.input::placeholder {
  color: var(--color-text-muted, #737373);
}

.locationBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  margin-left: 8px;
  border-radius: 50%;
  transition: background 0.2s ease;
}

.locationBtn:hover {
  background: rgba(255, 255, 255, 0.1);
}
""",
    "src/app/(client)/explore/page.tsx": """'use client';
import React, { useState, useEffect } from 'react';
import styles from './explore.module.css';
import CookCard from '@/components/client/CookCard';
import SearchBar from '@/components/client/SearchBar';

const MOCK_COOKS = [
  { id: '1', name: 'Marie Dupont', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800', specialty: 'Cuisine Française Traditionnelle', rating: 4.9, reviews: 124, distance: '1.2 km', tags: ['Français'] },
  { id: '2', name: 'Mamadou Diallo', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800', specialty: 'Spécialités Africaines', rating: 4.8, reviews: 89, distance: '2.5 km', tags: ['Africain'] },
  { id: '3', name: 'Chen Wei', image: 'https://images.unsplash.com/photo-1541614101331-1a5a3e19a40a?auto=format&fit=crop&q=80&w=800', specialty: 'Authentique Asiatique', rating: 4.7, reviews: 210, distance: '3.1 km', tags: ['Asiatique'] },
  { id: '4', name: 'Sophie Martin', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800', specialty: 'Pâtisseries & Desserts', rating: 5.0, reviews: 45, distance: '0.8 km', tags: ['Desserts'] },
  { id: '5', name: 'Amine Benali', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=800', specialty: 'Saveurs Libanaises', rating: 4.9, reviews: 156, distance: '4.0 km', tags: ['Libanais'] },
  { id: '6', name: 'Carlos Rodriguez', image: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?auto=format&fit=crop&q=80&w=800', specialty: 'Tacos & Mexicain', rating: 4.6, reviews: 78, distance: '1.5 km', tags: ['Mexicain'] },
  { id: '7', name: 'Priya Sharma', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800', specialty: 'Currys Indiens', rating: 4.8, reviews: 112, distance: '2.2 km', tags: ['Indien'] },
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
""",
    "src/app/(client)/explore/explore.module.css": """.page {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 0;
  background: var(--color-bg-primary, #0A0A0A);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.categoriesContainer {
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.categoriesContainer::-webkit-scrollbar {
  display: none;
}

.categories {
  display: flex;
  gap: 12px;
  min-width: max-content;
}

.categoryBtn {
  background: var(--color-bg-secondary, #141414);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text-secondary, #E5E5E5);
  padding: 8px 16px;
  border-radius: var(--radius-full, 9999px);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.categoryBtn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.categoryBtn.active {
  background: var(--color-primary, #FF6B35);
  color: white;
  border-color: var(--color-primary, #FF6B35);
}

.filtersRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.resultsCount {
  color: var(--color-text-muted, #737373);
  font-size: 0.875rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 12px;
}

.sortSelect {
  background: var(--color-bg-secondary, #141414);
  color: var(--color-text-primary, #FAFAFA);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: var(--radius-md, 8px);
  font-size: 0.875rem;
  outline: none;
}

.mapToggle {
  background: rgba(255, 107, 53, 0.1);
  color: var(--color-primary, #FF6B35);
  border: 1px solid var(--color-primary, #FF6B35);
  padding: 6px 12px;
  border-radius: var(--radius-md, 8px);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mapToggle:hover {
  background: var(--color-primary, #FF6B35);
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cardWrapper {
  animation: fadeUp 0.5s ease backwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mapPlaceholder {
  height: 400px;
  background: var(--color-bg-secondary, #141414);
  border-radius: var(--radius-xl, 16px);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-text-secondary, #E5E5E5);
}

.mapIcon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.mapSubtext {
  color: var(--color-text-muted, #737373);
  font-size: 0.875rem;
  margin-top: 4px;
}
""",
    "src/components/client/DishCard.tsx": """'use client';
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
""",
    "src/components/client/DishCard.module.css": """.card {
  background: var(--color-bg-secondary, #141414);
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.imageContainer {
  position: relative;
  height: 160px;
  width: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gradientOverlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(20, 20, 20, 1), transparent);
}

.badges {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
}

.badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.badgeV { background-color: rgba(34, 197, 94, 0.8); }
.badgeVG { background-color: rgba(16, 185, 129, 0.8); }
.badgeGF { background-color: rgba(234, 179, 8, 0.8); }
.badgeHalal { background-color: rgba(59, 130, 246, 0.8); }

.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary, #FAFAFA);
  line-height: 1.2;
}

.price {
  font-weight: 700;
  color: var(--color-primary, #FF6B35);
  font-size: 1.1rem;
}

.description {
  margin: 0 0 16px 0;
  font-size: 0.875rem;
  color: var(--color-text-muted, #737373);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.prepTime {
  font-size: 0.8rem;
  color: var(--color-text-secondary, #E5E5E5);
}

.addBtn {
  background: rgba(255, 107, 53, 0.1);
  color: var(--color-primary, #FF6B35);
  border: 1px solid var(--color-primary, #FF6B35);
  padding: 6px 12px;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.addBtn:hover {
  background: var(--color-primary, #FF6B35);
  color: white;
}

.quantityControl {
  display: flex;
  align-items: center;
  background: var(--color-primary, #FF6B35);
  border-radius: var(--radius-full, 9999px);
  padding: 2px;
}

.qBtn {
  background: transparent;
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
}

.qBtn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.qty {
  color: white;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
  font-size: 0.875rem;
}
""",
    "src/app/(client)/cook/[id]/page.tsx": """'use client';
import React, { useState } from 'react';
import styles from './cook-detail.module.css';
import DishCard from '@/components/client/DishCard';
import Link from 'next/link';

const MOCK_COOK = {
  id: '1',
  name: 'Marie Dupont',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  cover: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200',
  specialty: 'Cuisine Française Traditionnelle',
  rating: 4.9,
  reviewsCount: 124,
  location: 'Paris 11ème (1.2 km)',
  memberSince: 'Oct 2023',
  prepTime: '30-45 min',
  minOrder: 15,
  description: "Passionnée par la cuisine de ma grand-mère, je prépare des plats traditionnels français avec des ingrédients locaux et de saison. Tout est fait maison avec amour ! / Passionate about my grandmother's cooking, I prepare traditional French dishes with local and seasonal ingredients. Everything is homemade with love!",
  dishes: [
    { id: 'd1', category: 'Plats', name: 'Bœuf Bourguignon', description: 'Mijoté pendant 6 heures dans un vin de Bourgogne, accompagné de pommes de terre grenaille. / Slow-cooked for 6 hours in Burgundy wine, served with baby potatoes.', price: 18.50, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=600', badges: ['GF'], prepTime: '45 min' },
    { id: 'd2', category: 'Plats', name: 'Coq au Vin', description: 'Poulet fermier mijoté au vin rouge, lardons, champignons et petits oignons. / Free-range chicken stewed in red wine, bacon, mushrooms and pearl onions.', price: 17.00, image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=600', badges: [], prepTime: '40 min' },
    { id: 'd3', category: 'Entrées', name: 'Soupe à l\\'Oignon', description: 'Traditionnelle soupe à l\\'oignon gratinée au gruyère avec croûtons maison. / Traditional French onion soup gratinated with gruyere and homemade croutons.', price: 8.50, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600', badges: ['V'], prepTime: '20 min' },
    { id: 'd4', category: 'Desserts', name: 'Tarte Tatin', description: 'Tarte aux pommes caramélisées servie tiède, un classique indémodable. / Caramelized apple tart served warm, a timeless classic.', price: 6.50, image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=600', badges: ['V'], prepTime: '15 min' },
    { id: 'd5', category: 'Plats', name: 'Ratatouille Niçoise', description: 'Mélange de légumes du soleil confits à l\\'huile d\\'olive et aux herbes de Provence. / Sun-kissed vegetables cooked in olive oil and Provence herbs.', price: 14.00, image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&q=80&w=600', badges: ['V', 'VG', 'GF'], prepTime: '30 min' },
    { id: 'd6', category: 'Desserts', name: 'Crème Brûlée', description: 'Crème onctueuse à la vanille de Madagascar avec sa croûte de sucre caramélisé. / Creamy Madagascar vanilla custard with caramelized sugar crust.', price: 7.00, image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?auto=format&fit=crop&q=80&w=600', badges: ['V', 'GF'], prepTime: '10 min' }
  ],
  reviews: [
    { id: 'r1', user: 'Julien M.', rating: 5, date: 'Il y a 2 jours', text: 'Le bœuf bourguignon était exceptionnel ! La viande fondait dans la bouche. Je commanderai à nouveau.' },
    { id: 'r2', user: 'Sarah L.', rating: 5, date: 'Semaine dernière', text: 'Portions très généreuses et beaucoup de goût. Merci Marie pour ce délicieux repas.' },
    { id: 'r3', user: 'Thomas D.', rating: 4, date: 'Il y a 2 semaines', text: 'Très bon mais un peu trop salé à mon goût pour la soupe à l\\'oignon. Le reste était parfait.' }
  ]
};

const CATEGORIES = ['Tous', 'Entrées', 'Plats', 'Desserts'];

export default function CookDetailPage() {
  const [activeTab, setActiveTab] = useState('Tous');
  
  const filteredDishes = activeTab === 'Tous' 
    ? MOCK_COOK.dishes 
    : MOCK_COOK.dishes.filter(d => d.category === activeTab);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img src={MOCK_COOK.cover} alt="Cover" className={styles.coverImage} />
        <div className={styles.heroOverlay}>
          <Link href="/explore" className={styles.backBtn}>← Retour / Back</Link>
        </div>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <img src={MOCK_COOK.avatar} alt={MOCK_COOK.name} className={styles.avatar} />
        </div>
        
        <div className={styles.profileHeader}>
          <div>
            <h1 className={styles.name}>{MOCK_COOK.name}</h1>
            <p className={styles.specialty}>{MOCK_COOK.specialty}</p>
          </div>
          <div className={styles.ratingBox}>
            <span className={styles.star}>★</span>
            <span className={styles.ratingValue}>{MOCK_COOK.rating}</span>
            <span className={styles.reviewsCount}>({MOCK_COOK.reviewsCount} avis)</span>
          </div>
        </div>

        <p className={styles.description}>{MOCK_COOK.description}</p>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>📍 Lieu / Location</span>
            <span className={styles.infoValue}>{MOCK_COOK.location}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>⏱️ Préparation</span>
            <span className={styles.infoValue}>{MOCK_COOK.prepTime}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>💰 Min. commande</span>
            <span className={styles.infoValue}>€{MOCK_COOK.minOrder}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>📅 Membre depuis</span>
            <span className={styles.infoValue}>{MOCK_COOK.memberSince}</span>
          </div>
        </div>

        <div className={styles.badges}>
          <span className={styles.pickupBadge}>✓ Pickup (À emporter)</span>
          <span className={styles.deliveryBadge}>Delivery coming soon</span>
        </div>
      </div>

      <div className={styles.menuSection}>
        <h2 className={styles.sectionTitle}>Menu</h2>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`${styles.tabBtn} ${activeTab === cat ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.dishesGrid}>
          {filteredDishes.map((dish, index) => (
            <div key={dish.id} style={{ animationDelay: `${index * 0.1}s` }} className={styles.dishWrapper}>
              <DishCard {...dish} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Avis / Reviews</h2>
        
        <div className={styles.reviewsSummary}>
          <div className={styles.bigRating}>
            <span className={styles.bigRatingValue}>{MOCK_COOK.rating}</span>
            <div className={styles.bigStars}>★★★★★</div>
            <span className={styles.bigRatingCount}>{MOCK_COOK.reviewsCount} avis</span>
          </div>
          
          <div className={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className={styles.ratingBarRow}>
                <span className={styles.starLabel}>{star} ★</span>
                <div className={styles.barTrack}>
                  <div 
                    className={styles.barFill} 
                    style={{ width: star === 5 ? '85%' : star === 4 ? '12%' : star === 3 ? '3%' : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.reviewsList}>
          {MOCK_COOK.reviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewUser}>{review.user}</span>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <div className={styles.reviewStars}>
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>★</span>
                ))}
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomPadding}></div>
      
      <div className={styles.stickyCartBar}>
        <div className={styles.cartBarContent}>
          <div className={styles.cartInfo}>
            <span className={styles.cartBadge}>3</span>
            <span className={styles.cartTotal}>Total: €44.00</span>
          </div>
          <Link href="/cart" className={styles.viewCartBtn}>
            Voir le panier / View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
""",
    "src/app/(client)/cook/[id]/cook-detail.module.css": """.page {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary, #0A0A0A);
  min-height: 100vh;
}

.hero {
  position: relative;
  height: 250px;
  width: 100%;
}

@media (min-width: 768px) {
  .hero {
    height: 350px;
  }
}

.coverImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heroOverlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%, rgba(10,10,10,1) 100%);
  padding: 16px;
}

.backBtn {
  display: inline-block;
  color: white;
  text-decoration: none;
  background: rgba(0,0,0,0.4);
  padding: 8px 16px;
  border-radius: var(--radius-full, 9999px);
  backdrop-filter: blur(8px);
  font-weight: 500;
  transition: background 0.2s;
}

.backBtn:hover {
  background: rgba(0,0,0,0.6);
}

.profileSection {
  padding: 0 16px 24px;
  margin-top: -60px;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.avatarContainer {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--color-bg-primary, #0A0A0A);
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profileHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.name {
  margin: 0 0 4px 0;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text-primary, #FAFAFA);
}

.specialty {
  margin: 0;
  color: var(--color-text-secondary, #E5E5E5);
  font-size: 1rem;
}

.ratingBox {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: var(--radius-full, 9999px);
  gap: 6px;
}

.star {
  color: var(--color-accent, #FFB800);
}

.ratingValue {
  font-weight: 700;
  font-size: 1.1rem;
}

.reviewsCount {
  color: var(--color-text-muted, #737373);
  font-size: 0.875rem;
}

.description {
  color: var(--color-text-secondary, #E5E5E5);
  line-height: 1.6;
  margin-bottom: 24px;
}

.infoGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

@media (min-width: 640px) {
  .infoGrid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.infoItem {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary, #141414);
  padding: 12px;
  border-radius: var(--radius-lg, 12px);
  border: 1px solid rgba(255,255,255,0.05);
}

.infoLabel {
  font-size: 0.75rem;
  color: var(--color-text-muted, #737373);
  margin-bottom: 4px;
}

.infoValue {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary, #FAFAFA);
}

.badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.pickupBadge {
  background: rgba(34, 197, 94, 0.15);
  color: var(--color-success, #22C55E);
  padding: 6px 12px;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.deliveryBadge {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-muted, #737373);
  padding: 6px 12px;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.875rem;
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.menuSection {
  padding: 32px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.sectionTitle {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: var(--color-text-primary, #FAFAFA);
}

.tabsContainer {
  overflow-x: auto;
  margin-bottom: 24px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.tabsContainer::-webkit-scrollbar {
  display: none;
}

.tabs {
  display: flex;
  gap: 12px;
  min-width: max-content;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 8px;
}

.tabBtn {
  background: transparent;
  border: none;
  color: var(--color-text-muted, #737373);
  font-size: 1rem;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tabBtn:hover {
  color: var(--color-text-secondary, #E5E5E5);
}

.activeTab {
  color: var(--color-primary, #FF6B35);
}

.activeTab::after {
  content: '';
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary, #FF6B35);
  border-radius: 3px 3px 0 0;
}

.dishesGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .dishesGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .dishesGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.dishWrapper {
  animation: fadeUp 0.4s ease backwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.reviewsSection {
  padding: 32px 16px;
}

.reviewsSummary {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
  background: var(--color-bg-secondary, #141414);
  padding: 24px;
  border-radius: var(--radius-xl, 16px);
}

@media (min-width: 768px) {
  .reviewsSummary {
    flex-direction: row;
    align-items: center;
  }
}

.bigRating {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.bigRatingValue {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--color-text-primary, #FAFAFA);
  line-height: 1;
}

.bigStars {
  color: var(--color-accent, #FFB800);
  font-size: 1.25rem;
  letter-spacing: 2px;
  margin: 8px 0;
}

.bigRatingCount {
  color: var(--color-text-muted, #737373);
  font-size: 0.875rem;
}

.ratingBars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ratingBarRow {
  display: flex;
  align-items: center;
  gap: 12px;
}

.starLabel {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #E5E5E5);
  min-width: 30px;
}

.barTrack {
  flex: 1;
  height: 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
}

.barFill {
  height: 100%;
  background: var(--color-accent, #FFB800);
  border-radius: 4px;
}

.reviewsList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reviewCard {
  background: var(--color-bg-secondary, #141414);
  padding: 16px;
  border-radius: var(--radius-lg, 12px);
  border: 1px solid rgba(255,255,255,0.05);
}

.reviewHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.reviewUser {
  font-weight: 600;
  color: var(--color-text-primary, #FAFAFA);
}

.reviewDate {
  font-size: 0.75rem;
  color: var(--color-text-muted, #737373);
}

.reviewStars {
  margin-bottom: 12px;
  font-size: 1rem;
}

.starFilled {
  color: var(--color-accent, #FFB800);
}

.starEmpty {
  color: rgba(255,255,255,0.2);
}

.reviewText {
  color: var(--color-text-secondary, #E5E5E5);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.bottomPadding {
  height: 100px;
}

.stickyCartBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255,255,255,0.1);
  z-index: 50;
  animation: slideUp 0.3s ease-out;
}

@media (max-width: 767px) {
  .stickyCartBar {
    bottom: 70px;
  }
  .bottomPadding {
    height: 170px;
  }
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.cartBarContent {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cartInfo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cartBadge {
  background: var(--color-primary, #FF6B35);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.cartTotal {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-text-primary, #FAFAFA);
}

.viewCartBtn {
  background: var(--color-primary, #FF6B35);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: var(--radius-full, 9999px);
  font-weight: 600;
  transition: all 0.2s ease;
}

.viewCartBtn:hover {
  background: var(--color-secondary, #F7931E);
  transform: scale(1.05);
}
""",
    "src/app/(client)/cart/page.tsx": """'use client';
import React, { useState } from 'react';
import styles from './cart.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const INITIAL_CART = [
  { id: 'd1', name: 'Bœuf Bourguignon', price: 18.50, quantity: 2, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=200' },
  { id: 'd3', name: 'Soupe à l\\'Oignon', price: 8.50, quantity: 1, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=200' }
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL_CART);
  const [instructions, setInstructions] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: Math.max(0, newQ) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = subtotal > 0 ? 2.50 : 0;
  const total = subtotal + serviceFee;

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderSuccess(true);
      setTimeout(() => {
        router.push('/orders');
      }, 2000);
    }, 1500);
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Votre panier est vide / Your cart is empty</h2>
        <p>Découvrez nos cuisiniers et ajoutez de délicieux plats. / Discover our cooks and add delicious dishes.</p>
        <Link href="/explore" className={styles.primaryBtn}>
          Explorer / Explore
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {orderSuccess && (
        <div className={styles.successModal}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <h2>Commande Confirmée!</h2>
            <h2>Order Confirmed!</h2>
            <p>Redirection vers vos commandes... / Redirecting to your orders...</p>
          </div>
        </div>
      )}

      <header className={styles.header}>
        <h1 className={styles.title}>Panier / Cart</h1>
        <p className={styles.cookName}>Commande auprès de: <strong>Marie Dupont</strong></p>
      </header>

      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <div className={styles.itemsList}>
            {items.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>€{item.price.toFixed(2)}</p>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantityControl}>
                    <button className={styles.qBtn} onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className={styles.qty}>{item.quantity}</span>
                    <button className={styles.qBtn} onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <p className={styles.itemTotal}>€{(item.price * item.quantity).toFixed(2)}</p>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.instructionsSection}>
            <label htmlFor="instructions" className={styles.sectionLabel}>
              Instructions spéciales / Special instructions
            </label>
            <textarea 
              id="instructions"
              className={styles.textarea}
              placeholder="Ex: Pas d'oignons, allergies... / E.g: No onions, allergies..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className={styles.pickupInfo}>
            <h3 className={styles.sectionLabel}>Informations de retrait / Pickup info</h3>
            <div className={styles.pickupCard}>
              <div className={styles.pickupIcon}>📍</div>
              <div>
                <p className={styles.pickupAddress}>123 Rue de la République, 75011 Paris</p>
                <p className={styles.pickupTime}>Prêt dans / Ready in: <strong>30-45 min</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Résumé / Summary</h3>
            
            <div className={styles.summaryRow}>
              <span>Sous-total / Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Frais de service / Service fee</span>
              <span>€{serviceFee.toFixed(2)}</span>
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.summaryRowTotal}>
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <button 
              className={styles.checkoutBtn} 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? 'Traitement... / Processing...' : 'Commander / Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
""",
    "src/app/(client)/cart/cart.module.css": """.page {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: var(--color-text-primary, #FAFAFA);
}

.cookName {
  color: var(--color-text-secondary, #E5E5E5);
  margin: 0;
}

.cookName strong {
  color: var(--color-primary, #FF6B35);
}

.layout {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (min-width: 1024px) {
  .layout {
    flex-direction: row;
  }
  .mainContent {
    flex: 2;
  }
  .sidebar {
    flex: 1;
    position: sticky;
    top: 24px;
    height: max-content;
  }
}

.itemsList {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.cartItem {
  display: flex;
  background: var(--color-bg-secondary, #141414);
  border-radius: var(--radius-lg, 12px);
  padding: 12px;
  gap: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  align-items: center;
  flex-wrap: wrap;
}

@media (min-width: 640px) {
  .cartItem {
    flex-wrap: nowrap;
  }
}

.itemImage {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md, 8px);
  object-fit: cover;
}

.itemDetails {
  flex: 1;
  min-width: 150px;
}

.itemName {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary, #FAFAFA);
}

.itemPrice {
  margin: 0;
  color: var(--color-text-muted, #737373);
}

.itemControls {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: space-between;
}

@media (min-width: 640px) {
  .itemControls {
    width: auto;
  }
}

.quantityControl {
  display: flex;
  align-items: center;
  background: var(--color-bg-tertiary, #1A1A1A);
  border-radius: var(--radius-full, 9999px);
  padding: 4px;
  border: 1px solid rgba(255,255,255,0.1);
}

.qBtn {
  background: transparent;
  border: none;
  color: var(--color-text-primary, #FAFAFA);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.2s;
}

.qBtn:hover {
  background: rgba(255,255,255,0.1);
}

.qty {
  width: 30px;
  text-align: center;
  font-weight: 600;
}

.itemTotal {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-primary, #FF6B35);
  margin: 0;
  min-width: 60px;
  text-align: right;
}

.removeBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 8px;
}

.removeBtn:hover {
  opacity: 1;
  color: var(--color-error, #EF4444);
}

.sectionLabel {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-text-primary, #FAFAFA);
}

.instructionsSection {
  margin-bottom: 32px;
}

.textarea {
  width: 100%;
  background: var(--color-bg-secondary, #141414);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-md, 8px);
  padding: 12px;
  color: var(--color-text-primary, #FAFAFA);
  font-family: inherit;
  resize: vertical;
  outline: none;
}

.textarea:focus {
  border-color: var(--color-primary, #FF6B35);
}

.pickupCard {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 107, 53, 0.05);
  border: 1px solid rgba(255, 107, 53, 0.2);
  padding: 16px;
  border-radius: var(--radius-lg, 12px);
}

.pickupIcon {
  font-size: 2rem;
}

.pickupAddress {
  margin: 0 0 4px 0;
  font-weight: 500;
  color: var(--color-text-primary, #FAFAFA);
}

.pickupTime {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary, #E5E5E5);
}

.summaryCard {
  background: var(--color-bg-secondary, #141414);
  border-radius: var(--radius-xl, 16px);
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.05);
}

.summaryTitle {
  margin: 0 0 20px 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.summaryRow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: var(--color-text-secondary, #E5E5E5);
}

.divider {
  height: 1px;
  background: rgba(255,255,255,0.1);
  margin: 16px 0;
}

.summaryRowTotal {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-primary, #FF6B35);
}

.checkoutBtn {
  width: 100%;
  background: var(--color-primary, #FF6B35);
  color: white;
  border: none;
  padding: 16px;
  border-radius: var(--radius-full, 9999px);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkoutBtn:hover:not(:disabled) {
  background: var(--color-secondary, #F7931E);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(255, 107, 53, 0.2);
}

.checkoutBtn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.emptyIcon {
  font-size: 4rem;
  margin-bottom: 24px;
  opacity: 0.5;
}

.primaryBtn {
  margin-top: 24px;
  background: var(--color-primary, #FF6B35);
  color: white;
  text-decoration: none;
  padding: 12px 32px;
  border-radius: var(--radius-full, 9999px);
  font-weight: 600;
  transition: background 0.2s;
}

.primaryBtn:hover {
  background: var(--color-secondary, #F7931E);
}

.successModal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.successCard {
  background: var(--color-bg-secondary, #141414);
  padding: 40px;
  border-radius: var(--radius-xl, 16px);
  text-align: center;
  border: 1px solid var(--color-primary, #FF6B35);
  box-shadow: 0 0 40px rgba(255, 107, 53, 0.2);
  transform: scale(0.9);
  animation: scaleUp 0.3s ease forwards;
}

.successIcon {
  font-size: 4rem;
  margin-bottom: 16px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  to { transform: scale(1); }
}
""",
    "src/app/(client)/orders/page.tsx": """'use client';
import React, { useState } from 'react';
import styles from './client-orders.module.css';
import Link from 'next/link';

const MOCK_ORDERS = [
  { 
    id: 'ORD-8492', 
    cookName: 'Marie Dupont', 
    cookAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    date: 'Aujourd\\'hui, 19:30', 
    status: 'preparing', 
    total: 46.50,
    items: '2x Bœuf Bourguignon, 1x Soupe à l\\'Oignon'
  },
  { 
    id: 'ORD-8480', 
    cookName: 'Chen Wei', 
    cookAvatar: 'https://images.unsplash.com/photo-1541614101331-1a5a3e19a40a?auto=format&fit=crop&q=80&w=200',
    date: '12 Mai 2024', 
    status: 'completed', 
    total: 28.00,
    items: '2x Pad Thaï, 4x Nems au Poulet',
    reviewed: true
  },
  { 
    id: 'ORD-8321', 
    cookName: 'Mamadou Diallo', 
    cookAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=200',
    date: '3 Mai 2024', 
    status: 'completed', 
    total: 35.50,
    items: '1x Poulet Yassa, 1x Mafé Bœuf',
    reviewed: false
  },
  { 
    id: 'ORD-8210', 
    cookName: 'Sophie Martin', 
    cookAvatar: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=200',
    date: '28 Avr 2024', 
    status: 'cancelled', 
    total: 18.00,
    items: '1x Tarte au Citron, 2x Éclairs'
  }
];

const STATUS_MAP = {
  pending: { label: 'En attente / Pending', step: 1, color: '#FFB800' },
  confirmed: { label: 'Confirmé / Confirmed', step: 2, color: '#3B82F6' },
  preparing: { label: 'En préparation / Preparing', step: 3, color: '#8B5CF6' },
  ready: { label: 'Prêt au retrait / Ready', step: 4, color: '#22C55E' },
  completed: { label: 'Terminé / Completed', step: 5, color: '#737373' },
  cancelled: { label: 'Annulé / Cancelled', step: 0, color: '#EF4444' }
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('active');

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'active':
        return MOCK_ORDERS.filter(o => ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status));
      case 'completed':
        return MOCK_ORDERS.filter(o => o.status === 'completed');
      case 'cancelled':
        return MOCK_ORDERS.filter(o => o.status === 'cancelled');
      default:
        return [];
    }
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mes Commandes / My Orders</h1>
      </header>

      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'active' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('active')}
        >
          En cours / Active
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'completed' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Terminées / Completed
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'cancelled' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Annulées / Cancelled
        </button>
      </div>

      <div className={styles.ordersList}>
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3>Aucune commande / No orders found</h3>
            <p>Vous n'avez pas de commande dans cette catégorie.</p>
            {activeTab === 'active' && (
              <Link href="/explore" className={styles.primaryBtn}>
                Commander maintenant / Order now
              </Link>
            )}
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderMeta}>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={styles.orderDate}>{order.date}</span>
                </div>
                <div 
                  className={styles.statusBadge}
                  style={{ 
                    backgroundColor: `${STATUS_MAP[order.status as keyof typeof STATUS_MAP].color}20`,
                    color: STATUS_MAP[order.status as keyof typeof STATUS_MAP].color,
                    borderColor: `${STATUS_MAP[order.status as keyof typeof STATUS_MAP].color}40`
                  }}
                >
                  {STATUS_MAP[order.status as keyof typeof STATUS_MAP].label}
                </div>
              </div>

              <div className={styles.cookInfo}>
                <img src={order.cookAvatar} alt={order.cookName} className={styles.cookAvatar} />
                <div className={styles.cookDetails}>
                  <h3 className={styles.cookName}>{order.cookName}</h3>
                  <p className={styles.orderItems}>{order.items}</p>
                </div>
                <div className={styles.orderTotal}>
                  €{order.total.toFixed(2)}
                </div>
              </div>

              {['pending', 'confirmed', 'preparing', 'ready'].includes(order.status) && (
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ 
                        width: `${(STATUS_MAP[order.status as keyof typeof STATUS_MAP].step / 4) * 100}%`,
                        backgroundColor: STATUS_MAP[order.status as keyof typeof STATUS_MAP].color
                      }}
                    ></div>
                  </div>
                  <div className={styles.progressLabels}>
                    <span className={STATUS_MAP[order.status as keyof typeof STATUS_MAP].step >= 1 ? styles.activeLabel : ''}>Reçue</span>
                    <span className={STATUS_MAP[order.status as keyof typeof STATUS_MAP].step >= 2 ? styles.activeLabel : ''}>Confirmée</span>
                    <span className={STATUS_MAP[order.status as keyof typeof STATUS_MAP].step >= 3 ? styles.activeLabel : ''}>Préparation</span>
                    <span className={STATUS_MAP[order.status as keyof typeof STATUS_MAP].step >= 4 ? styles.activeLabel : ''}>Prêt</span>
                  </div>
                </div>
              )}

              <div className={styles.orderActions}>
                {order.status === 'completed' && (
                  <>
                    <button className={styles.actionBtnPrimary}>Recommander / Reorder</button>
                    {!order.reviewed && (
                      <button className={styles.actionBtnSecondary}>Laisser un avis / Review</button>
                    )}
                  </>
                )}
                {order.status === 'active' && (
                  <button className={styles.actionBtnSecondary}>Contacter / Contact Cook</button>
                )}
                <button className={styles.actionBtnText}>Détails / View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
""",
    "src/app/(client)/orders/client-orders.module.css": """.page {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  margin-bottom: 24px;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  color: var(--color-text-primary, #FAFAFA);
}

.tabsContainer {
  display: flex;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 24px;
  gap: 16px;
}

.tabBtn {
  background: transparent;
  border: none;
  color: var(--color-text-muted, #737373);
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 16px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tabBtn:hover {
  color: var(--color-text-secondary, #E5E5E5);
}

.activeTab {
  color: var(--color-primary, #FF6B35);
}

.activeTab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary, #FF6B35);
  border-radius: 3px 3px 0 0;
}

.ordersList {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.orderCard {
  background: var(--color-bg-secondary, #141414);
  border-radius: var(--radius-xl, 16px);
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.05);
}

.orderHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.orderMeta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.orderId {
  font-weight: 700;
  color: var(--color-text-primary, #FAFAFA);
}

.orderDate {
  font-size: 0.875rem;
  color: var(--color-text-muted, #737373);
}

.statusBadge {
  padding: 6px 12px;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid transparent;
}

.cookInfo {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.cookAvatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.cookDetails {
  flex: 1;
}

.cookName {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary, #FAFAFA);
}

.orderItems {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary, #E5E5E5);
}

.orderTotal {
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--color-primary, #FF6B35);
}

.progressContainer {
  margin-bottom: 24px;
  background: var(--color-bg-tertiary, #1A1A1A);
  padding: 16px;
  border-radius: var(--radius-lg, 12px);
}

.progressBar {
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  margin-bottom: 12px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progressLabels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-muted, #737373);
}

.activeLabel {
  color: var(--color-text-primary, #FAFAFA);
  font-weight: 600;
}

.orderActions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.actionBtnPrimary, .actionBtnSecondary, .actionBtnText {
  padding: 8px 16px;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.actionBtnPrimary {
  background: var(--color-primary, #FF6B35);
  color: white;
  border: none;
}

.actionBtnPrimary:hover {
  background: var(--color-secondary, #F7931E);
}

.actionBtnSecondary {
  background: transparent;
  color: var(--color-text-primary, #FAFAFA);
  border: 1px solid rgba(255,255,255,0.2);
}

.actionBtnSecondary:hover {
  background: rgba(255,255,255,0.1);
}

.actionBtnText {
  background: transparent;
  color: var(--color-text-muted, #737373);
  border: none;
  margin-left: auto;
}

.actionBtnText:hover {
  color: var(--color-text-primary, #FAFAFA);
}

.emptyState {
  text-align: center;
  padding: 64px 20px;
  background: var(--color-bg-secondary, #141414);
  border-radius: var(--radius-xl, 16px);
  border: 1px dashed rgba(255,255,255,0.1);
}

.emptyIcon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.emptyState h3 {
  margin: 0 0 8px 0;
  color: var(--color-text-primary, #FAFAFA);
}

.emptyState p {
  color: var(--color-text-muted, #737373);
  margin-bottom: 24px;
}

.primaryBtn {
  display: inline-block;
  background: var(--color-primary, #FF6B35);
  color: white;
  text-decoration: none;
  padding: 10px 24px;
  border-radius: var(--radius-full, 9999px);
  font-weight: 600;
  transition: background 0.2s;
}

.primaryBtn:hover {
  background: var(--color-secondary, #F7931E);
}
"""
}

for path, content in files.items():
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("All client-side files created successfully.")
