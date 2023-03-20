const core = require('@actions/core');
const replaceVersion = require('./replaceVersion');

try {
  const version = core.getInput('version');
  if (!version) {
    throw new Error('No version input defined');
  }
  const validate = core.getBooleanInput('validate');
  const inputPath = core.getInput('path');
  
  const oldVersion = replaceVersion(inputPath, version, validate);
  console.log(`Replaced old package.json version (${oldVersion}) with ${version}.`);
} catch (error) {
  console.error(error);
  core.setFailed(error.message);
}
