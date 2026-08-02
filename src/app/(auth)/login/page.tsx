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

          <form 
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const emailInput = (document.getElementById('email') as HTMLInputElement).value;
              const passwordInput = (document.getElementById('password') as HTMLInputElement).value;

              if (!emailInput || !passwordInput) {
                alert("Veuillez remplir tous les champs / Please fill in all fields");
                return;
              }

              // Retrieve user from localStorage if exists
              const savedUserStr = localStorage.getItem('user_session');
              if (savedUserStr) {
                const savedUser = JSON.parse(savedUserStr);
                if (savedUser.email === emailInput) {
                  // Successful simulated login
                  // Set active session cookie/localStorage
                  localStorage.setItem('active_user', JSON.stringify(savedUser));
                  alert(`Bienvenue, ${savedUser.name}! / Welcome, ${savedUser.name}!`);
                  
                  if (savedUser.role === 'cook') {
                    window.location.href = '/cook/dashboard';
                  } else {
                    window.location.href = '/explore';
                  }
                  return;
                }
              }

              // Fallback default test accounts if no matching localStorage found
              if (emailInput === 'chef@homeplate.com') {
                const mockCook = { name: 'Chef Mario', email: 'chef@homeplate.com', role: 'cook', specialty: 'Italien' };
                localStorage.setItem('active_user', JSON.stringify(mockCook));
                window.location.href = '/cook/dashboard';
              } else if (emailInput === 'client@homeplate.com') {
                const mockEater = { name: 'Alice eater', email: 'client@homeplate.com', role: 'eater' };
                localStorage.setItem('active_user', JSON.stringify(mockEater));
                window.location.href = '/explore';
              } else {
                // If it doesn't match and no signup was done, notify user or create automatic eater session for demo purposes
                alert("Identifiants non reconnus. Nous créons une session démo Client ! / Unrecognized credentials. Creating a Client demo session!");
                const demoUser = { name: 'Visiteur HomePlate', email: emailInput, role: 'eater' };
                localStorage.setItem('active_user', JSON.stringify(demoUser));
                window.location.href = '/explore';
              }
            }}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="nom@exemple.com" className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Mot de passe / Password</label>
                <a href="#" className={styles.forgotLink}>Oublié ? / Forgot?</a>
              </div>
              <input type="password" id="password" placeholder="••••••••" className={styles.input} required />
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
            <button className={styles.socialBtn} type="button" onClick={() => {
              const mockEater = { name: 'Alice Google', email: 'alice.google@gmail.com', role: 'eater' };
              localStorage.setItem('active_user', JSON.stringify(mockEater));
              window.location.href = '/explore';
            }}>
              Continuer avec Google (Client)
            </button>
            <button className={styles.socialBtn} type="button" onClick={() => {
              const mockCook = { name: 'Chef Pierre', email: 'pierre.apple@icloud.com', role: 'cook', specialty: 'Français' };
              localStorage.setItem('active_user', JSON.stringify(mockCook));
              window.location.href = '/cook/dashboard';
            }}>
              Continuer avec Apple (Cuisinier)
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
