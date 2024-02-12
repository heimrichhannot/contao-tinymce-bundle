<?php

namespace HeimrichHannot\TinyMceBundle\Asset;

use HeimrichHannot\EncoreContracts\PageAssetsTrait;
use HeimrichHannot\UtilsBundle\Util\Utils;
use Symfony\Contracts\Service\ServiceSubscriberInterface;

class FrontendAsset implements ServiceSubscriberInterface
{
    use PageAssetsTrait;

    private Utils $utils;

    public function __construct(Utils $utils)
    {
        $this->utils = $utils;
    }

    public function addFrontendAssets()
    {
        if ($this->utils->container()->isBackend()) {
            return;
        }

        $this->addPageEntrypoint('contao-tinymce-bundle', [
            'TL_JAVASCRIPT' => 'bundles/heimrichhannottinymce/js/contao-tinymce-bundle.js|static'
        ]);
        $this->addPageEntrypoint('contao-tinymce-bundle-theme');
    }
}
