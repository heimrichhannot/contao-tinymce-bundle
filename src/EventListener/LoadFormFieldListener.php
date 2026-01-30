<?php

namespace HeimrichHannot\TinyMceBundle\EventListener;

use Contao\CoreBundle\DependencyInjection\Attribute\AsHook;
use Contao\Form;
use Contao\Widget;
use HeimrichHannot\TinyMceBundle\Widget\TinyMceWidget;

#[AsHook('loadFormField')]
class LoadFormFieldListener
{
    /**
     * @param TinyMceWidget $widget
     */
    public function __invoke(Widget $widget, string $formId, array $formData, Form $form): Widget
    {
        if (!$widget->useTinymce) {
            return $widget;
        }

        $widget->allowHtml = true;
        $widget->preserveTags = true;

        return $widget;
    }
}