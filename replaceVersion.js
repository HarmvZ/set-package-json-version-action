const { resolve } = require('path');
const fs = require('fs');
const semver = require('semver');

const replaceVersion = function (inputPath, version, validate) {
  if (validate && semver.valid(version) === null) {
    throw new Error("Invalid SemVer version");
  }
  const packageJsonPath = resolve(inputPath, 'package.json');
  fs.accessSync(packageJsonPath);
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
  const oldVersion = packageJson.version;
  packageJson.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
  return oldVersion;
}
module.exports = replaceVersion;