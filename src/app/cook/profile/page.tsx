'use client';

import React, { useState } from 'react';
import styles from './profile.module.css';

export default function ProfilePage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [isSaving, setIsSaving] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daysFr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{lang === 'en' ? 'My Profile' : 'Mon Profil'}</h1>
        <p className={styles.subtitle}>
          {lang === 'en' ? 'Manage your kitchen settings and personal information.' : 'Gérez les paramètres de votre cuisine et vos informations personnelles.'}
        </p>
      </header>

      <div className={styles.profileHeaderCard}>
        <div className={styles.profileAvatar}>MC</div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>Marie Curie</h2>
          <div className={styles.profileMeta}>
            <span className={styles.rating}>⭐ 4.8 (124 reviews)</span>
            <span className={styles.memberSince}>
              {lang === 'en' ? 'Member since 2023' : 'Membre depuis 2023'}
            </span>
          </div>
        </div>
      </div>

      <form className={styles.formContainer} onSubmit={handleSave}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{lang === 'en' ? 'Personal Information' : 'Informations Personnelles'}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang === 'en' ? 'Full Name' : 'Nom complet'}</label>
              <input type="text" className={styles.input} defaultValue="Marie Curie" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang === 'en' ? 'Phone Number' : 'Numéro de téléphone'}</label>
              <input type="tel" className={styles.input} defaultValue="+33 6 12 34 56 78" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>{lang === 'en' ? 'Email Address' : 'Adresse e-mail'}</label>
              <input type="email" className={styles.input} defaultValue="marie.curie@example.com" />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{lang === 'en' ? 'Kitchen Information' : 'Informations de Cuisine'}</h3>
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Kitchen Type' : 'Type de cuisine'}</label>
            <select className={styles.select} defaultValue="french">
              <option value="french">{lang === 'en' ? 'French Cuisine' : 'Cuisine Française'}</option>
              <option value="italian">{lang === 'en' ? 'Italian Cuisine' : 'Cuisine Italienne'}</option>
              <option value="asian">{lang === 'en' ? 'Asian Cuisine' : 'Cuisine Asiatique'}</option>
              <option value="fusion">{lang === 'en' ? 'Fusion' : 'Fusion'}</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Bio (EN)' : 'Bio (EN)'}</label>
            <textarea className={styles.textarea} rows={4} defaultValue="Passionate about traditional French cooking, bringing family recipes to your table."></textarea>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Bio (FR)' : 'Bio (FR)'}</label>
            <textarea className={styles.textarea} rows={4} defaultValue="Passionnée par la cuisine française traditionnelle, apportant des recettes familiales à votre table."></textarea>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{lang === 'en' ? 'Location (Pickup Only)' : 'Lieu (Retrait uniquement)'}</h3>
          <div className={styles.formGroup}>
            <label className={styles.label}>{lang === 'en' ? 'Pickup Address' : 'Adresse de retrait'}</label>
            <input type="text" className={styles.input} defaultValue="12 Rue de la Paix, 75002 Paris" />
          </div>
          <div className={styles.mapPlaceholder}>
            <span>{lang === 'en' ? 'Interactive Map Placeholder' : 'Emplacement carte interactive'}</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>{lang === 'en' ? 'Delivery Options' : 'Options de Livraison'}</h3>
            <span className={styles.comingSoonBadge}>{lang === 'en' ? 'Coming Soon' : 'Bientôt disponible'}</span>
          </div>
          <p className={styles.disabledText}>
            {lang === 'en' ? 'Delivery features will be available in a future update. Currently, HomePlate is pickup-only.' : 'Les fonctionnalités de livraison seront disponibles dans une future mise à jour. Actuellement, HomePlate est uniquement en retrait.'}
          </p>
          <div className={`${styles.formGroup} ${styles.disabled}`}>
            <label className={styles.label}>{lang === 'en' ? 'Delivery Radius (km)' : 'Rayon de livraison (km)'}</label>
            <input type="range" min="1" max="20" disabled className={styles.rangeInput} />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{lang === 'en' ? 'Availability Schedule' : 'Horaires de disponibilité'}</h3>
          <div className={styles.scheduleGrid}>
            {(lang === 'en' ? days : daysFr).map((day, i) => (
              <div key={day} className={styles.scheduleRow}>
                <div className={styles.dayToggle}>
                  <label className={styles.switch}>
                    <input type="checkbox" defaultChecked={i < 5} />
                    <span className={styles.slider}></span>
                  </label>
                  <span className={styles.dayName}>{day}</span>
                </div>
                <div className={styles.timeInputs}>
                  <input type="time" className={styles.timeInput} defaultValue="10:00" disabled={i >= 5} />
                  <span>-</span>
                  <input type="time" className={styles.timeInput} defaultValue="20:00" disabled={i >= 5} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveBtn} disabled={isSaving}>
            {isSaving ? (lang === 'en' ? 'Saving...' : 'Enregistrement...') : (lang === 'en' ? 'Save Changes' : 'Enregistrer les modifications')}
          </button>
        </div>
      </form>
    </div>
  );
}
