# Contao TinyMCE Bundle

This bundle offers support for the JavaScript library [tinyMCE](https://www.tiny.cloud) for the **frontend** of the Contao CMS.

## Features

- activate tinymce support on page level (with inheritance and override option)
- customize options from dca or dynamically from event
- [heimrichhannot/contao-encore-bundle](https://github.com/heimrichhannot/contao-encore-bundle) support
- define maximum input chars for tinymce editors

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

## Usage

Allow TinyMce in your page configuration and enable it in the field dca.

```php
class CustomDataContainer 
{
    private RequestStack $requestStack;
    private ScopeMatcher $scopeMatcher;

    public function onLoadCallback(DataContainer $dc = null): void
    {
        if ($this->requestStack->getCurrentRequest() && $this->scopeMatcher->isFrontendRequest($this->requestStack->getCurrentRequest())) {
            $GLOBALS['TL_DCA']['tl_custom']['fields']['text']['eval']['rte'] = 'tinyMCE';
        }
    }
}
```

Out of the box there is only one preset available: `limited`. You can add more presets through the `AddOptionPresetEvent` or customize the configuration by yourself in the dca. See configuration chaptar. 

## Configuration

### Using the DCA

You can set custom options in your dca or use presets:

```php
use Contao\CoreBundle\Routing\ScopeMatcher;
use Contao\CoreBundle\ServiceAnnotation\Callback;
use HeimrichHannot\TinyMceBundle\Manager\TinyMceManager;
use Symfony\Component\HttpFoundation\RequestStack;

class CustomDataContainer 
{
    private RequestStack $requestStack;
    private ScopeMatcher $scopeMatcher;
    private TinyMceManager $tinyMceManager;

    /**
     * @Callback(table="tl_jobmarket_job", target="config.onload")
     */
    public function onLoadCallback(DataContainer $dc = null): void
    {
        if ($this->requestStack->getCurrentRequest() && $this->scopeMatcher->isFrontendRequest($this->requestStack->getCurrentRequest())) {
            $GLOBALS['TL_DCA']['tl_custom']['fields']['text']['eval']['rte'] = 'tinyMCE';
            $GLOBALS['TL_DCA']['tl_custom']['fields']['text']['eval']['tinyMceOptions'] = [
                'menubar' => 'edit format',
                'toolbar' => 'link unlink | bold italic | bullist numlist | undo redo | code',
                'plugins' => ['paste', 'link', 'lists'],
                'paste_as_text' => true
            ];
            
            $GLOBALS['TL_DCA']['tl_custom']['fields']['littleText']['eval']['rte'] = 'tinyMCE';
            $GLOBALS['TL_DCA']['tl_custom']['fields']['littleText']['eval']['tinyMceOptions'] = $this->tinyMceManager->->getOptionPreset('limited');
        }
    }
}
```

Additional you can set a character limit:

```php
$GLOBALS['TL_DCA']['tl_custom']['fields']['text']['eval']['tinyMceOptions'] = ['maxChars' => 200];
```

The character limit will be checked on each keyup event thats dispatched while typing in the configured tinymce editor. There will be an error message above the corresponding field.
The form won't be submitted as long as the maximum character count is violated. If the user trys to submit the form the error message will be scrolled into view. 

### Add custom presets

To reuse your tinyMce configuration, you can add custom presets

```php
use HeimrichHannot\TinyMceBundle\Event\AddOptionPresetEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TinyMceSubscriber implements EventSubscriberInterface
{
    public function onAddOptionPresetEvent(AddOptionPresetEvent $event): void
    {
        $event->addPreset('custom', [
            'menubar' => false,
            'toolbar' => 'undo redo | bold | bullist numlist indent outdent | link unlink',
            'plugins' => ['link', 'lists'],
            'statusbar' => false,
        ]);
    }

    public static function getSubscribedEvents()
    {
        return [
            AddOptionPresetEvent::NAME => 'onAddOptionPresetEvent',
        ];
    }
}
```

## Events

Name | Description
---- | ---------
`AddOptionPresetEvent` | Add custom tinymce presets or customize existing ones.
`CustomizeTinyMceOptionsEvent` | Customize tinymce options and field attributes before rendering.
