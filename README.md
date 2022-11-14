# Obsidian Export Image Plugin

This plugin helps you to export any articles to images easily.

## Usage

Note: This plugin works in preview mode.
![](./assets/mode.png)

* Use the command `export to image` in command palette (Press cmd/ctrl+P to enter the command) to generate a image and download it to your file system.
  ![](./assets/command.png)

* Use the command `copy as image` in command palette (Press cmd/ctrl+P to enter the command) to generate a image and copy it to clipboard, so you can paste in other softwares easily.
  ![](./assets/command-copy.png)

## Installation

### Obsidian

Not ready yet.

### Github

* Download the Latest Release from the Releases section of the GitHub Repository

* Extract the plugin folder from the zip to your vault's plugins folder: <vault>/.obsidian/plugins/

  Note: On some machines the .obsidian folder may be hidden. On MacOS you should be able to press Command+Shift+Dot to show the folder in Finder.

* Reload Obsidian

* If prompted about Safe Mode, you can disable safe mode and enable the plugin.

  Otherwise head to Settings, third-party plugins, make sure safe mode is off and

  enable the plugin from there.

### BRAT

* Install the BRAT plugin

  1. Open Settings -> Community Plugins

  2. Disable safe mode, if enabled

  3. Browse, and search for "BRAT"

  4. Install the latest version of Obsidian 42 - BRAT

* Open BRAT settings (Settings -> Obsidian 42 - BRAT)

  1. Scroll to the Beta Plugin List section

  2. Add Beta Plugin

  3. Specify this repository: zhouhua/obsidian-export-image

* Enable the Bartender plugin (Settings -> Community Plugins)

## Special Thanks

* [dom-to-image](https://github.com/tsayen/dom-to-image). This repo borrows lots of code from [dom-to-image](https://github.com/tsayen/dom-to-image). The amazing lib helps me generate images from dom.
