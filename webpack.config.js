var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('src/Resources/public/js/')
    .addEntry('contao-tinymce-bundle', './src/Resources/assets/js/contao-tinymce-bundle-init.js')
    .setPublicPath('/bundles/heimrichhannottinymce/js/')
    .setManifestKeyPrefix('bundles/heimrichhannottinymce/js')
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();
