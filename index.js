const core = require('@actions/core');
const { resolve } = require('path');
const fs = require('fs');
const semver = require('semver');

try {
  const version = core.getInput('version');
  const validate = core.getBooleanInput('validate');
  if (validate && semver.valid(version) === null) {
    throw new Error("Invalid SemVer version");
  }
  if (!version) {
    throw new Error('No version input defined');
  }
  const inputPath = core.getInput('path');
  const packageJsonPath = resolve(inputPath, './package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
  const oldVersion = packageJson.version;
  packageJson.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
  console.log(`Replaced old package.json version (${oldVersion}) with ${version}.`);
} catch (error) {
  console.error(error);
  core.setFailed(error.message);
}
