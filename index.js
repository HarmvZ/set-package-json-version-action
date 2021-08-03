const core = require('@actions/core');
const { resolve } = require('path');
const fs = require('fs');

try {
  const version = core.getInput('version');
  const inputPath = core.getInput('path');
  const packageJsonPath = resolve(inputPath, './package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
  const oldVersion = packageJson.version;
  packageJson.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Replaced old package.json version (${packageJson.version}) with ${version}.`);
} catch (error) {
  console.error(error);
  core.setFailed(error.message);
}