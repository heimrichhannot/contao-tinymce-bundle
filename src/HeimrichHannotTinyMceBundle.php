<?php


namespace HeimrichHannot\TinyMceBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class HeimrichHannotTinyMceBundle extends Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }

}
