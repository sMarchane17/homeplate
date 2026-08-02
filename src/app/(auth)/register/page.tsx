'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'eater' | 'cook' | null>(null);

  const handleRoleSelect = (selectedRole: 'eater' | 'cook') => {
    setRole(selectedRole);
    setStep(2);
  };

  return (
    <div className={styles.splitLayout}>
      {/* Form Side */}
      <div className={styles.formSide}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>Home</span>
            <span className={styles.logoAccent}>Plate</span>
          </Link>
        </div>

        <div className={styles.formContent}>
          {/* Progress Indicator */}
          <div className={styles.progressContainer}>
            <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>1</div>
            <div className={`${styles.progressLine} ${step >= 2 ? styles.activeLine : ''}`}></div>
            <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>2</div>
          </div>

          {step === 1 ? (
            <div className={styles.roleSelection}>
              <h1 className={styles.title}>Rejoignez-nous / Join us</h1>
              <p className={styles.subtitle}>Que souhaitez-vous faire ? / What do you want to do?</p>

              <div className={styles.roleCards}>
                <button 
                  className={styles.roleCard}
                  onClick={() => handleRoleSelect('eater')}
                >
                  <div className={styles.roleIcon}>🍽️</div>
                  <h3>Je veux manger</h3>
                  <p>I want to eat</p>
                </button>

                <button 
                  className={styles.roleCard}
                  onClick={() => handleRoleSelect('cook')}
                >
                  <div className={styles.roleIcon}>🧑‍🍳</div>
                  <h3>Je veux cuisiner</h3>
                  <p>I want to cook</p>
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.registrationForm}>
              <div className={styles.backButton}>
                <button onClick={() => setStep(1)}>← Retour / Back</button>
              </div>
              <h1 className={styles.title}>
                {role === 'cook' ? 'Devenir Cuisinier / Become a Cook' : 'Créer un compte / Create account'}
              </h1>

              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Nom complet / Full name</label>
                  <input type="text" id="name" placeholder="Jean Dupont" className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="nom@exemple.com" className={styles.input} />
                </div>

                {role === 'cook' && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="specialty">Spécialité / Specialty</label>
                    <input type="text" id="specialty" placeholder="Cuisine Italienne" className={styles.input} />
                  </div>
                )}

                <div className={styles.inputGroup}>
                  <label htmlFor="password">Mot de passe / Password</label>
                  <input type="password" id="password" placeholder="••••••••" className={styles.input} />
                </div>

                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="terms" className={styles.checkbox} />
                  <label htmlFor="terms">J'accepte les conditions / I agree to terms</label>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  S'inscrire / Register
                </button>
              </form>
            </div>
          )}

          <p className={styles.footer}>
            Déjà un compte ? / Already have an account?{' '}
            <Link href="/login" className={styles.link}>Se connecter / Log in</Link>
          </p>
        </div>
      </div>

      {/* Decorative Side */}
      <div className={styles.decorativeSide}>
        <div className={styles.decorativeContent}>
          <h2>Rejoignez la communauté.</h2>
          <p>Join the community.</p>
        </div>
      </div>
    </div>
  );
}
