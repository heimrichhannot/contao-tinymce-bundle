<?php

namespace HeimrichHannot\TinyMceBundle\Manager;

use HeimrichHannot\TinyMceBundle\Event\AddOptionPresetEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class TinyMceManager {

    private EventDispatcherInterface $eventDispatcher;

    public function __construct(EventDispatcherInterface $eventDispatcher)
    {
        $this->eventDispatcher = $eventDispatcher;
    }

    public function getOptionPreset(string $type)
    {
        $presets = [
            'limited' => [
                'menubar' => 'edit format',
                'toolbar' => 'link unlink | bold italic | bullist numlist | undo redo | code',
                'plugins' => ['paste', 'link', 'lists'],
                'paste_as_text' => true
            ]
        ];

        $event = $this->eventDispatcher->dispatch(new AddOptionPresetEvent($presets), AddOptionPresetEvent::NAME);

        return $event->getPresets()[$type];
    }
}
