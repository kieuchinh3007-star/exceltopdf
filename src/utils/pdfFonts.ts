import jsPDF from 'jspdf';

// Cache for loaded fonts
let fontLoaded = false;
let fontBase64Cache: string | null = null;

/**
 * Fetch Roboto font TTF and convert to base64
 * Using a CDN that provides TTF format
 */
async function fetchRobotoFont(): Promise<string> {
  if (fontBase64Cache) {
    return fontBase64Cache;
  }

  try {
    // Using a CDN that provides TTF format
    // Alternative: Use cdnjs or other CDN with TTF fonts
    const fontUrl = 'https://cdn.jsdelivr.net/npm/roboto-fontface@0.10.0/fonts/roboto/Roboto-Regular.ttf';
    
    const response = await fetch(fontUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.statusText}`);
    }
    
    const fontBlob = await response.blob();
    
    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Remove the data URL prefix
        const base64Font = base64.split(',')[1];
        fontBase64Cache = base64Font;
        resolve(base64Font);
      };
      reader.onerror = reject;
      reader.readAsDataURL(fontBlob);
    });
  } catch (error) {
    console.error('Error loading font:', error);
    throw error;
  }
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

