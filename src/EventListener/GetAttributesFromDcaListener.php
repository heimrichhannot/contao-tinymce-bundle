<?php


namespace HeimrichHannot\TinyMceBundle\EventListener;


use Contao\DataContainer;
use Contao\PageModel;
use HeimrichHannot\TinyMceBundle\Asset\FrontendAsset;
use HeimrichHannot\TinyMceBundle\Event\CustomizeTinyMceOptionsEvent;
use HeimrichHannot\UtilsBundle\Container\ContainerUtil;
use HeimrichHannot\UtilsBundle\Dca\DcaUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Contracts\Translation\TranslatableInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

class GetAttributesFromDcaListener
{
    private $pageParents = null;

    /**
     * @var FrontendAsset
     */
    private $frontendAsset;

    /**
     * @var EventDispatcherInterface
     */
    private $eventDispatcher;

    /**
     * @var bool
     */
    protected $closed = false;
    /**
     * @var ContainerUtil
     */
    private $containerUtil;
    /**
     * @var DcaUtil
     */
    private $dcaUtil;
    /**
     * @var ModelUtil
     */
    private $modelUtil;
    /**
     * @var Environment
     */
    protected $twig;
    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * GetAttributesFromDcaListener constructor.
     * @param null $pageParents
     */
    public function __construct(ContainerUtil $containerUtil, FrontendAsset $frontendAsset, EventDispatcherInterface $eventDispatcher, DcaUtil $dcaUtil, ModelUtil $modelUtil, Environment $twig, TranslatorInterface $translator)
    {
        $this->frontendAsset = $frontendAsset;
        $this->eventDispatcher = $eventDispatcher;
        $this->containerUtil = $containerUtil;
        $this->dcaUtil = $dcaUtil;
        $this->modelUtil = $modelUtil;
        $this->twig = $twig;
        $this->translator = $translator;
    }

    /**
     * @Hook("getAttributesFromDca")
     *
     * @param array $attributes
     * @param DataContainer $dc
     * @return array
     */
    public function onGetAttributesFromDca(array $attributes, $dc = null): array
    {
        if ($this->containerUtil->isBackend() || !in_array($attributes['type'], ['textarea']))
        {
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




        $event = $this->eventDispatcher->dispatch(CustomizeTinyMceOptionsEvent::NAME, new CustomizeTinyMceOptionsEvent($options, $attributes, $dc));

        $attributes['data-tinymce-options'] = json_encode($event->getOptions());

        return $attributes;
    }

    protected function getPageWithParents()
    {
        /** @var PageModel $objPage */
        global $objPage;

        if (null === $this->pageParents && null !== $objPage)
        {
            $this->pageParents = $this->modelUtil->findParentsRecursively('pid', 'tl_page', $objPage);
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
        if(!key_exists('maxChars', $options)) {
            return;
        }

        $options['maxCharsErrorMessage'] = $this->twig->render('@HeimrichHannotTinyMce/message/max_chars.html.twig', [
            "maxChars" => $options['maxChars'],
            "field" => $dc ? $dc->field : ""
        ]);
    }
}
