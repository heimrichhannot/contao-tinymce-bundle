import "@hundh/contao-utils-bundle"

import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';

class TinyMceBundle {

    static init() {
        let tinyMceFields = document.querySelectorAll('textarea[data-tinymce="1"]'),
            language = document.querySelector('html').getAttribute('lang');

        tinyMceFields.forEach((element) => {
            let config = JSON.parse(element.getAttribute('data-tinymce-options'));

            if (config === null) {
                config = {};
            }

            // load plugins
            function importPlugin(plugin, remainingPlugins, callback) {
                import(/* webpackChunkName: "tinymce-plugin-[request]" */ 'tinymce/plugins/' + plugin).then(({ default: _ }) => {
                    utilsBundle.util.runRecursiveFunction(importPlugin, remainingPlugins, callback)
                }).catch((error) => {
                    console.log('An error occurred while loading a tinymce plugin: ' + error);

                    utilsBundle.util.runRecursiveFunction(importPlugin, remainingPlugins, callback)
                });
            }

            utilsBundle.util.runRecursiveFunction(importPlugin, ['paste', 'link', 'lists'], () => {
                config.selector = '#' + element.id;

                // set language
                config.language_url = '/build/tinymce/languages/' + language + '.js';
                config.language = language;

                // init
                tinymce.init(config);
            });
        });
    }
}

export {TinyMceBundle};
