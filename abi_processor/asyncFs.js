const util = require('util');
const fs = require('fs');

module.exports.readFile = async (path) => {
  const readFile = util.promisify(fs.readFile);

  return await readFile(path, 'utf8');
};

module.exports.writeFile = async (name, content) => {
  const writeFile = util.promisify(fs.writeFile);

  return await writeFile(name, content);
};

module.exports.existsSync = async (dir) => {
  let ret;
  try {
    ret = await fs.existsSync(dir);
  } catch(error) {
    console.log(error);
  }

  return ret;
};

module.exports.mkdirSync = async (dir) => {
  const mkdirSync = util.promisify(fs.mkdirSync);

  return await mkdirSync(dir);
};

module.exports.readdir = async (dir) => {
  const readdir = util.promisify(fs.readdir);

  return await readdir(dir);
};
