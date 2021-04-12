<?php

namespace HeimrichHannot\TinyMceBundle\ContaoManager;

use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;
use Contao\ManagerPlugin\Config\ConfigPluginInterface;
use HeimrichHannot\TinyMceBundle\HeimrichHannotTinyMceBundle;
use HeimrichHannot\UtilsBundle\HeimrichHannotContaoUtilsBundle;
use Symfony\Component\Config\Loader\LoaderInterface;

class Plugin implements BundlePluginInterface, ConfigPluginInterface
{
    public function getBundles(ParserInterface $parser)
    {
        return [
            BundleConfig::create(HeimrichHannotTinyMceBundle::class)->setLoadAfter([
                ContaoCoreBundle::class,
                HeimrichHannotContaoUtilsBundle::class,
            ])
        ];
    }

    public function registerContainerConfiguration(LoaderInterface $loader, array $managerConfig)
    {
        $loader->load('@HeimrichHannotTinyMceBundle/Resources/config/services.yml');
        if (class_exists('HeimrichHannot\EncoreBundle\HeimrichHannotContaoEncoreBundle')) {
            $loader->load('@HeimrichHannotTinyMceBundle/Resources/config/config_encore.yml');
        }
    }
}
