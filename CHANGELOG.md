# Changelog
All notable changes to this project will be documented in this file.

## [0.3.0-DEV] - 2021-04-12
- updated encore bundle integration
- moved GetAttributesFromDcaListener to EventListener/Contao namespace
- renamed GetAttributesFromDcaListener::onGetAttributesFromDca() to ::invoke()
- merged services.yml and listeners.yml
- fixed contao 4.4 compatibility
- fixed missing dependencies in composer.json
- fixed loading issue with IE11

## [0.2.1] - 2021-01-07
- fixed handling of form submit on errors 

## [0.2.0] - 2021-01-06
- added configurable maximum char input for tinymce editors

## [0.1.1] - 2020-09-11
- added service declaration for FrontendAsset

## [0.1.0] - 2020-09-10
- initial version
