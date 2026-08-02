# HomePlate 🍽️

> Des plats faits maison, livrés chez vous / Homemade dishes, delivered to you.

HomePlate is a marketplace connecting home cooks with people craving authentic, homemade meals. Think of it as Uber Eats, but for individual home chefs! 

## 📸 Screenshots

*(Add screenshots here)*
- Landing Page
- Login Page
- Role Selection
- Cook Dashboard

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (Premium Dark Theme, Glassmorphism)
- **Database**: PostgreSQL (via Prisma ORM)
- **Auth**: NextAuth.js (planned)

## 📦 Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running
- Git

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/homeplate.git
   cd homeplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/homeplate"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication routes (login, register)
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── page.module.css  # Landing page styles
├── components/          # Reusable UI components
├── lib/                 # Utility functions and Prisma client
└── types/               # TypeScript definitions
```

## ✨ Features

**For Clients (Eaters):**
- 📍 Location-based cook discovery
- 🍔 Browse menus by cuisine type
- 🛒 Order placement and pickup scheduling
- ⭐ Rate and review cooks

**For Cooks:**
- 🧑‍🍳 Profile creation and management
- 📋 Menu and dish management
- 💰 Order tracking and fulfillment
- 🕒 Flexible scheduling

## 🗄️ Database Schema Overview (Planned)

- `User`: Handles both cooks and clients
- `Dish`: Menu items created by cooks
- `Order`: Tracks purchases
- `Review`: Feedback system

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 🛣️ Roadmap

- [x] Landing Page & Auth UI
- [ ] Database Schema & Prisma Setup
- [ ] Authentication (NextAuth)
- [ ] Cook & Client Dashboards
- [ ] Checkout System (Stripe)
- [ ] Real-time Notifications
- [ ] Mobile App (React Native)
- [ ] Delivery Support ("Coming Soon")

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
