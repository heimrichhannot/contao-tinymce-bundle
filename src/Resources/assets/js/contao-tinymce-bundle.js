import '@hundh/contao-utils-bundle';

import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';

class TinyMceBundle {

    static init() {
        TinyMceBundle.initTinyMce();
        TinyMceBundle.initEventListeners();
    }

    static initTinyMce() {
        let tinyMceFields = document.querySelectorAll('textarea[data-tinymce="1"]');

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
                // modify config before initialization
                config = TinyMceBundle.modifyConfig(element, config);

                // init
                tinymce.init(config);

            });

            let form = element.closest('form');
            if(!form.classList.contains('tinymce-form')) {
                form.classList.add('tinymce-form');
            }
        });

    }

    static initEventListeners() {
        utilsBundle.event.addDynamicEventListener('click', '.tinymce-limit-chars', (element) => {
            let message = element.closest('.tinymce-limit-error'),
                editorTarget = message.dataset.tinymce,
                limit = message.dataset.limit,
                editor = tinymce.get(editorTarget);

            if(!editor || !limit) {
                return;
            }

            editor.getBody().textContent = editor.getBody().textContent.substring(0, limit);
            TinyMceBundle.resetTinyMceError(editor);
        });

        utilsBundle.event.addDynamicEventListener('submit', '.tinymce-form', (form, e) => {
            let errors = form.querySelectorAll('.tinymce-error');

            if(0 === errors.length) {
                return;
            }

            e.preventDefault();
            errors[0].scrollIntoView();
        });
    }


    static modifyConfig(element, config) {
        config.selector = '#' + element.id;

        // set language
        let language = document.querySelector('html').getAttribute('lang');
        config.language_url = (typeof NON_ENCORE !== 'undefined' && NON_ENCORE ? '/bundles/heimrichhannottinymce/js/languages/' : '/build/tinymce/languages/') + language + '.js';
        config.language = language;

        // set eventlisteners for tinymce editor
        config.setup = (editor) => {
            TinyMceBundle.getTinyMceSetup(editor, config);
        };

        return config;
    }


    static getTinyMceSetup(editor, config) {
        // set maxChars event listener
        if('undefined' !== typeof config.maxChars) {
            editor.on('keyup', (e) => {
                TinyMceBundle.limitChars(editor, config);
            });
        }

        document.dispatchEvent(new CustomEvent('tinyMceModifySetupOnInit'), {
            detail: {
                editor: editor,
                config: config
            },
            bubbles: true,
            cancelable: true
        });

        return editor;
    }


    static limitChars(editor, config) {
        let stats = TinyMceBundle.getTextStats(editor),
            limit = config.maxChars;

        if(!limit || stats.chars <= limit) {
            TinyMceBundle.resetTinyMceError(editor);
            return;
        }

        // create error message
        let errorSelector = editor.id + '-error',
            message = document.getElementById(errorSelector),
            textarea = document.getElementById(editor.id),
            messageContent = config.maxCharsErrorMessage;

        if(!message) {
            message = document.createElement('div');
            message.id = errorSelector;
            message.classList.add('tinymce-error');
            message.classList.add('tinymce-limit-error');
            message.dataset.tinymce = editor.id;
            message.dataset.limit = limit;
            textarea.before(message);
        }

        message.innerHTML = messageContent;
        // update current char count in error message
        message.querySelector('.char-count').textContent = stats.chars;

        TinyMceBundle.setTinyMceError(editor);
    }

    // get current char and word count
    static getTextStats(editor) {
        let body = editor.getBody(),
            text = tinymce.trim(body.innerText || body.textContent);

        return {
            chars: text.length,
            words: text.split(/[\w\u2019\'-]+/).length
        };
    }

    static setTinyMceError(editor) {
        let form = document.getElementById(editor.id).closest('form');

        form.classList.add('has-tinymce-error');
    }

    static resetTinyMceError(editor) {
        let form = document.getElementById(editor.id).closest('form'),
            message = form.querySelector('#' + editor.id + '-error');

        if(message) {
            message.remove();
        }

        form.classList.remove('has-tinymce-error');
    }
}

export {TinyMceBundle};
