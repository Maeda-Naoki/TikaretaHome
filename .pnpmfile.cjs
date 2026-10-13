module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === '@astrojs/check' && pkg.version === '0.9.10') {
        // TypeScript 7 lacks the JS Language Service API used by Astro's checker.
        // Give this tool its own compiler instead of using the project's TS 7 peer.
        delete pkg.peerDependencies.typescript;
        pkg.dependencies = { ...pkg.dependencies, typescript: '6.0.3' };
      }
      return pkg;
    },
  },
};
