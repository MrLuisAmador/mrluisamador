# Luis Amador Portfolio

A modern, professional portfolio website built with Next.js 15 and React 19, showcasing web development services, projects, and blog content. This portfolio demonstrates expertise in both modern web development and Wix platform solutions.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15 and React 19 for optimal performance
- **Portfolio Showcase**: Dynamic project gallery powered by Wix CMS
- **Blog System**: Content management through Wix with rich text editing
- **Contact Form**: Secure contact form with reCAPTCHA protection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Built-in SEO features and performance optimization
- **Authentication**: User management with Better Auth
- **Email Integration**: Contact form processing with Nodemailer

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.3.4 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: 5.8.2 for type safety
- **Icons**: Lucide React for modern iconography

### Backend & Services

- **Authentication**: Better Auth for secure user management
- **Database**: PostgreSQL with Neon integration
- **CMS**: Wix for content management and project showcase
- **Email**: Nodemailer for contact form processing
- **Validation**: Zod schemas for form validation
- **Security**: Google reCAPTCHA integration

### Development Tools

- **Package Manager**: pnpm for fast, efficient dependency management
- **Linting**: ESLint with Next.js and Prettier configurations
- **Build Tool**: Turbopack for faster development builds
- **Styling**: PostCSS with Tailwind CSS and SASS support

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
DATABASE_URL=your_database_connection_string

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

# Wix Integration
NEXT_PUBLIC_WIX_CLIENT_ID=your_wix_client_id
WIX_CLIENT_SECRET=your_wix_client_secret
```

**Note**: Never commit your `.env.local` file to version control. The `.gitignore` file is configured to exclude environment files.

## 🏗️ Project Structure

```
mrluisamador/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage with service overview
│   ├── about/             # About page with skills showcase
│   ├── services/          # Detailed services page
│   ├── projects/          # Project portfolio (Wix-powered)
│   ├── blogs/             # Blog system with dynamic routing
│   ├── contact/           # Contact form page
│   └── api/               # API routes for authentication
├── components/            # React components
│   ├── base/             # Core components (nav, footer, services)
│   ├── ui/               # Reusable UI components
│   ├── wix/              # Wix-specific components
│   ├── email/            # Email form components
│   └── better-auth/      # Authentication components
├── lib/                  # Utility functions and configurations
│   ├── auth/             # Authentication utilities
│   ├── wix/              # Wix client and utilities
│   ├── nodemailer/       # Email configuration
│   └── zod/              # Form validation schemas
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

### Peer Dependency Warnings

Some Wix-related packages show peer dependency warnings for React 19. These are expected and don't affect functionality:

- `@wix/ricos` and related packages
- `ricos-viewer`
- `draft-js-plugins-editor`

These packages will be updated to support React 19 in future releases.

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

_Web Developer & Wix Specialist_
