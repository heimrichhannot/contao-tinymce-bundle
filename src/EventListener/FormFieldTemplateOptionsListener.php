<?php

namespace HeimrichHannot\TinyMceBundle\EventListener;

use Contao\CoreBundle\DependencyInjection\Attribute\AsCallback;
use Contao\CoreBundle\Twig\Finder\FinderFactory;
use Contao\CoreBundle\Twig\Loader\TemplateLocator;
use Contao\DataContainer;

#[AsCallback(table: 'tl_form_field', target: 'fields.tinymceTpl.options')]
class FormFieldTemplateOptionsListener
{
    public function __construct(
        private readonly FinderFactory $finderFactory,
    )
    {
    }

    public function __invoke(?DataContainer $dc = null): array
    {
        return $this->finderFactory->create()
            ->identifier('frontend_widget/components/tiny_mce')
            ->extension('html.twig')
            ->withVariants()
            ->asTemplateOptions();
    }
}