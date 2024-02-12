<?php

/*
 * Copyright (c) 2021 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\TinyMceBundle\EventListener;

use HeimrichHannot\EncoreBundle\Helper\ConfigurationHelper;
use HeimrichHannot\TinyMceBundle\Event\CustomizeTinyMceOptionsEvent;
use Psr\Container\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Contracts\Service\ServiceSubscriberInterface;

class EncoreBundleListener implements EventSubscriberInterface, ServiceSubscriberInterface
{
    protected ContainerInterface $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * {@inheritDoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            CustomizeTinyMceOptionsEvent::NAME => 'onCustomizeTinyMceOptionsEvent',
        ];
    }

    public function onCustomizeTinyMceOptionsEvent(CustomizeTinyMceOptionsEvent $event): void
    {
        if (!$this->container->has('HeimrichHannot\EncoreBundle\Helper\ConfigurationHelper')) {
            return;
        }

        if (!$this->container->get(ConfigurationHelper::class)->isEnabledOnCurrentPage()) {
            return;
        }

        $options = $event->getOptions();
        $outputPath = $this->container->get(ConfigurationHelper::class)->getRelativeOutputPath();

        if (!empty($outputPath)) {
            $options['base_url'] = \DIRECTORY_SEPARATOR.ltrim($outputPath, '.'.\DIRECTORY_SEPARATOR);
        }
        $event->setOptions($options);
    }

    public static function getSubscribedServices()
    {
        return [
            '?HeimrichHannot\EncoreBundle\Helper\ConfigurationHelper',
        ];
    }
}
