# 🛒 Modern Ecommerce App

A full-featured ecommerce web application built with React and powered by Appwrite backend services. This modern, responsive application provides a complete online shopping experience with user authentication, product management, shopping cart, wishlist functionality, and admin capabilities.

## ✨ Features

### 🛍️ Customer Features
- **User Authentication** - Register, login, password reset, and email verification
- **Product Browsing** - Browse products by categories with detailed product pages
- **Shopping Cart** - Add/remove items, quantity management, and checkout process
- **Wishlist** - Save favorite products for later
- **Responsive Design** - Optimized for desktop and mobile devices
- **Smooth Animations** - Enhanced UX with GSAP and Lottie animations

### 👨‍💼 Admin Features
- **Product Management** - Create, update, and manage product inventory
- **Admin Dashboard** - Comprehensive admin panel for store management

### 🎨 UI/UX Features
- **Modern Design** - Clean, professional interface with Tailwind CSS
- **Interactive Elements** - Smooth transitions and micro-interactions
- **Loading States** - Beautiful loading animations with Lottie files
- **Form Validation** - Robust form handling with React Hook Form
- **Toast Notifications** - User feedback with React Toastify

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend & Services
- **Appwrite** - Backend-as-a-Service for authentication, database, and storage
- **Appwrite Database** - NoSQL database for product and user data
- **Appwrite Storage** - File storage for product images
- **Appwrite Auth** - User authentication and authorization

### Additional Libraries
- **GSAP** - High-performance animations
- **Lottie** - Lightweight animations
- **Swiper** - Modern touch slider
- **React Hook Form** - Performant form library
- **Axios** - HTTP client for API requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Appwrite account** and project setup

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your Appwrite configuration:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
```

### 4. Appwrite Setup
1. Create an Appwrite project at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Set up the following collections in your database:
   - Products collection
   - Users collection
   - Orders collection (if applicable)
3. Configure authentication methods (email/password)
4. Set up storage buckets for product images

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Nav.jsx         # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── CategoryPage.jsx # Category display
│   └── ...
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── Login.jsx       # Authentication pages
│   ├── Cart.jsx        # Shopping cart
│   ├── ProductDetails.jsx
│   ├── admin/          # Admin pages
│   └── ...
├── routes/             # Routing configuration
├── lib/                # Utility libraries
│   └── appwrite.js     # Appwrite configuration
└── App.jsx             # Main app component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

The build files will be generated in the `dist/` directory.

### Deploy to Vercel (Recommended)
This project includes a `vercel.json` configuration file for easy deployment to Vercel:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the deployment prompts

### Other Deployment Options
- **Netlify** - Drag and drop the `dist/` folder
- **GitHub Pages** - Use GitHub Actions
- **AWS S3** - Upload build files to S3 bucket

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_APPWRITE_ENDPOINT` | Appwrite API endpoint | ✅ |
| `VITE_APPWRITE_PROJECT_ID` | Your Appwrite project ID | ✅ |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues & Support

If you encounter any issues or need support, please:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include steps to reproduce the problem

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Appwrite](https://appwrite.io/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---

**Made with ❤️ using React and Appwrite**
