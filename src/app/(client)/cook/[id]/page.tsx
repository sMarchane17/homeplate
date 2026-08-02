'use client';
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
    { id: 'd3', category: 'Entrées', name: "Soupe à l'Oignon", description: "Traditionnelle soupe à l'oignon gratinée au gruyère avec croûtons maison. / Traditional French onion soup gratinated with gruyere and homemade croutons.", price: 8.50, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600', badges: ['V'], prepTime: '20 min' },
    { id: 'd4', category: 'Desserts', name: 'Tarte Tatin', description: 'Tarte aux pommes caramélisées servie tiède, un classique indémodable. / Caramelized apple tart served warm, a timeless classic.', price: 6.50, image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=600', badges: ['V'], prepTime: '15 min' },
    { id: 'd5', category: 'Plats', name: 'Ratatouille Niçoise', description: "Mélange de légumes du soleil confits à l'huile d'olive et aux herbes de Provence. / Sun-kissed vegetables cooked in olive oil and Provence herbs.", price: 14.00, image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&q=80&w=600', badges: ['V', 'VG', 'GF'], prepTime: '30 min' },
    { id: 'd6', category: 'Desserts', name: 'Crème Brûlée', description: 'Crème onctueuse à la vanille de Madagascar avec sa croûte de sucre caramélisé. / Creamy Madagascar vanilla custard with caramelized sugar crust.', price: 7.00, image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?auto=format&fit=crop&q=80&w=600', badges: ['V', 'GF'], prepTime: '10 min' }
  ],
  reviews: [
    { id: 'r1', user: 'Julien M.', rating: 5, date: 'Il y a 2 jours', text: 'Le bœuf bourguignon était exceptionnel ! La viande fondait dans la bouche. Je commanderai à nouveau.' },
    { id: 'r2', user: 'Sarah L.', rating: 5, date: 'Semaine dernière', text: 'Portions très généreuses et beaucoup de goût. Merci Marie pour ce délicieux repas.' },
    { id: 'r3', user: 'Thomas D.', rating: 4, date: 'Il y a 2 semaines', text: "Très bon mais un peu trop salé à mon goût pour la soupe à l'oignon. Le reste était parfait." }
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
