const replaceVersion = require('./replaceVersion');
const fs = require('fs');
const { resolve } = require('path');

const newVersion = '1.2.3';
const tempdir = fs.mkdtempSync('test');
const packageJson = { "version": "1.1.1" };
describe('replaceVersion', () => {
  test('Semver version validation', () => {
    expect(() => replaceVersion(tempdir, '1.02', true)).toThrow("Invalid SemVer version");
    expect(() => replaceVersion(tempdir, '1.02', false)).not.toThrow("Invalid SemVer version");
    expect(() => replaceVersion(tempdir, '1.2.3', true)).not.toThrow("Invalid SemVer version");
  });
  test('Non existant packag.json throws error', () => {
    expect(() => replaceVersion(tempdir, '1.2.3', true)).toThrow('ENOENT: no such file or directory');
  });
  ['.', 'testpath'].forEach(packageDir => {
    test(`Writes version into ${packageDir}/package.json`, () => {
      const inputPath = resolve(tempdir, packageDir);
      fs.mkdirSync(inputPath, { recursive: true });
      const path = resolve(inputPath, 'package.json');
      fs.writeFileSync(path, JSON.stringify(packageJson, null, 2) + "\n");
      const oldVersion = replaceVersion(inputPath, newVersion, true);
      expect(oldVersion).toBe(packageJson['version']);
      const newPackageJson = JSON.parse(fs.readFileSync(path));
      expect(newPackageJson["version"]).toBe(newVersion);
    });
  });
});