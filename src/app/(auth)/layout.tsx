import styles from './auth-layout.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authContainer}>
      <div className={styles.backgroundGlow}></div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
