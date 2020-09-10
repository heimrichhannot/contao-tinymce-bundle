# Contao TinyMCE Bundle

This bundle offers support for the JavaScript library [tinyMCE](https://www.tiny.cloud) for the **frontend** of the Contao CMS.

## Features

- activate tinymce support on page level (with inheritance and override option)
- customize options from dca or dynamically from event
- [heimrichhannot/contao-encore-bundle](https://github.com/heimrichhannot/contao-encore-bundle) support

## Installation

Install via composer: `composer require heimrichhannot/contao-tinymce-bundle`.

If you don't use [heimrichhannot/contao-encore-bundle](https://github.com/heimrichhannot/contao-encore-bundle), you can proceed to the configuration chapter.

### Using heimrichhannot/contao-encore-bundle

Add the following javascript to your project's `webpack.config.js` (this is needed to have the skins and languages in your web/build folder):

```ecmascript 6
let CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path');

Encore.addPlugin(new CopyWebpackPlugin({
    patterns: [
        {
            from: path.join(__dirname, '/node_modules/tinymce/skins'),
            to: 'skins' // can't be in a tinymce sub folder because of the library not supporting it :-(
        },
        {
            from: path.join(__dirname, '/node_modules/tinymce-i18n/langs5'),
            to: 'tinymce/languages'
        }
    ]
}));
```

## Configuration

### Using the DCA

Add the following to you DCA field:

```
// ...
'message' => [
    'label'     => &$GLOBALS['TL_LANG']['tl_submission']['message'],
    'exclude'   => true,
    'inputType' => 'textarea',
    'eval'      => ['tl_class' => 'long clr', 'rte' => 'tinyMCE',
                    'tinyMceOptions' => System::getContainer()->get(\HeimrichHannot\TinyMceBundle\Manager\TinyMceManager::class)->getOptionPreset('limited')],
    'sql'       => "text NULL",
]
```

## Events

Name | Arguments
---- | ---------
`AddOptionPresetEvent` | `string $presets`
`CustomizeTinyMceOptionsEvent` | `array $options, array $fieldAttributes, $dc`
