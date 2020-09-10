<?php

namespace HeimrichHannot\TinyMceBundle\Event;


use Symfony\Component\EventDispatcher\Event;

class AddOptionPresetEvent extends Event
{

    const NAME = 'huh.tinymce.add_option_preset';
    /**
     * @var array
     */
    private $presets;

    public function __construct(array $presets)
    {
        $this->presets = $presets;
    }

    /**
     * @return array
     */
    public function getPresets(): array
    {
        return $this->presets;
    }

    public function setPresets(array $presets)
    {
        $this->presets = $presets;
    }
}
