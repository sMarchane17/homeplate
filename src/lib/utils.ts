export function formatPrice(price: number, locale: string = 'fr'): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: locale === 'fr' ? 'EUR' : 'USD',
  }).format(price);
}

export function formatDate(date: Date, locale: string = 'fr'): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaPhi = (lat2 - lat1) * Math.PI / 180;
  const deltaLambda = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getStatusLabel(status: string, locale: string = 'fr'): string {
  const labels: Record<string, Record<string, string>> = {
    PENDING: { fr: 'En attente', en: 'Pending' },
    CONFIRMED: { fr: 'Confirmé', en: 'Confirmed' },
    PREPARING: { fr: 'En préparation', en: 'Preparing' },
    READY: { fr: 'Prêt', en: 'Ready' },
    PICKED_UP: { fr: 'Récupéré', en: 'Picked Up' },
    CANCELLED: { fr: 'Annulé', en: 'Cancelled' },
  };
  return labels[status]?.[locale] || status;
}

export function getCategoryLabel(category: string, locale: string = 'fr'): string {
  const labels: Record<string, Record<string, string>> = {
    APPETIZER: { fr: 'Entrée', en: 'Appetizer' },
    MAIN_COURSE: { fr: 'Plat principal', en: 'Main Course' },
    DESSERT: { fr: 'Dessert', en: 'Dessert' },
    BEVERAGE: { fr: 'Boisson', en: 'Beverage' },
    SNACK: { fr: 'En-cas', en: 'Snack' },
  };
  return labels[category]?.[locale] || category;
}
