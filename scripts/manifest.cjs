const fs = require('node:fs')
const path = require('path')

const packageJsonContent = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString())

const manifestPath = path.join(__dirname, '..', 'src', 'manifest.json')
const manifestDistPath = path.join(__dirname, '..', 'dist', 'manifest.json')

let manifestContent = fs.readFileSync(manifestPath).toString();
manifestContent = manifestContent.replaceAll('{{ version }}', packageJsonContent.version);
manifestContent = manifestContent.replaceAll('{{ description }}', packageJsonContent.description);

fs.writeFileSync(manifestDistPath, manifestContent)