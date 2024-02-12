<?php

namespace HeimrichHannot\TinyMceBundle\Event;


use Contao\DataContainer;
use Symfony\Contracts\EventDispatcher\Event;

class CustomizeTinyMceOptionsEvent extends Event
{

    const NAME = 'huh.tinymce.customize_tinymce_options';
    /**
     * @var array
     */
    private $options;
    /**
     * @var array
     */
    private $fieldAttributes;
    /**
     * @var DataContainer|null
     */
    private $dc;

    /**
     * @param array $options
     * @param array $fieldAttributes
     * @param DataContainer|null $dc
     */
    public function __construct(array $options, array $fieldAttributes, $dc)
    {
        $this->options = $options;
        $this->fieldAttributes = $fieldAttributes;
        $this->dc = $dc;
    }

    /**
     * @return array
     */
    public function getOptions(): array
    {
        return $this->options;
    }

    /**
     * @return array
     */
    public function getFieldAttributes(): array
    {
        return $this->fieldAttributes;
    }

    /**
     * Return the optional datacontainer object from the getAttributesFromDca hook.
     *
     * In some legacy code (like ModuleRegistration, as of version 4.4.46), this could also be a module object.
     *
     * @return DataContainer
     */
    public function getDc()
    {
        return $this->dc;
    }

    /**
     * @param array $options
     */
    public function setOptions(array $options): void
    {
        $this->options = $options;
    }
}
