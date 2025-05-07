const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Generate SVG placeholder image
const generateSvgPlaceholder = (width, height, text, bgColor = '004b8d', textColor = 'ffffff') => {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${bgColor}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        fill="#${textColor}" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `;
};

// Save SVG to file
const saveSvgToFile = (filePath, svg) => {
  fs.writeFileSync(filePath, svg);
  console.log(`Created placeholder image: ${filePath}`);
};

// Main function
const generatePlaceholderImages = () => {
  // Create directories
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');
  const heroDir = path.join(imagesDir, 'hero');
  const productsDir = path.join(imagesDir, 'products');
  const testimonialsDir = path.join(imagesDir, 'testimonials');
  const serviceAreasDir = path.join(imagesDir, 'service-areas');
  
  createDirectoryIfNotExists(publicDir);
  createDirectoryIfNotExists(imagesDir);
  createDirectoryIfNotExists(heroDir);
  createDirectoryIfNotExists(productsDir);
  createDirectoryIfNotExists(testimonialsDir);
  createDirectoryIfNotExists(serviceAreasDir);
  
  // Generate hero banner placeholders
  for (let i = 1; i <= 3; i++) {
    const heroSvg = generateSvgPlaceholder(1920, 600, `Hero Banner ${i}`, '004b8d', 'ffffff');
    saveSvgToFile(path.join(heroDir, `placeholder-hero-${i}.svg`), heroSvg);
  }
  
  // Generate product placeholders
  const products = [
    { name: 'windows', color: '004b8d' },
    { name: 'doors', color: '0077c8' },
    { name: 'siding', color: 'e31837' }
  ];
  
  products.forEach(product => {
    const productSvg = generateSvgPlaceholder(800, 600, `${product.name.charAt(0).toUpperCase() + product.name.slice(1)}`, product.color, 'ffffff');
    saveSvgToFile(path.join(productsDir, `placeholder-${product.name}.svg`), productSvg);
  });
  
  // Generate testimonial placeholders
  for (let i = 1; i <= 3; i++) {
    const testimonialSvg = generateSvgPlaceholder(400, 400, `Testimonial ${i}`, '333333', 'ffffff');
    saveSvgToFile(path.join(testimonialsDir, `placeholder-testimonial-${i}.svg`), testimonialSvg);
  }
  
  // Generate service area placeholders
  for (let i = 1; i <= 4; i++) {
    const serviceAreaSvg = generateSvgPlaceholder(600, 400, `Service Area ${i}`, '0077c8', 'ffffff');
    saveSvgToFile(path.join(serviceAreasDir, `placeholder-service-area-${i}.svg`), serviceAreaSvg);
  }
  
  console.log('All placeholder images generated successfully!');
};

// Run the function
generatePlaceholderImages();
