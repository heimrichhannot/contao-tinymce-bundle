<?php


namespace HeimrichHannot\TinyMceBundle\EventListener\Contao;


use Contao\CoreBundle\ServiceAnnotation\Hook;
use Contao\DataContainer;
use Contao\PageModel;
use HeimrichHannot\TinyMceBundle\Asset\FrontendAsset;
use HeimrichHannot\TinyMceBundle\Event\CustomizeTinyMceOptionsEvent;
use HeimrichHannot\UtilsBundle\Dca\DcaUtil;
use HeimrichHannot\UtilsBundle\Util\Utils;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

/**
 * @Hook("getAttributesFromDca")
 */
class GetAttributesFromDcaListener
{
    private ?array $pageParents = null;
    private FrontendAsset $frontendAsset;
    private EventDispatcherInterface $eventDispatcher;
    protected bool $closed = false;
    private DcaUtil $dcaUtil;
    protected Environment $twig;
    protected TranslatorInterface $translator;
    private Utils $utils;

    /**
     * GetAttributesFromDcaListener constructor.
     * @param null $pageParents
     */
    public function __construct(FrontendAsset $frontendAsset, EventDispatcherInterface $eventDispatcher, DcaUtil $dcaUtil, Environment $twig, TranslatorInterface $translator, Utils $utils)
    {
        $this->frontendAsset = $frontendAsset;
        $this->eventDispatcher = $eventDispatcher;
        $this->dcaUtil = $dcaUtil;
        $this->twig = $twig;
        $this->translator = $translator;
        $this->utils = $utils;
    }

    /**
     * @param array $attributes
     * @param DataContainer|null $dc
     * @return array
     */
    public function __invoke(array $attributes, $dc = null): array
    {
        if ($this->utils->container()->isBackend() || !in_array($attributes['type'], ['textarea'])) {
            return $attributes;
        }

        $this->getPageWithParents();

        if (null === $this->pageParents || !$this->dcaUtil->getOverridableProperty('useTinyMce', $this->pageParents)) {
            return $attributes;
        }

        $options = [];

        // dca
        if ($dc !== null && $dc->table) {
            $this->dcaUtil->loadDc($dc->table);

            if (isset($GLOBALS['TL_DCA'][$dc->table]['fields'][$dc->field]['eval']['rte'])) {
                $eval = $GLOBALS['TL_DCA'][$dc->table]['fields'][$dc->field]['eval'];

                if (isset($eval['tinyMceOptions'])) {
                    $options = $eval['tinyMceOptions'];
                    $this->addCharsLimit($options, $dc);
                }

                $this->frontendAsset->addFrontendAssets();
                $attributes['data-tinymce'] = 1;
            }
        } else {
            $this->frontendAsset->addFrontendAssets();
            $attributes['data-tinymce'] = 1;
        }

        $event = $this->eventDispatcher->dispatch(
            new CustomizeTinyMceOptionsEvent($options, $attributes, $dc),
            CustomizeTinyMceOptionsEvent::NAME
        );

        $attributes['data-tinymce-options'] = json_encode($event->getOptions());

        return $attributes;
    }

    protected function getPageWithParents()
    {
        /** @var PageModel $objPage */
        global $objPage;

        if (null === $this->pageParents && null !== $objPage) {
            $this->pageParents = $this->utils->model()->findParentsRecursively($objPage, 'pid');
            $this->pageParents[] = $objPage;
        }

        return $this->pageParents;
    }

    /**
     * add error message for tinymce maxChars violation
     *
     * @param array $options
     * @param DataContainer|null $dc
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    protected function addCharsLimit(array &$options, DataContainer $dc = null): void
    {
        if (!key_exists('maxChars', $options)) {
            return;
        }

        $options['maxCharsErrorMessage'] = $this->twig->render('@HeimrichHannotTinyMce/message/max_chars.html.twig', [
            "maxChars" => $options['maxChars'],
            "field" => $dc ? $dc->field : ""
        ]);
    }
}
