'use client';

import React from 'react';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
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
          <h1 className={styles.title}>Bon retour / Welcome back</h1>
          <p className={styles.subtitle}>Connectez-vous pour continuer / Sign in to continue</p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="nom@exemple.com" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Mot de passe / Password</label>
                <a href="#" className={styles.forgotLink}>Oublié ? / Forgot?</a>
              </div>
              <input type="password" id="password" placeholder="••••••••" className={styles.input} />
            </div>

            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="remember" className={styles.checkbox} />
              <label htmlFor="remember">Se souvenir de moi / Remember me</label>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Se connecter / Log In
            </button>
          </form>

          <div className={styles.divider}>
            <span>ou / or</span>
          </div>

          <div className={styles.socialAuth}>
            <button className={styles.socialBtn}>
              Continuer avec Google
            </button>
            <button className={styles.socialBtn}>
              Continuer avec Apple
            </button>
          </div>

          <p className={styles.footer}>
            Pas encore de compte ? / Don't have an account?{' '}
            <Link href="/register" className={styles.link}>S'inscrire / Sign up</Link>
          </p>
        </div>
      </div>

      {/* Decorative Side */}
      <div className={styles.decorativeSide}>
        <div className={styles.decorativeContent}>
          <h2>Des saveurs authentiques,</h2>
          <h2>juste à côté.</h2>
          <p>Authentic flavors, right next door.</p>
        </div>
      </div>
    </div>
  );
}
