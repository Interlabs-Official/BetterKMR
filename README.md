![betterkmr-full-size](https://github.com/user-attachments/assets/e44eada9-853c-47c9-b4fc-bdfab459d665)

<p align="center"><img src="https://img.shields.io/github/actions/workflow/status/Interlabs-Official/BetterKMR/build-extensions.yml?style=for-the-badge" alt="Version"></img>
<img src="https://img.shields.io/github/manifest-json/v/Interlabs-Official/BetterKMR?label=Version&style=for-the-badge" alt="Manifest"></img>
<img src="https://img.shields.io/badge/Chrome%20Supported-FFBD4F?style=for-the-badge" alt="ChromeSupported"></img>
<img src="https://img.shields.io/badge/Firefox%20Experimental-bf693b?style=for-the-badge" alt="FirefoxExperimental"></img>
</p>

<div align="center">

# BetterKMR

</div>

An awesome overhaul for the new **school.kiwi** student portal, also known as Kamar.

It's designed to fix and modify some of the changes that the new portal made, as well<br>
as extra missing features from the old Kamar portal.

[Why use BetterKMR?](#why-use-betterkmr) •
[Installation](#-installation) •
[Build Extension](#-build) •
[Features](#-features) •
[Home/Wiki/Docs](https://interlabs-official.github.io/BetterKMR) •
[Discord](https://discord.gg/4MkRmFmHz2)

Note:<br>
**Firefox builds are experimental and not supported, which may change at a later date. Please do not make bug reports for them.**

## Why use BetterKMR?
BetterKMR is an overhaul of the new school.kiwi student portal. It's designed to fix and modify some of the changes that the new portal made, as well as extra missing features from the old Kamar portal. ***If you want customisation, BetterKMR is for you!***

## 📦 Installation
*As stated on the documentation:*
&nbsp;Installing BetterKMR is easy! You can download the latest version from both the Chrome Web Store and Firefox Add-ons. To install BetterKMR manually, you can download the latest release from the releases page.

## 🌀 Features
![betterkmr_features](https://github.com/user-attachments/assets/9b18771d-ef5a-4f99-a6e8-8bc25aaa52c0)
<p align="center">Including tons of other features we know you'll enjoy!</p>

## 🔨 Build
To build this project, you must have [Git](https://git-scm.com) and [npm](https://www.npmjs.com) installed. You can use [npx](https://docs.npmjs.com/cli/v8/commands/npx) and other alternatives if you prefer.<br>
You can easily get BetterKMR up and running by building in a matter of minutes. Please note that this is intended for development purposes, and we suggest getting this extension via the Chrome Web Store otherwise.
To start, just clone the repository:
```
git clone https://github.com/Interlabs-Official/BetterKMR.git
```
Once done, change your current directory to the newly cloned one and run `npm install` to gather the required dependencies.
```bash
cd BetterKMR
npm install
```
Note that `npm install` may show a few warnings. This is fine to ignore for now.<br>
To start using an almost live-refreshable version of BetterKMR (for active developing purposes), do the following command:
```
npm run dev
```
If you would like to build BetterKMR for browsers:
```bash
npm run build:chrome
# or
npm run build:firefox
# or for both
npm run build:all
```
Firefox builds are experimental and not supported, which may change at a later date. Please do not make bug reports for them.<br>
If you would like to contribute and/or fix issues, feel free to [create a pull request.](https://github.com/Interlabs-Official/BetterKMR/pulls)

![betterkmr-screenshot1](https://github.com/user-attachments/assets/f5ba920d-6776-4e28-980a-ddd647969d6a)