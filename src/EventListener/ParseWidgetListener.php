<?php

namespace HeimrichHannot\TinyMceBundle\EventListener;

use Contao\Backend;
use Contao\CoreBundle\DependencyInjection\Attribute\AsHook;
use Contao\CoreBundle\Twig\FragmentTemplate;
use Contao\Environment as ContaoEnvironment;
use Contao\FrontendTemplate;
use Contao\Widget;
use Twig\Environment;

#[AsHook('parseWidget')]
class ParseWidgetListener
{
    public function __construct(
        private readonly Environment $twig,
    )
    {
    }

    public function __invoke(string $buffer, Widget $widget): string
    {
        if (!$widget->useTinymce) {
            return $buffer;
        }

        $context = [
            'selector' => 'ctrl_' . $widget->id,
            'language' => Backend::getTinyMceLanguage(),
            'base' => ContaoEnvironment::get('base'),
        ];

//        $template = new FrontendTemplate('be_tinyMCE_test');
//        $template->selector = 'ctrl_' . $widget->id;
//        return $buffer . $template->parse();

        $template = $widget->tinymceTpl ?: 'frontend_widget/components/tiny_mce';
//        $template = 'backend/be_tinyMCE_app_minimal';

        return $buffer . $this->twig->render(
                '@Contao/' . $template . '.html.twig',
                $context,
            );
    }
}