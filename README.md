# Luis Amador Portfolio

A modern, professional portfolio website built with Next.js 15 and React 19, showcasing web development services, projects, and blog content. This portfolio is fully powered by PayloadCMS 3.0 and PostgreSQL (Neon).

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15 and React 19 for optimal performance
- **Portfolio Showcase**: Dynamic project gallery powered by PayloadCMS
- **Blog System**: Content management through PayloadCMS with Lexical rich text editing
- **Contact Form**: Secure contact form with reCAPTCHA protection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Built-in SEO features and performance optimization
- **Authentication**: User management with Better Auth and Payload Admin
- **Email Integration**: Contact form processing with Nodemailer

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.3.4 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: 5.8.2 for type safety
- **Icons**: Lucide React for modern iconography

### Backend & Services

- **Authentication**: Better Auth and Payload Auth
- **Database**: PostgreSQL with Neon integration
- **CMS**: PayloadCMS 3.0 for content management and project showcase
- **Email**: Nodemailer for contact form processing
- **Validation**: Zod schemas for form validation
- **Security**: Google reCAPTCHA integration

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mrluisamador

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
NEON_DB_CONNECTION_STRING=your_main_db_connection
NEON_PAYLOAD_DATABASE_URI=your_payload_db_connection

# Payload
PAYLOAD_SECRET=your_payload_secret

# Authentication
AUTH_SECRET=your_auth_secret_key

# Email Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
EMAIL_USER=your_email_username
EMAIL_PASSWORD=your_email_password
SMTP_FROM=your_from_email

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

**Note**: Never commit your `.env.local` file to version control. The `.gitignore` file is configured to exclude environment files.

## 🏗️ Project Structure

```
mrluisamador/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Frontend routes
│   ├── (payload)/         # PayloadCMS admin and API
│   └── api/               # Custom API routes
├── collections/           # PayloadCMS Collection configurations
├── components/            # React components
│   ├── base/             # Core components (nav, footer)
│   ├── blog/             # Blog-specific components
│   ├── projects/         # Project-specific components
│   ├── ui/               # Reusable UI components
│   ├── email/            # Email form components
│   └── better-auth/      # Authentication components
├── lib/                  # Utility functions and configurations
├── styles/               # Global styles and Tailwind config
├── public/               # Static assets and images
└── better-auth_migrations/ # Database migrations
```

## 🎨 Design System

This project features a comprehensive design system built with Tailwind CSS:

- **Typography**: Custom font combinations for optimal readability
- **Color Palette**: Carefully selected colors for brand consistency
- **Component Library**: Reusable UI components with consistent styling
- **Responsive Grid**: Mobile-first responsive design system
- **Animations**: Smooth transitions and hover effects

## 🔒 Security Features

- **Content Security Policy**: Strict CSP headers for XSS protection
- **Authentication**: Secure user authentication with Better Auth
- **Input Validation**: Comprehensive form validation with Zod
- **reCAPTCHA**: Bot protection for contact forms
- **HTTPS**: Secure connections in production
- **Environment Variables**: Secure configuration management

## 📱 Performance Optimization

- **Core Web Vitals**: Optimized for all performance metrics
- **Image Optimization**: Next.js Image component with modern formats
- **Code Splitting**: Automatic code splitting for optimal loading
- **Bundle Optimization**: Tree shaking and dependency optimization
- **Caching Strategy**: Strategic caching for better performance
- **Turbopack**: Faster development builds

## 📝 Development Notes

### Development Commands

```bash
# Development with Turbopack (faster builds)
pnpm dev

# Lint code
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check

# Build for production
pnpm build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Built with ❤️ by Luis Amador**
