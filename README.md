# H O R I Z

A simple horizontal damage meter overlay for Final Fantasy XIV. It supports
English, Portuguese, Chinese (S/T) and French. It's intended to be the new
version of HORIZOVERLAY.

## Quick Run

- Latest version of ACT
- Latest version of FFXIV Parsing Plugin
- Latest version of ngld's Overlay Plugin
- URL to put in ngld's Overlay Plugin: `https://bsides.github.io/horiz`

## Verbose and more explained run

- Latest version of [ACT](https://advancedcombattracker.com/):
  [link to download](https://advancedcombattracker.com/download.php). You will
  probably need to make it through your Windows Firewall and execute as admin.
  More details below.
- Open ACT and install FFXIV Parsing Plugin, either via its config or by
  [downloading in ACT page](https://advancedcombattracker.com/download.php).
  Please check out [this setup guide](https://github.com/FFXIV-ACT/setup-guide)
  if you need any help with this.
- Install the latest version of
  [Overlay Plugin by ngld](https://github.com/ngld/OverlayPlugin), either via
  ACT's windows or by
  [manually downloading](https://github.com/ngld/OverlayPlugin/releases)
  and installing.

### Install

_Please be sure that everything from the section above are fulfilled!_

1. Install the overlay by going to ACT's Plugins tab, then OverlayPlugin.dll's
   tab and then clicking "New" button below.
2. You should see a new window named Create new overlay. In the name field, put
   Horiz (could be anything). In the Preset, select Custom.
3. It will make a new entry in the list. Click on Horiz (or whatever is the
   name you gave) and fill in the URL: `https://bsides.github.io/horiz`
4. Don't forget to check if the options "Show overlay" and "Enable overlay" are
   on.
5. You could also check to "Enable clickthrough" and "Lock overlay" once you're
   happy positioning the overlay in the screen.

Done! It's really easy 😎

## Contributing

Please open an issue with whatever it is that you want to contribute. This
project is open to add features or fix whatever bugs.

We do use and enforce the use of [Prettier](https://prettier.io/).

## Use & Disclaimer

This project was made using [Svelte](https://svelte.dev/). Although it's not
the most used framework, I decided to use it because I wanted to learn something
new and it's pretty fast. The browser has evolved so much it just makes sense.

Don't be intimidated by the code, if you know frontend web development,
I'm sure you can read it.

## Credits

- To my other overlay where started it all,
  [H O R I Z O V E R L A Y](https://github.com/bsides/horizoverlay)
- To the whole community, really, you guys are awesome. You opened issues,
  helped with PRs and gave me a reason to start this version.

### Localization

- [@bsides](https://github.com/bsides): English, Spanish, Portuguese (Brazilian)
- [@yorushika](https://github.com/yorushika): Simplified / Traditional Chinese
- [@moondark](https://github.com/mooondark): French
