'use client';
import React, { useState } from 'react';
import styles from './cart.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const INITIAL_CART = [
  { id: 'd1', name: 'Bœuf Bourguignon', price: 18.50, quantity: 2, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=200' },
  { id: 'd3', name: "Soupe à l'Oignon", price: 8.50, quantity: 1, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=200' }
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
