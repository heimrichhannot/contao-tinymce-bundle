let Encore = require('@symfony/webpack-encore'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path');

Encore
    .setOutputPath('src/Resources/public/js/')
    .addEntry('contao-tinymce-bundle', './src/Resources/assets/js/contao-tinymce-bundle-init.js')
    .setPublicPath('/bundles/heimrichhannottinymce/js/')
    .setManifestKeyPrefix('bundles/heimrichhannottinymce/js')
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .addPlugin(new CopyWebpackPlugin({
        patterns: [
            {
                from: path.join(__dirname, '/node_modules/tinymce/skins'),
                to: 'skins' // can't be in a tinymce sub folder because of the library not supporting it :-(
            },
            {
                from: path.join(__dirname, '/node_modules/tinymce-i18n/langs5'),
                to: 'languages'
            }
        ]
    }))
    .configureDefinePlugin((env) => {
        env.NON_ENCORE = true;
    })
;

module.exports = Encore.getWebpackConfig();
