module.exports = {
  dependency: {
    platforms: {
      ios: {},
      android: {
        sourceDir: 'android',
        packageImportPath: 'import com.ds.nativemodule.DSNativePackage;',
        packageInstance: 'new DSNativePackage()',
      },
    },
  },
};
