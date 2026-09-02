import https from 'https';

const url = 'https://shrishyamfoundation.org/';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Extract img src
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const bgRegex = /background-image:\s*url\((['"]?)([^'")]+)\1\)/g;
    
    let match;
    const images = new Set();
    
    while ((match = imgRegex.exec(data)) !== null) {
      images.add(match[1]);
    }
    
    while ((match = bgRegex.exec(data)) !== null) {
      images.add(match[2]);
    }
    
    const uniqueImages = Array.from(images).filter(img => img.match(/\.(jpeg|jpg|gif|png|webp|svg)/i));
    
    console.log("Found Images:");
    uniqueImages.forEach(img => {
      if(img.startsWith('http')) {
        console.log(img);
      } else if (img.startsWith('/')) {
        console.log(new URL(img, url).href);
      } else {
        console.log(new URL(img, url).href);
      }
    });
  });
}).on('error', err => {
  console.log("Error: " + err.message);
});
