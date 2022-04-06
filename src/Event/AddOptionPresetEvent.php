<?php

/*
 * Copyright (c) 2022 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

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
     * Add a preset.
     *
     * Example:
     *   AddOptionPresetEvent::addPreset('limited', [
     *      'menubar' => 'edit format',
     *      'toolbar' => 'link unlink | bold italic | bullist numlist | undo redo | code',
     *      'plugins' => ['paste', 'link', 'lists'],
     *      'paste_as_text' => true
     *  ])
     */
    public function addPreset(string $name, array $preset): void
    {
        $this->presets[$name] = $preset;
    }

    public function getPresets(): array
    {
        return $this->presets;
    }

    public function setPresets(array $presets)
    {
        $this->presets = $presets;
    }
}
