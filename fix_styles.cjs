const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('C:\\Users\\Timothy\\Documents\\Tim\\JEN-Website-Frontend-main 2\\src\\Portal');

files.filter(f => f.endsWith('.jsx')).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace inline white colors with CSS variable
  content = content.replace(/color:\s*['"]white['"]/g, "color: 'var(--text-color)'");
  content = content.replace(/color:\s*['"]#ffffff['"]/gi, "color: 'var(--text-color)'");
  content = content.replace(/color:\s*['"]#fff['"]/gi, "color: 'var(--text-color)'");
  
  // Fix borders
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.0[1-9]\)/g, "var(--border-color)");
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
