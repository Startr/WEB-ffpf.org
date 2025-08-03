const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadLinksData() {
  const linksData = {
    en: [],
    fr: []
  };

  // Load English links
  const enLinksDir = path.join(__dirname, 'links', 'en');
  if (fs.existsSync(enLinksDir)) {
    const enFiles = fs.readdirSync(enLinksDir).filter(file => file.endsWith('.yml'));
    enFiles.forEach(file => {
      const filePath = path.join(enLinksDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = yaml.load(content);
      linksData.en.push(data);
    });
  }

  // Load French links
  const frLinksDir = path.join(__dirname, 'links', 'fr');
  if (fs.existsSync(frLinksDir)) {
    const frFiles = fs.readdirSync(frLinksDir).filter(file => file.endsWith('.yml'));
    frFiles.forEach(file => {
      const filePath = path.join(frLinksDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = yaml.load(content);
      linksData.fr.push(data);
    });
  }

  // Sort sections by order
  linksData.en.sort((a, b) => (a.order || 0) - (b.order || 0));
  linksData.fr.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Sort links within each section by order
  linksData.en.forEach(section => {
    if (section.links) {
      section.links.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  });
  
  linksData.fr.forEach(section => {
    if (section.links) {
      section.links.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  });

  return linksData;
}

module.exports = function() {
  return loadLinksData();
};
