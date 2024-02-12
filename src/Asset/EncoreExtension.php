<?php

namespace HeimrichHannot\TinyMceBundle\Asset;

use HeimrichHannot\EncoreContracts\EncoreEntry;
use HeimrichHannot\EncoreContracts\EncoreExtensionInterface;
use HeimrichHannot\TinyMceBundle\HeimrichHannotTinyMceBundle;

class EncoreExtension implements EncoreExtensionInterface
{

    /**
     * @inheritDoc
     */
    public function getBundle(): string
    {
        return HeimrichHannotTinyMceBundle::class;
    }

    /**
     * @inheritDoc
     */
    public function getEntries(): array
    {
        return [
            EncoreEntry::create('contao-tinymce-bundle', 'src/Resources/assets/js/contao-tinymce-bundle-init.js')
                ->addJsEntryToRemoveFromGlobals('contao-tinymce-bundle'),
            EncoreEntry::create('contao-tinymce-bundle-theme', 'src/Resources/assets/js/contao-tinymce-bundle-theme.js')
                ->setRequiresCss(true),

        ];
    }
}