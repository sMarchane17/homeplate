'use client';

import React, { useState } from 'react';
import styles from './orders.module.css';

export default function OrdersPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [activeTab, setActiveTab] = useState('Pending');

  const tabs = ['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'];

  const orders = [
    { id: '#ORD-005', customer: 'Antoine B.', items: [{ name: 'Bœuf Bourguignon', qty: 2 }, { name: 'Tarte Tatin', qty: 2 }], total: 51.00, time: '5 mins ago', status: 'Pending' },
    { id: '#ORD-006', customer: 'Camille L.', items: [{ name: 'Ratatouille', qty: 1 }], total: 12.00, time: '12 mins ago', status: 'Pending' },
    { id: '#ORD-001', customer: 'Sophie M.', items: [{ name: 'Bœuf Bourguignon', qty: 2 }], total: 45.00, time: '10 min ago', status: 'In Progress' },
    { id: '#ORD-002', customer: 'Jean P.', items: [{ name: 'Coq au Vin', qty: 1 }, { name: 'Tarte Tatin', qty: 1 }], total: 32.50, time: '45 min ago', status: 'In Progress' },
    { id: '#ORD-003', customer: 'Marie D.', items: [{ name: 'Ratatouille', qty: 3 }], total: 42.00, time: '1 hr ago', status: 'Completed' },
    { id: '#ORD-004', customer: 'Lucas T.', items: [{ name: 'Quiche Lorraine', qty: 1 }], total: 15.00, time: '3 hrs ago', status: 'Completed' },
    { id: '#ORD-007', customer: 'Elodie R.', items: [{ name: 'Crème Brûlée', qty: 4 }], total: 34.00, time: '5 hrs ago', status: 'Cancelled' },
  ];

  const filteredOrders = activeTab === 'All' ? orders : orders.filter(o => o.status === activeTab);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{lang === 'en' ? 'Orders' : 'Commandes'}</h1>
          <p className={styles.subtitle}>
            {lang === 'en' ? 'Manage your incoming orders.' : 'Gérez vos commandes entrantes.'}
          </p>
        </div>
      </header>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button 
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {lang === 'fr' && tab === 'Pending' ? 'En attente' : 
               lang === 'fr' && tab === 'In Progress' ? 'En cours' : 
               lang === 'fr' && tab === 'Completed' ? 'Terminé' : 
               lang === 'fr' && tab === 'Cancelled' ? 'Annulé' : 
               lang === 'fr' && tab === 'All' ? 'Toutes' : tab}
               
              <span className={styles.badge}>
                {tab === 'All' ? orders.length : orders.filter(o => o.status === tab).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.ordersGrid}>
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🍽️</span>
            <h3>{lang === 'en' ? 'No orders found' : 'Aucune commande trouvée'}</h3>
            <p>{lang === 'en' ? `You don't have any ${activeTab.toLowerCase()} orders right now.` : `Vous n'avez aucune commande ${activeTab.toLowerCase()} pour le moment.`}</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <h3 className={styles.orderId}>{order.id}</h3>
                  <span className={styles.time}>{order.time}</span>
                </div>
                <div className={`${styles.statusBadge} ${styles[order.status.replace(/\s+/g, '')]}`}>
                  {lang === 'fr' && order.status === 'Pending' ? 'En attente' : 
                   lang === 'fr' && order.status === 'In Progress' ? 'En cours' : 
                   lang === 'fr' && order.status === 'Completed' ? 'Terminé' : 
                   lang === 'fr' && order.status === 'Cancelled' ? 'Annulé' : order.status}
                </div>
              </div>

              <div className={styles.customerInfo}>
                <span className={styles.customerIcon}>👤</span>
                <span className={styles.customerName}>{order.customer}</span>
              </div>

              <div className={styles.itemsList}>
                {order.items.map((item, idx) => (
                  <div key={idx} className={styles.item}>
                    <span className={styles.itemQty}>{item.qty}x</span>
                    <span className={styles.itemName}>{item.name}</span>
                  </div>
                ))}
              </div>

              <div className={styles.orderFooter}>
                <div className={styles.totalWrapper}>
                  <span className={styles.totalLabel}>{lang === 'en' ? 'Total' : 'Total'}</span>
                  <span className={styles.totalValue}>€{order.total.toFixed(2)}</span>
                </div>
                
                <div className={styles.actionButtons}>
                  {order.status === 'Pending' && (
                    <>
                      <button className={styles.rejectBtn}>{lang === 'en' ? 'Reject' : 'Refuser'}</button>
                      <button className={styles.acceptBtn}>{lang === 'en' ? 'Accept' : 'Accepter'}</button>
                    </>
                  )}
                  {order.status === 'In Progress' && (
                    <button className={styles.readyBtn}>{lang === 'en' ? 'Mark Ready' : 'Marquer Prêt'}</button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
