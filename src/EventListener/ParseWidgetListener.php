<?php

namespace HeimrichHannot\TinyMceBundle\EventListener;

use Contao\CoreBundle\DependencyInjection\Attribute\AsHook;
use Contao\FrontendTemplate;
use Contao\Widget;

#[AsHook('parseWidget')]
class ParseWidgetListener
{
    public function __invoke(string $buffer, Widget $widget): string
    {
        if ('short_resume' !== $widget->name) {
            return $buffer;
        }

        $tineTemplate = new FrontendTemplate('backend/be_tinyMCE_app_minimal');
        $tineTemplate->selector = 'ctrl_'.$widget->id;

        return $buffer.$tineTemplate->parse();
    }
}