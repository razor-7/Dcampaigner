// Using placeholder images until we have actual assets
export const images = {
  hero: {
    dashboard: 'https://placehold.co/1200x800/2D3436/FFFFFF?text=',
    overlay: 'https://placehold.co/1200x800/00B894/FFFFFF?text=',
  },
  platforms: {
    facebook: 'https://img.icons8.com/fluency/96/facebook-new.png',
    instagram: 'https://img.icons8.com/fluency/96/instagram-new.png',
    youtube: 'https://img.icons8.com/color/96/youtube-play.png',
    google: 'https://img.icons8.com/color/96/google-ads.png',
    email: 'https://img.icons8.com/fluency/96/mail.png',
    sms: 'https://img.icons8.com/fluency/96/messages-mac.png',
  },
  features: {
    analytics: 'https://placehold.co/600x400/00B894/FFFFFF?text=Analytics',
    automation: 'https://placehold.co/600x400/00B894/FFFFFF?text=Automation',
    integration: 'https://placehold.co/600x400/00B894/FFFFFF?text=Integration',
  },
  testimonials: {
    person1: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
    person2: 'https://api.uifaces.co/our-content/donated/FJkauyEa.jpg',
    person3: 'https://api.uifaces.co/our-content/donated/1H6DoyEP.jpg',
  },
} as const;

export type ImageAssets = typeof images; 