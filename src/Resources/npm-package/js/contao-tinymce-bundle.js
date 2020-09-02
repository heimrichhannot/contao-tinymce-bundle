// Import TinyMCE
import tinymce from 'tinymce/tinymce';

// import 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';


class TinyMCEBundle {

  static init() {
      let tinyMCEFields = document.querySelectorAll('textarea[data-tinymce="1"]');

      tinyMCEFields.forEach((element) => {
        let config = JSON.parse(element.getAttribute('data-tinymce-config'));

        console.log(config);
        if(config) {
          config.selector = '#' + element.id;

          tinymce.init(config);
        }
      });
  }
}

export {TinyMCEBundle};