<?php

namespace HeimrichHannot\TinyMceBundle\Asset;

use HeimrichHannot\UtilsBundle\Container\ContainerUtil;
use Symfony\Component\DependencyInjection\ContainerInterface;

class FrontendAsset
{
    /**
     * @var ContainerUtil
     */
    private $containerUtil;
    /**
     * @var ContainerInterface
     */
    private $container;

    public function __construct(ContainerInterface $container, ContainerUtil $containerUtil)
    {
        $this->containerUtil = $containerUtil;
        $this->container = $container;
    }

    public function addFrontendAssets()
    {
        if ($this->containerUtil->isBackend()) {
            return;
        }

        if ($this->container->has('huh.encore.asset.frontend')) {
            $this->container->get('huh.encore.asset.frontend')->addActiveEntrypoint('contao-tinymce-bundle');
            $this->container->get('huh.encore.asset.frontend')->addActiveEntrypoint('contao-tinymce-bundle-theme');
        }

        $GLOBALS['TL_JAVASCRIPT']['contao-tinymce-bundle'] = 'bundles/heimrichhannottinymce/js/contao-tinymce-bundle.js|static';
    }
}
