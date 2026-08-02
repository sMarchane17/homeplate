'use client';
import React, { useState } from 'react';
import styles from './client-orders.module.css';
import Link from 'next/link';

const MOCK_ORDERS = [
  { 
    id: 'ORD-8492', 
    cookName: 'Marie Dupont', 
    cookAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    date: "Aujourd'hui, 19:30", 
    status: 'preparing', 
    total: 46.50,
    items: "2x Bœuf Bourguignon, 1x Soupe à l'Oignon"
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
