# Contao TinyMCE Bundle

This bundle allow using tinymce in the contao frontend (form generator).

## Features
- Enable TinyMCE for textarea fields in frontend forms
- Customizable TinyMCE configuration via Twig templates
- option to ignore html for min and max length validation

## Installation

Install with composer or contao manager and update database afterwards.

```bash
composer require heimrichhannot/contao-tinymce-bundle
```

## Usage

You'll see a new checkbox in textarea fields within the expert legend. 

![screenshot.png](docs/screenshot.png)

## Customization

You can create custom TinyMCE configurations by creating variants of [contao/templates/frontend_widget/components/tiny_mce.html.twig](contao/templates/frontend_widget/components/tiny_mce.html.twig).