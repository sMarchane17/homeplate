import React, { createContext, useContext, useState, ReactNode } from 'react';

type Translations = Record<string, Record<string, string>>;

export const translations: Translations = {
  // Navigation
  "nav.home": { fr: "Accueil", en: "Home" },
  "nav.explore": { fr: "Explorer", en: "Explore" },
  "nav.login": { fr: "Connexion", en: "Login" },
  "nav.register": { fr: "Inscription", en: "Register" },
  "nav.profile": { fr: "Mon Profil", en: "My Profile" },
  "nav.orders": { fr: "Mes Commandes", en: "My Orders" },
  "nav.logout": { fr: "Déconnexion", en: "Logout" },
  "nav.becomeCook": { fr: "Devenir Cuisinier", en: "Become a Cook" },
  "nav.dashboard": { fr: "Tableau de Bord", en: "Dashboard" },

  // Landing Page
  "hero.title": { fr: "Les meilleurs plats faits maison, près de chez vous", en: "The best homemade dishes, near you" },
  "hero.subtitle": { fr: "Découvrez des cuisiniers locaux passionnés et savourez des repas authentiques.", en: "Discover passionate local cooks and savor authentic meals." },
  "hero.cta": { fr: "Trouver un plat", en: "Find a dish" },
  "hero.features.fresh": { fr: "Ingrédients frais", en: "Fresh ingredients" },
  "hero.features.local": { fr: "Cuisiniers locaux", en: "Local cooks" },
  "hero.features.authentic": { fr: "Recettes authentiques", en: "Authentic recipes" },

  // Auth Forms
  "auth.email": { fr: "Adresse e-mail", en: "Email address" },
  "auth.password": { fr: "Mot de passe", en: "Password" },
  "auth.name": { fr: "Nom complet", en: "Full name" },
  "auth.loginBtn": { fr: "Se connecter", en: "Log in" },
  "auth.registerBtn": { fr: "S'inscrire", en: "Register" },
  "auth.noAccount": { fr: "Pas encore de compte ?", en: "Don't have an account?" },
  "auth.hasAccount": { fr: "Déjà un compte ?", en: "Already have an account?" },

  // Buttons
  "btn.save": { fr: "Enregistrer", en: "Save" },
  "btn.cancel": { fr: "Annuler", en: "Cancel" },
  "btn.edit": { fr: "Modifier", en: "Edit" },
  "btn.delete": { fr: "Supprimer", en: "Delete" },
  "btn.add": { fr: "Ajouter", en: "Add" },
  "btn.confirm": { fr: "Confirmer", en: "Confirm" },
  "btn.back": { fr: "Retour", en: "Back" },
  "btn.viewDetails": { fr: "Voir les détails", en: "View Details" },
  "btn.orderNow": { fr: "Commander", en: "Order Now" },
  "btn.submit": { fr: "Soumettre", en: "Submit" },

  // Cook Profile
  "cook.specialty": { fr: "Spécialité", en: "Specialty" },
  "cook.kitchenType": { fr: "Type de cuisine", en: "Kitchen Type" },
  "cook.bio": { fr: "Biographie", en: "Bio" },
  "cook.deliveryRadius": { fr: "Rayon de livraison (km)", en: "Delivery Radius (km)" },
  "cook.minOrderAmount": { fr: "Montant minimum de commande", en: "Minimum Order Amount" },
  "cook.dishes": { fr: "Plats", en: "Dishes" },
  "cook.reviews": { fr: "Avis", en: "Reviews" },
  "cook.availability": { fr: "Disponibilités", en: "Availability" },
  "cook.rating": { fr: "Note moyenne", en: "Average Rating" },
  "cook.totalOrders": { fr: "Total des commandes", en: "Total Orders" },

  // Dish
  "dish.name": { fr: "Nom du plat", en: "Dish Name" },
  "dish.description": { fr: "Description", en: "Description" },
  "dish.price": { fr: "Prix", en: "Price" },
  "dish.category": { fr: "Catégorie", en: "Category" },
  "dish.allergens": { fr: "Allergènes", en: "Allergens" },
  "dish.prepTime": { fr: "Temps de préparation (min)", en: "Prep Time (min)" },
  "dish.vegetarian": { fr: "Végétarien", en: "Vegetarian" },
  "dish.vegan": { fr: "Végétalien", en: "Vegan" },
  "dish.glutenFree": { fr: "Sans gluten", en: "Gluten-Free" },
  "dish.isAvailable": { fr: "Disponible", en: "Available" },
  "dish.notAvailable": { fr: "Indisponible", en: "Unavailable" },

  // Orders
  "order.id": { fr: "Numéro de commande", en: "Order ID" },
  "order.status": { fr: "Statut", en: "Status" },
  "order.total": { fr: "Total", en: "Total" },
  "order.type": { fr: "Type", en: "Type" },
  "order.note": { fr: "Note pour le cuisinier", en: "Note for cook" },
  "order.estimatedReady": { fr: "Heure estimée", en: "Estimated time" },
  "order.items": { fr: "Articles", en: "Items" },
  "order.clientDetails": { fr: "Détails du client", en: "Client Details" },
  "order.cookDetails": { fr: "Détails du cuisinier", en: "Cook Details" },

  // Order Status
  "status.PENDING": { fr: "En attente", en: "Pending" },
  "status.CONFIRMED": { fr: "Confirmé", en: "Confirmed" },
  "status.PREPARING": { fr: "En préparation", en: "Preparing" },
  "status.READY": { fr: "Prêt", en: "Ready" },
  "status.PICKED_UP": { fr: "Récupéré", en: "Picked Up" },
  "status.CANCELLED": { fr: "Annulé", en: "Cancelled" },

  // Order Types
  "orderType.PICKUP": { fr: "À emporter", en: "Pickup" },
  "orderType.DELIVERY": { fr: "Livraison (Bientôt disponible)", en: "Delivery (Coming soon)" },

  // Categories
  "category.APPETIZER": { fr: "Entrée", en: "Appetizer" },
  "category.MAIN_COURSE": { fr: "Plat principal", en: "Main Course" },
  "category.DESSERT": { fr: "Dessert", en: "Dessert" },
  "category.BEVERAGE": { fr: "Boisson", en: "Beverage" },
  "category.SNACK": { fr: "En-cas", en: "Snack" },

  // Errors
  "error.general": { fr: "Une erreur est survenue", en: "An error occurred" },
  "error.unauthorized": { fr: "Non autorisé", en: "Unauthorized" },
  "error.notFound": { fr: "Non trouvé", en: "Not found" },
  "error.invalidEmail": { fr: "Email invalide", en: "Invalid email" },
  "error.weakPassword": { fr: "Mot de passe trop faible", en: "Password too weak" },
  "error.required": { fr: "Ce champ est requis", en: "This field is required" },
  "error.paymentFailed": { fr: "Le paiement a échoué", en: "Payment failed" },

  // Success
  "success.saved": { fr: "Enregistré avec succès", en: "Saved successfully" },
  "success.deleted": { fr: "Supprimé avec succès", en: "Deleted successfully" },
  "success.orderPlaced": { fr: "Commande passée avec succès", en: "Order placed successfully" },
  "success.profileUpdated": { fr: "Profil mis à jour", en: "Profile updated" },

  // Roles
  "role.CLIENT": { fr: "Client", en: "Client" },
  "role.COOK": { fr: "Cuisinier", en: "Cook" },
  "role.ADMIN": { fr: "Administrateur", en: "Admin" },

  // Days
  "day.MONDAY": { fr: "Lundi", en: "Monday" },
  "day.TUESDAY": { fr: "Mardi", en: "Tuesday" },
  "day.WEDNESDAY": { fr: "Mercredi", en: "Wednesday" },
  "day.THURSDAY": { fr: "Jeudi", en: "Thursday" },
  "day.FRIDAY": { fr: "Vendredi", en: "Friday" },
  "day.SATURDAY": { fr: "Samedi", en: "Saturday" },
  "day.SUNDAY": { fr: "Dimanche", en: "Sunday" },

  // Form labels
  "form.avatar": { fr: "Photo de profil", en: "Profile Picture" },
  "form.coverImage": { fr: "Image de couverture", en: "Cover Image" },
  "form.phone": { fr: "Numéro de téléphone", en: "Phone Number" },
  "form.address": { fr: "Adresse", en: "Address" },
  "form.search": { fr: "Rechercher", en: "Search" },
  
  // Empty states
  "empty.dishes": { fr: "Aucun plat disponible pour le moment.", en: "No dishes available at the moment." },
  "empty.orders": { fr: "Vous n'avez pas encore de commande.", en: "You don't have any orders yet." },
  "empty.reviews": { fr: "Aucun avis pour le moment.", en: "No reviews yet." },
  "empty.cooks": { fr: "Aucun cuisinier trouvé dans votre zone.", en: "No cooks found in your area." },
  "empty.cart": { fr: "Votre panier est vide.", en: "Your cart is empty." },

  // Cart & Checkout
  "cart.title": { fr: "Votre Panier", en: "Your Cart" },
  "cart.subtotal": { fr: "Sous-total", en: "Subtotal" },
  "cart.checkout": { fr: "Passer à la caisse", en: "Checkout" },
  "checkout.title": { fr: "Paiement", en: "Checkout" },
  "checkout.pay": { fr: "Payer", en: "Pay" }
};

export function t(key: string, locale: string = 'fr'): string {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  return translations[key][locale] || translations[key]['en'] || key;
}

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children, initialLocale = 'fr' }: { children: ReactNode, initialLocale?: string }) {
  const [locale, setLocale] = useState(initialLocale);

  const contextValue = {
    locale,
    setLocale,
    t: (key: string) => t(key, locale),
  };

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
