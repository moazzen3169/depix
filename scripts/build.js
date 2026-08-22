const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

function runBuild() {
  const rootDir = path.resolve(__dirname, '..');
  const pkgPath = path.join(rootDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const version = pkg.version || '1.0.0';

  console.log(`Starting build process for version ${version}...`);

  const publicDir = path.join(rootDir, 'public');
  const cssSourcePath = path.join(publicDir, 'output.css');
  const jsSourcePath = path.join(publicDir, 'js', 'main.js');

  if (!fs.existsSync(cssSourcePath)) {
    console.error('Error: public/output.css does not exist. Please run Tailwind CLI build first.');
    process.exit(1);
  }
  if (!fs.existsSync(jsSourcePath)) {
    console.error('Error: public/js/main.js does not exist.');
    process.exit(1);
  }

  // Calculate hashes
  const cssHash = getFileHash(cssSourcePath);
  const jsHash = getFileHash(jsSourcePath);

  const hashedCssFilename = `output.${cssHash}.css`;
  const hashedJsFilename = `main.${jsHash}.js`;

  const cssHashedPath = path.join(publicDir, hashedCssFilename);
  const jsHashedPath = path.join(publicDir, 'js', hashedJsFilename);

  // Copy files to hashed filenames (preserving originals for rollback/reference)
  fs.copyFileSync(cssSourcePath, cssHashedPath);
  fs.copyFileSync(jsSourcePath, jsHashedPath);

  console.log(`- CSS Hashed: ${hashedCssFilename} (hash: ${cssHash})`);
  console.log(`- JS Hashed:  ${hashedJsFilename} (hash: ${jsHash})`);

  // Write build manifest
  const manifestPath = path.join(publicDir, 'build-manifest.json');
  const manifestData = {
    version: version,
    builtAt: new Date().toISOString(),
    assets: {
      'output.css': hashedCssFilename,
      'js/main.js': `js/${hashedJsFilename}`
    }
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');
  console.log(`- Build manifest created at public/build-manifest.json`);

  // Find and update HTML files
  const filesInPublic = fs.readdirSync(publicDir);
  const htmlFiles = filesInPublic.filter(file => file.endsWith('.html'));

  const cssRegex = /(href=["'])(\.\/|\/)?output(\.[a-f0-9]{8})?\.css(["'])/g;
  const jsRegex = /(src=["'])(\.\/|\/)?js\/main(\.[a-f0-9]{8})?\.js(["'])/g;

  let updatedCount = 0;

  for (const htmlFile of htmlFiles) {
    const htmlPath = path.join(publicDir, htmlFile);
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    const newContent = htmlContent
      .replace(cssRegex, `$1$2${hashedCssFilename}$4`)
      .replace(jsRegex, `$1$2js/${hashedJsFilename}$4`);

    if (newContent !== htmlContent) {
      fs.writeFileSync(htmlPath, newContent, 'utf8');
      console.log(`  Updated ${htmlFile}`);
      updatedCount++;
    } else {
      console.log(`  No changes needed for ${htmlFile}`);
    }
  }

  console.log(`Successfully updated ${updatedCount} HTML file(s) for Version ${version}.`);
}

runBuild();
