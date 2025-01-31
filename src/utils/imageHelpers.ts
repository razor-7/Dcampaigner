// Add type declarations
type ColorCode = string;
type ImageDimension = number;

interface PlatformIcons {
  Facebook: string;
  Instagram: string;
  YouTube: string;
  'Google Ads': string;
  Email: string;
  SMS: string;
}

export const getPlaceholderImage = (
  width: ImageDimension, 
  height: ImageDimension, 
  text: string, 
  bgColor: ColorCode = '1976D2', 
  textColor: ColorCode = 'FFFFFF'
): string => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

export const getPlatformIcon = (platform: string): string => {
  const icons: PlatformIcons = {
    Facebook: 'https://placehold.co/32x32/2D88FF/FFFFFF?text=FB',
    Instagram: 'https://placehold.co/32x32/E4405F/FFFFFF?text=IG',
    YouTube: 'https://placehold.co/32x32/FF0000/FFFFFF?text=YT',
    'Google Ads': 'https://placehold.co/32x32/4285F4/FFFFFF?text=GA',
    Email: 'https://placehold.co/32x32/34A853/FFFFFF?text=EM',
    SMS: 'https://placehold.co/32x32/9B59B6/FFFFFF?text=SMS'
  };

  return icons[platform as keyof PlatformIcons] || getPlaceholderImage(32, 32, 'P');
};

// Make it a proper module
export type { PlatformIcons, ColorCode, ImageDimension }; 