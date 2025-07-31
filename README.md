# Luis Amador Portfolio

A modern portfolio website built with Next.js 15 and React 19, showcasing web development services and projects.

## 🚀 Latest Updates

This project has been updated to use the latest versions of React and Next.js:

- **Next.js**: 15.3.4 (latest stable)
- **React**: 19.1.0 (latest stable)
- **React DOM**: 19.1.0 (latest stable)
- **TypeScript**: 5.8.2

## ✨ New Features & Improvements

### React 19 Features

- **Enhanced Performance**: Improved rendering performance with better batching
- **New Hooks**: Support for the latest React hooks and patterns
- **Better TypeScript Support**: Improved type inference and error handling
- **Optimized Components**: Memoized components for better performance

### Next.js 15 Features

- **App Router**: Full support for the latest App Router features
- **Turbopack**: Faster development builds with Turbopack
- **Image Optimization**: Enhanced image formats (WebP, AVIF)
- **View Transitions**: Experimental view transitions for better UX
- **Package Optimization**: Automatic optimization of package imports

### Performance Optimizations

- **Component Memoization**: Strategic use of `React.memo` for performance
- **Code Splitting**: Automatic code splitting for better loading times
- **Image Optimization**: Next.js Image component with modern formats
- **Font Optimization**: Google Fonts with display swap for better performance

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS
- **TypeScript**: 5.8.2
- **Authentication**: Better Auth
- **Database**: PostgreSQL
- **Email**: Nodemailer
- **CMS**: Wix (for content management)

## 📦 Installation

```bash
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
DATABASE_URL=your_database_url

# Authentication
AUTH_SECRET=your_auth_secret

# Email
EMAIL_SERVER_HOST=your_email_host
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email_user
EMAIL_SERVER_PASS=your_email_password

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Wix
WIX_CLIENT_ID=your_wix_client_id
WIX_CLIENT_SECRET=your_wix_client_secret
```

## 🏗️ Project Structure

```
mrluisamador/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── ...                # Other pages
├── components/            # React components
│   ├── base/             # Base components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── lib/                  # Utility functions
├── styles/               # Global styles
└── public/               # Static assets
```

## 🎨 Styling

This project uses Tailwind CSS for styling with custom CSS variables for fonts and colors. The design system includes:

- **Typography**: Alice and Playfair Display fonts
- **Colors**: Custom color palette with theme support
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth transitions and hover effects

## 🔒 Security

- **Content Security Policy**: Strict CSP headers
- **Authentication**: Secure authentication with Better Auth
- **Input Validation**: Zod schemas for form validation
- **HTTPS**: Secure connections in production

## 📱 Performance

- **Core Web Vitals**: Optimized for all metrics
- **Lighthouse Score**: 90+ across all categories
- **Bundle Size**: Optimized with tree shaking
- **Caching**: Strategic caching for better performance

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up environment variables
3. Deploy automatically on push to main branch

## 📝 Notes

### Peer Dependency Warnings

Some packages (particularly Wix-related) show peer dependency warnings for React 19. These are expected and don't affect functionality:

- `@wix/ricos` and related packages
- `ricos-viewer`
- `draft-js-plugins-editor`

These packages will be updated to support React 19 in future releases.

### Development

- Use `pnpm dev --turbopack` for faster development builds
- Enable view transitions in development for testing
- Monitor bundle size with `pnpm build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ by Luis Amador
