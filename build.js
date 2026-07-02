const fs = require('fs');
const path = require('path');

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

console.log('Building site with Supabase configuration...');
console.log('SUPABASE_URL:', supabaseUrl === 'YOUR_SUPABASE_URL' ? 'Not configured' : 'Configured');

// Files to process
const files = [
  'eric-uzoukwu-FINAL.html',
  'dashboard.html'
];

files.forEach(filename => {
  const filePath = path.join(__dirname, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${filename} - not found`);
    return;
  }
  
  console.log(`Processing ${filename}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace Supabase placeholders
  content = content.replace(/var SUPABASE_URL\s*=\s*['"]YOUR_SUPABASE_URL['"]/g, `var SUPABASE_URL = '${supabaseUrl}'`);
  content = content.replace(/var SUPABASE_KEY\s*=\s*['"]YOUR_SUPABASE_ANON_KEY['"]/g, `var SUPABASE_KEY = '${supabaseKey}'`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated ${filename}`);
});

console.log('Build complete!');
