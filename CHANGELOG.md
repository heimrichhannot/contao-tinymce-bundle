# Changelog
All notable changes to this project will be documented in this file.

## [0.3.5] - 2024-02-12
- Fixed: service registration

## [0.3.4] - 2024-02-12
- Added: encore contracts support
- Changed: require at least contao 4.9
- Changed: require at least PHP 7.4
- Fixed: a lot of deprecations

## [0.3.3] - 2022-04-05
- Added: AddOptionPresetEvent::addPreset()

## [0.3.2] - 2022-03-02
- Changed: allow php 8

## [0.3.1] - 2021-04-12
- Fixed: encore bundle minimum version

## [0.3.0] - 2021-04-12
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
