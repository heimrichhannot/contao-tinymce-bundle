<?php

namespace HeimrichHannot\TinyMceBundle\ContaoManager;

use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;
use Contao\ManagerPlugin\Config\ConfigPluginInterface;
use Contao\ManagerPlugin\Config\ContainerBuilder;
use Contao\ManagerPlugin\Config\ExtensionPluginInterface;
use HeimrichHannot\TinyMceBundle\HeimrichHannotTinyMceBundle;
use HeimrichHannot\UtilsBundle\Container\ContainerUtil;
use HeimrichHannot\UtilsBundle\HeimrichHannotContaoUtilsBundle;
use Symfony\Component\Config\Loader\LoaderInterface;

class Plugin implements BundlePluginInterface, ExtensionPluginInterface, ConfigPluginInterface
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

    public function getExtensionConfig($extensionName, array $extensionConfigs, ContainerBuilder $container)
    {
        $extensionConfigs =  ContainerUtil::mergeConfigFile(
            'huh_encore',
            $extensionName,
            $extensionConfigs,
            __DIR__.'/../Resources/config/config_encore.yml'
        );

        return $extensionConfigs;
    }

    public function registerContainerConfiguration(LoaderInterface $loader, array $managerConfig)
    {
        $loader->load('@HeimrichHannotTinyMceBundle/Resources/config/listeners.yml');
        $loader->load('@HeimrichHannotTinyMceBundle/Resources/config/services.yml');
    }
}
