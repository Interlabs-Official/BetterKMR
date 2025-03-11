# 🔨 Building & Developing
In v1.0.1, BetterKMR shifted from the pure vanilla experience to a more modern, Webpack-based experience. This guide will show you how to build and modify BetterKMR.

## Cloning and basic running/building (from the README)
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
Please note that the compiled version of BetterKMR will be available in the `dist` folder. This includes the live-refreshable version as well.
## Modifying the code
To modify the code, [Visual Studio Code](https://code.visualstudio.com) is recommended, but you can use your preferred IDE.
A lot of what you need has already been covered above, but here's the folders and what purpose they have:
- `src/` - This is where most of the tweakable code is located (e.g. themes, modules, etc.)
- `docs/` - This is where the documentation for BetterKMR is located (what you're reading)
- `dist/` - This is where the compiled version of BetterKMR is located. This includes the live-refreshable version as well.
- `details/` - This is where extra details are located, for example, class name tooltips.
- `frameworks/` - A folder containing necessary frameworks for BetterKMR to function correctly.
- `settings/` - Contains settings related files, such as the settings page and the code editor.
- `legacy/` - A folder containing old, archived BetterKMR code. It is planned to be deleted in the future.
- `icon/` - Contains icon assets for BetterKMR.
- `assets/` - Contains other assets, such as theme backgrounds and misc images.

## My changes aren't always being reflected!
If you're modifying internal code, you may notice Webpack (the bundling tool & live refresher) doesn't always reflect those changes. In this case, you'll need to manually refresh the extension. This is a known issue and we're unsure if this will be fixed in the future.

## Have fun!
Have fun messing around with the code! Remember that:
- The code in `src/` is designed to be modular, so you can easily add your own modules or themes. However, custom themes should *really* be added in Settings.
- Always stick to the AGPL-3.0 license when modifying the code.
- BetterKMR is intended to be a community-driven project, so if you have any ideas or suggestions, feel free to open an issue or a pull request on the [GitHub repo](https://github.com/Interlabs-Official/BetterKMR/issues) or via our [Discord server](https://discord.gg/4MkRmFmHz2).