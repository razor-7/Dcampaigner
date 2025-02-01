# DCampaigner - Digital Marketing Campaign Manager

DCampaigner is a comprehensive digital marketing campaign management platform that helps businesses manage and track their marketing campaigns across multiple platforms.

![Landing Page](./screenshots/landing.png)

## Features

### Core Features
- **Multi-Platform Integration**: Manage campaigns across Facebook, Instagram, YouTube, Google Ads, Email, and SMS
- **Role-Based Access Control**: 
  - Admin: Full access to all features and clients
  - Client: Limited access to own campaigns and analytics

![Dashboard](./screenshots/dashboard.png)

### Campaign Management
- Create and manage campaigns
- Track campaign performance
- Filter and sort campaigns
- Real-time analytics

![Campaign Management](./screenshots/campaigns.png)

### Analytics & Reporting
- Performance metrics
- Campaign insights
- ROI tracking
- Custom reports

![Analytics](./screenshots/analytics.png)

### Role-Based Views

#### Admin Dashboard
Full access to all features including client management
![Admin View](./screenshots/admin-view.png)

#### Client Dashboard
Restricted access to own campaigns and analytics
![Client View](./screenshots/client-view.png)

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Dashboard**: Easy-to-use interface for both admin and client users
- **Dark/Light Mode**: Support for different themes
- **Interactive Charts**: Visual representation of campaign data

![Mobile View](./screenshots/mobile-view.png)
![Dark Mode](./screenshots/dark-mode.png)

## Project Structure 
dcampaigner/
├── public/
│ ├── index.html
│ └── assets/
├── src/
│ ├── assets/ # Images, icons, and other static assets
│ ├── components/ # Reusable React components
│ │ ├── Layout/
│ │ └── platforms/ # Platform-specific components
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page components
│ ├── services/ # API services
│ ├── store/ # Redux store configuration
│ │ └── slices/ # Redux slices
│ ├── types/ # TypeScript type definitions
│ └── utils/ # Utility functions
└── package.json
## Technology Stack

- **Frontend**: React.js with TypeScript
- **State Management**: Redux Toolkit
- **UI Framework**: Material-UI (MUI)
- **Authentication**: Google OAuth
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Type Checking**: TypeScript
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dcampaigner.git
cd dcampaigner
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

4. Start the development server:
```bash
npm start
```

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Deployment

### Deploying to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploying to Netlify

1. Create a `netlify.toml` file:
```toml
[build]
  command = "npm run build"
  publish = "build"
```

2. Deploy using Netlify CLI or connect your GitHub repository to Netlify.

## Development

### Code Style

- Follow the TypeScript style guide
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names
- Add comments for complex logic

### Testing

```bash
npm test
```

## FAQs

### General
1. **Q: How do I access the admin dashboard?**
   - A: Use the "Sign In as Admin" option in development mode.

2. **Q: How do I create a new campaign?**
   - A: Click the "New Campaign" button in the Campaigns section.

### Technical
1. **Q: How do I add a new platform integration?**
   - A: Create a new component in `src/components/platforms/` and update the platform constants.

2. **Q: How do I customize the theme?**
   - A: Modify the theme configuration in `src/theme.ts`.

### Troubleshooting
1. **Q: Why can't I see my campaigns?**
   - A: Check your user role and client ID settings.

2. **Q: How do I reset my filters?**
   - A: Use the "Clear Filters" button in the Campaigns view.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@dcampaigner.com or join our Slack channel. 