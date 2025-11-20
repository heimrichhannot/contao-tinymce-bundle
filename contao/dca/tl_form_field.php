<?php

use Contao\CoreBundle\DataContainer\PaletteManipulator;

$dca = &$GLOBALS['TL_DCA']['tl_form_field'];

PaletteManipulator::create()
    ->addField('tinymceTpl', 'expert_legend', PaletteManipulator::POSITION_APPEND)
    ->applyToPalette('textarea', 'tl_form_field');

$dca['fields']['tinymceTpl'] = [
    'inputType' => 'select',
    'eval' => ['includeBlankOption' => true, 'tl_class' => 'w50'],
    'sql' => "varchar(64) NOT NULL default ''",
];



