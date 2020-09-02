<?php


namespace HeimrichHannot\TinyMCEBundle\EventListener;

use HeimrichHannot\TwigTemplatesBundle\Event\BeforeRenderTwigTemplateEvent;

class BeforeRenderTwigTemplateEventListener
{
    const TINYMCE_DEFAULTS_TOOLBAR = 'link unlink | image | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | undo redo | code';

    public function __invoke(BeforeRenderTwigTemplateEvent $event)
    {
        if('widget' != $event->getType()) {
            return;
        }

        $templateData = $event->getTemplateData();

        $config = $templateData['arrConfiguration'];
        if ('textarea' != $config['type'] || 'tinyMCE' != $config['rte'])
        {
            return;
        }

        $attributes = [
            'data-tinymce' => 1,
            'data-tinymce-config' => $this->getTinyMCEConfig($config)
        ];

        $this->compileAttributes($templateData, $attributes);
        $event->setTemplateData($templateData);
    }

    protected function getTinyMCEConfig(array $config)
    {
        $tinyConfig = [];

        if($config['menubar']){
            $tinyConfig['menubar'] = $config['menubar'];
        } else {
            $tinyConfig['menubar'] = false;
        }

        if($config['toolbar']) {
            $tinyConfig['toolbar'] = $config['toolbar'];
        }

        if($config['style_formats']) {
            $tinyConfig['style_formats'] = $config['style_formats'];
        }

        return json_encode($tinyConfig);
    }

    /**
     * @param array $templateData
     * @param array $attributeList
     */
    protected function compileAttributes(array &$templateData, array $attributeList): void
    {
        $attributes = '';
        if (isset($templateData['attributes']))
        {
            $attributes = $templateData['attributes'];
        }
        foreach ($attributeList as $key => $value)
        {
            $attributes.=' ';
            if ($value === true) {
                $value = '1';
            }
            if (is_string($key))
            {
                $attributes .= $key. "='" . $value . "'";
            }
            else {
                $attributes .= $value;
            }
        }
        $templateData['attributes'] = trim($attributes, " ");
    }
}
