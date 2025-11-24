import jsPDF from 'jspdf';

// Cache for loaded fonts
let fontLoaded = false;
let fontBase64Cache: string | null = null;

/**
 * Fetch Roboto font TTF and convert to base64
 * Using multiple fallback CDNs
 */
async function fetchRobotoFont(): Promise<string> {
  if (fontBase64Cache) {
    return fontBase64Cache;
  }

  // Try multiple CDN sources
  const fontUrls = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-roboto/0.0.0/font/Roboto-Regular.ttf',
    'https://github.com/google/fonts/raw/main/apache/roboto/static/Roboto-Regular.ttf',
  ];

  for (const fontUrl of fontUrls) {
    try {
      console.log('Trying to fetch font from:', fontUrl);
      const response = await fetch(fontUrl);
      
      if (!response.ok) {
        console.warn(`Font fetch failed from ${fontUrl}:`, response.statusText);
        continue;
      }
      
      const fontBlob = await response.blob();
      
      // Convert blob to base64
      const base64Font = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          // Remove the data URL prefix
          const base64Font = base64.split(',')[1];
          resolve(base64Font);
        };
        reader.onerror = reject;
        reader.readAsDataURL(fontBlob);
      });
      
      fontBase64Cache = base64Font;
      return base64Font;
    } catch (error) {
      console.warn(`Error loading font from ${fontUrl}:`, error);
      continue;
    }
  }

  throw new Error('Failed to load font from all sources');
}

/**
 * Add Vietnamese-supported font to jsPDF document
 */
export async function addVietnameseFont(doc: jsPDF): Promise<void> {
  if (fontLoaded) {
    // Font already added, just set it
    doc.setFont('Roboto', 'normal');
    return;
  }

  try {
    const fontBase64 = await fetchRobotoFont();
    
    // Add font to jsPDF virtual file system
    doc.addFileToVFS('Roboto-Regular.ttf', fontBase64);
    
    // Register the font
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    
    // Set as default font
    doc.setFont('Roboto', 'normal');
    
    fontLoaded = true;
    console.log('Vietnamese font loaded successfully');
  } catch (error) {
    console.error('Failed to load Vietnamese font, using fallback:', error);
    // Fallback to default font
    doc.setFont('helvetica', 'normal');
    fontLoaded = false;
  }
}

/**
 * Get font configuration for autoTable
 */
export function getVietnameseFontConfig() {
  return {
    font: fontLoaded ? 'Roboto' : 'helvetica',
    fontStyle: 'normal' as const,
  };
}


