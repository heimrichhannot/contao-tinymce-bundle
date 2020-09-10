<?php

$dca = &$GLOBALS['TL_DCA']['tl_page'];

/**
 * Palettes
 */
$dca['palettes']['root']    = str_replace('includeLayout', 'includeLayout,useTinyMce', $dca['palettes']['root']);
$dca['palettes']['regular'] = str_replace('includeLayout', 'includeLayout,overrideUseTinyMce', $dca['palettes']['regular']);

/**
 * Fields
 */
$fields = [
    'useTinyMce' => [
        'label'     => &$GLOBALS['TL_LANG']['tl_page']['useTinyMce'],
        'exclude'   => true,
        'inputType' => 'checkbox',
        'eval'      => ['tl_class' => 'w50'],
        'sql'       => "char(1) NOT NULL default ''",
    ],
];
$dca['fields'] = array_merge(is_array($dca['fields']) ? $dca['fields'] : [], $fields);

\Contao\System::getContainer()->get('huh.utils.dca')->addOverridableFields(
    ['useTinyMce'],
    'tl_page',
    'tl_page'
);
