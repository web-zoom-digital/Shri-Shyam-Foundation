import fs from 'fs';
import path from 'path';

const searchPaths = [
  './src',
  './package.json'
];

const extensions = ['.ts', '.tsx', '.json', '.md'];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Replacements
  // Name
  content = content.replace(/Nabin Chandra Foundation/gi, 'Shri Shyam Foundation');
  content = content.replace(/Nabin Chandra/gi, 'Shri Shyam');
  content = content.replace(/NCF/g, 'SSF'); // Be careful with NCF case-sensitive
  
  // Email
  content = content.replace(/hello@nabinchandrafoundation\.org/gi, 'shrishyamfoundation1@gmail.com');
  content = content.replace(/nabinchandrafoundation/gi, 'shrishyamfoundation');
  content = content.replace(/nabinchandra-foundation/gi, 'shrishyamfoundation');
  
  // Phone
  content = content.replace(/\+91-93158-14894/g, '+91 9990145555');
  content = content.replace(/\+91 93158 14894/g, '+91 9990145555');
  content = content.replace(/919315814894/g, '919990145555');
  content = content.replace(/9315814894/g, '9990145555');
  
  // Address lines (specific replacements)
  content = content.replace(/House Number - 242, Govindgarh/g, 'House Number - J88 Gali No. 9/4 Pusta');
  content = content.replace(/Gautam Buddha Nagar, Jewar/g, 'Delhi');
  content = content.replace(/Gautam Buddha Nagar/g, 'Delhi');
  content = content.replace(/Jewar/g, 'Delhi');
  content = content.replace(/Uttar Pradesh 203135/g, 'Delhi, 110053');
  content = content.replace(/Uttar Pradesh/g, 'Delhi');
  content = content.replace(/203135/g, '110053');
  
  // specific orgEntity formatted address
  content = content.replace(/House Number - J88 Gali No. 9\/4 Pusta, Delhi, Delhi, Delhi 110053, India/g, 'House Number - J88 Gali No. 9/4 Pusta, Delhi, 110053, India');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      if (extensions.includes(path.extname(fullPath)) || fullPath.endsWith('package.json')) {
        replaceInFile(fullPath);
      }
    }
  }
}

for (const p of searchPaths) {
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      processDirectory(p);
    } else {
      replaceInFile(p);
    }
  }
}
