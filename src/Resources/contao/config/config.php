<?php

/**
 * Hooks
 */
$GLOBALS['TL_HOOKS']['getAttributesFromDca']['huhTinyMce'] = [\HeimrichHannot\TinyMceBundle\EventListener\Contao\GetAttributesFromDcaListener::class, '__invoke'];
