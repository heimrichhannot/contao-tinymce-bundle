<?php

namespace HeimrichHannot\TinyMceBundle\EventListener;

use Contao\CoreBundle\DependencyInjection\Attribute\AsHook;
use Contao\Form;
use Contao\Widget;

#[AsHook('loadFormField')]
class LoadFormFieldListener
{
    public function __invoke(Widget $widget, string $formId, array $formData, Form $form): Widget
    {
        if (!$widget->tinymceTpl) {
            return $widget;
        }

        $widget->allowHtml = true;

        return $widget;
    }
}