<?php

use Contao\CoreBundle\DataContainer\PaletteManipulator;

$dca = &$GLOBALS['TL_DCA']['tl_form_field'];

PaletteManipulator::create()
    ->addField('useTinymce', 'expert_legend', PaletteManipulator::POSITION_APPEND)
    ->applyToPalette('textarea', 'tl_form_field');

$dca['palettes']['__selector__'][] = 'useTinymce';
$dca['subpalettes']['useTinymce'] = 'tinymceTpl';

$dca['fields']['useTinymce'] = [
    'label' => &$GLOBALS['TL_LANG']['tl_form_field']['useTinymce'],
    'inputType' => 'checkbox',
    'eval' => ['tl_class' => 'w50 m12', 'submitOnChange' => true],
    'sql' => ['type' => 'boolean', 'default' => false],
];

$dca['fields']['tinymceTpl'] = [
    'inputType' => 'select',
    'eval' => ['tl_class' => 'w50'],
    'sql' => "varchar(64) NOT NULL default ''",
];



