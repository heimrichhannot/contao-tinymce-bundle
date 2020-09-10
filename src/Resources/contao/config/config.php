<?php

/**
 * Hooks
 */
$GLOBALS['TL_HOOKS']['getAttributesFromDca']['huhTinyMce'] = [\HeimrichHannot\TinyMceBundle\EventListener\GetAttributesFromDcaListener::class, 'onGetAttributesFromDca'];
