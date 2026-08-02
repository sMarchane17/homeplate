'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      {/* Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Home</span>
          <span className={styles.logoAccent}>Plate</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="/login" className={styles.loginBtn}>Connexion / Login</Link>
          <Link href="/register" className={styles.signupBtn}>Inscription / Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Des plats faits maison, <br />
            <span className={styles.highlight}>livrés chez vous</span>
          </h1>
          <h2 className={styles.subtitle}>
            Homemade dishes, delivered to you
          </h2>
          <p className={styles.description}>
            Découvrez les meilleurs cuisiniers amateurs près de chez vous. 
            / Discover the best home cooks near you.
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>📍</span>
              <input type="text" placeholder="Entrez votre adresse / Enter your address" className={styles.searchInput} />
              <button className={styles.searchBtn}>Trouver / Find</button>
            </div>
          </div>
        </div>
        
        <div className={styles.floatingDecorations}>
          <span className={`${styles.emoji} ${styles.emoji1}`}>🍝</span>
          <span className={`${styles.emoji} ${styles.emoji2}`}>🌮</span>
          <span className={`${styles.emoji} ${styles.emoji3}`}>🍱</span>
          <span className={`${styles.emoji} ${styles.emoji4}`}>🥗</span>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Explorez par cuisine <span className={styles.sectionSubtitle}>/ Explore by cuisine</span></h2>
        <div className={styles.categoryGrid}>
          {[
            { name: "Français", emoji: "🇫🇷" },
            { name: "Africain", emoji: "🌍" },
            { name: "Asiatique", emoji: "🇯🇵" },
            { name: "Italien", emoji: "🇮🇹" },
            { name: "Libanais", emoji: "🇱🇧" },
            { name: "Mexicain", emoji: "🇲🇽" },
            { name: "Indien", emoji: "🇮🇳" },
            { name: "Américain", emoji: "🇺🇸" },
            { name: "Desserts", emoji: "🍰" }
          ].map((cat, i) => (
            <div key={i} className={styles.categoryCard}>
              <span className={styles.categoryEmoji}>{cat.emoji}</span>
              <span className={styles.categoryName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>Comment ça marche <span className={styles.sectionSubtitle}>/ How it works</span></h2>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepIcon}>📍</div>
            <h3>1. Trouvez un cuisinier</h3>
            <p>Find a cook near you</p>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>🍽️</div>
            <h3>2. Choisissez et commandez</h3>
            <p>Browse their menu and order</p>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>🏃</div>
            <h3>3. Récupérez votre plat</h3>
            <p>Pick up your delicious meal</p>
          </div>
        </div>
      </section>

      {/* Featured Cooks */}
      <section className={styles.featuredCooks}>
        <h2 className={styles.sectionTitle}>Cuisiniers populaires <span className={styles.sectionSubtitle}>/ Popular cooks</span></h2>
        <div className={styles.cooksScroll}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.cookCard}>
              <div className={styles.cookImagePlaceHolder}>Chef {i}</div>
              <div className={styles.cookInfo}>
                <h3 className={styles.cookName}>Marie Dubois</h3>
                <p className={styles.cookSpecialty}>Spécialités Françaises</p>
                <div className={styles.cookRating}>
                  <span>⭐️ 4.9</span>
                  <span>(124 avis)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Become a Cook */}
      <section className={styles.becomeCook}>
        <div className={styles.becomeCookContent}>
          <h2 className={styles.sectionTitle}>Devenez cuisinier <br/><span className={styles.sectionSubtitle}>/ Become a cook</span></h2>
          <ul className={styles.benefitsList}>
            <li>🕒 Définissez vos propres horaires / Set your own schedule</li>
            <li>💰 Gagnez un revenu supplémentaire / Earn extra income</li>
            <li>❤️ Partagez votre passion / Share your passion</li>
          </ul>
          <Link href="/register" className={styles.ctaBtn}>Commencer / Start Now</Link>
        </div>
        <div className={styles.becomeCookImage}>
          <div className={styles.imagePlaceholder}>Chef Cooking</div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <h4>500+</h4>
          <p>Cuisiniers / Cooks</p>
        </div>
        <div className={styles.statItem}>
          <h4>10,000+</h4>
          <p>Plats / Dishes</p>
        </div>
        <div className={styles.statItem}>
          <h4>50,000+</h4>
          <p>Commandes / Orders</p>
        </div>
        <div className={styles.statItem}>
          <h4>4.8★</h4>
          <p>Note moyenne / Avg rating</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>Témoignages <span className={styles.sectionSubtitle}>/ Testimonials</span></h2>
        <div className={styles.testimonialGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.testimonialCard}>
              <p className={styles.quote}>"Les meilleurs plats faits maison de la ville ! La qualité est exceptionnelle et les portions généreuses."</p>
              <div className={styles.author}>
                <div className={styles.avatar}>A</div>
                <div>
                  <h5>Alexandre {i}</h5>
                  <p>⭐️⭐️⭐️⭐️⭐️</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 HomePlate. Tous droits réservés / All rights reserved.</p>
      </footer>
    </main>
  );
}
