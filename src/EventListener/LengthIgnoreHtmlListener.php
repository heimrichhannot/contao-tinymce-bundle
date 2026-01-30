<?php

namespace HeimrichHannot\TinyMceBundle\EventListener;

use Contao\CoreBundle\DependencyInjection\Attribute\AsHook;
use Contao\Form;
use Contao\FormFieldModel;
use Contao\Widget;
use HeimrichHannot\TinyMceBundle\Widget\TinyMceWidget;

class LengthIgnoreHtmlListener
{
    /**
     * @param TinyMceWidget $widget
     */
    #[AsHook('loadFormField')]
    public function onLoadFormField(Widget $widget, string $formId, array $formData, Form $form): Widget
    {
        if (!$widget->useTinymce || !$widget->tinymceLengthIgnoreHtml) {
            return $widget;
        }

        if (!$widget->minlength && !$widget->maxlength) {
            return $widget;
        }

        $widget->addAttribute('minlength', 0);
        $widget->addAttribute('maxlength', 0);

        return $widget;
    }

    /**
     * @param TinyMceWidget $widget
     */
    #[AsHook('validateFormField')]
    public function onValidateFormField(Widget $widget, string $formId, array $formData, Form $form): Widget
    {
        if (!$widget->useTinymce || !$widget->tinymceLengthIgnoreHtml) {
            return $widget;
        }

        // only validate if value is a non-empty string (mandatory fields are handled before)
        if (!is_string($widget->value) || '' === $widget->value) {
            return $widget;
        }

        $model = FormFieldModel::findByPk($widget->id);
        if (null === $model) {
            return $widget;
        }

        $count = $this->count((string)$widget->value);

        if ($model->minlength && $count < $model->minlength) {
            $widget->addError(\sprintf($GLOBALS['TL_LANG']['ERR']['minlength'], $widget->strLabel, $model->minlength));
        }

        if ($model->maxlength && $count > $model->maxlength) {
            $widget->addError(\sprintf($GLOBALS['TL_LANG']['ERR']['maxlength'], $widget->strLabel, $model->maxlength));
        }

        return $widget;
    }

    protected function count(string $text): int
    {
        $text = html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        return mb_strlen($text, 'UTF-8');
    }
}