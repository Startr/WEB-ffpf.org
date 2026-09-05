const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const LANGS = ['en', 'fr', 'de', 'pt'];
const DIR = path.join(__dirname, 'links');

// Every *.yml in a directory, as [{ name, data }], sorted by filename.
function read(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).sort()
    .filter(file => file.endsWith('.yml'))
    .map(file => ({
      name: path.basename(file, '.yml'),
      data: yaml.load(fs.readFileSync(path.join(dir, file), 'utf8'))
    }));
}

// Drop the empty `{}` placeholders, then order sections and their links.
function ordered(sections) {
  const list = sections.filter(s => s && s.section && s.links)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  list.forEach(s => s.links.sort((a, b) => (a.order || 0) - (b.order || 0)));
  return list;
}

// links/<lang>/*.yml       -> sections shown on every year
// links/years/<lang>/*.yml -> one file per year, appended to the shared ones
module.exports = function () {
  const data = { years: {} };

  for (const lang of LANGS) {
    const shared = read(path.join(DIR, lang)).map(entry => entry.data);
    data[lang] = ordered([...shared]);

    for (const { name: year, data: yearSection } of read(path.join(DIR, 'years', lang))) {
      data.years[year] ??= {};
      data.years[year][lang] = ordered([...shared, yearSection]);
    }
  }

  return data;
};
