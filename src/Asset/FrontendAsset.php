<?php

namespace HeimrichHannot\TinyMceBundle\Asset;

use HeimrichHannot\UtilsBundle\Container\ContainerUtil;
use Psr\Container\ContainerInterface;
use Symfony\Component\DependencyInjection\ServiceSubscriberInterface;

class FrontendAsset implements ServiceSubscriberInterface
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

        if ($this->container->has('HeimrichHannot\EncoreBundle\Asset\FrontendAsset')) {
            $this->container->get(\HeimrichHannot\EncoreBundle\Asset\FrontendAsset::class)->addActiveEntrypoint('contao-tinymce-bundle');
            $this->container->get(\HeimrichHannot\EncoreBundle\Asset\FrontendAsset::class)->addActiveEntrypoint('contao-tinymce-bundle-theme');
        }

        $GLOBALS['TL_JAVASCRIPT']['contao-tinymce-bundle'] = 'bundles/heimrichhannottinymce/js/contao-tinymce-bundle.js|static';
    }

    public static function getSubscribedServices()
    {
        return [
            '?HeimrichHannot\EncoreBundle\Asset\FrontendAsset'
        ];
    }
}
