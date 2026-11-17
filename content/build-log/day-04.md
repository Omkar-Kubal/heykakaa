---
day: 4
series: "Documenting the process"
title: "Choosing the Global Kit"
date: 2026-11-16
summary: >-
  I chose the shared visual direction for App #11: monochrome colors, Google Sans typography, and a consistent Hugeicons style for the Flutter interface.
reel_url: "https://www.instagram.com/p/Df2OPsNK6DC/"
cover_image: "/assets/day-04-cover.webp"
cover_alt: "Day 04 Global Kit cover, with @hey.kakaa speaking to camera."
cover_width: 1080
cover_height: 1920
tags: [flutter, design-system, typography, iconography, build-in-public]
status: published
---

## Goal today

After documenting the app idea, I need a shared foundation for its screens. I call this the **global kit**: the color roles, typography, icon style, and other visual rules that should stay consistent throughout the app. Setting these choices early gives every new screen the same starting point.

For App #11, I’m choosing a minimal, monochrome direction. The interface should make the information easy to read without turning someone’s screen habits into a judgment.

## What I did

I settled the direction for the app’s interface and the tools I want to use. **Flutter** will handle the UI, while **Kotlin** will handle the native Android layer. I chose **Google Sans** for the interface type, **Hugeicons** as the source for interface icons, and a black, white, and gray color scheme.

These are kit choices for the build ahead. The code examples below show how I would organize them; they are explanatory pseudocode, not a claim that every theme file or screen was finished on Day 04.

## Decisions + why

**Color scheme.** Monochrome does not mean using only one black and one white. A screen still needs distinct roles: a canvas behind everything, a surface for cards, strong text, quieter supporting text, dividers, control outlines, and selected states. Naming colors by their roles lets the app switch between light, dark, and AMOLED modes without rewriting every screen. My working palette uses white surfaces and black text in light mode; `#080808` canvas, `#171717` surfaces, and white text in dark mode; and a pure black canvas in AMOLED mode. Gray values carry quieter information. The mascot and supported-app logos can retain their own colors. I’ll check text and control contrast before treating every pairing as final.

**Typography.** A font family supplies the letter shapes; a type scale assigns sizes to jobs on the screen. Google Sans gives this app one consistent family for labels, body copy, headings, and numbers. The working scale is 12, 14, 16, 22, 28, and 32, with a larger 56–72 score readout. Weight adds hierarchy—regular body copy, a stronger label, and bolder headings—while line height keeps longer text comfortable to read. The final screens also need to remain usable when the system increases text size. [Google Sans is available under the SIL Open Font License](https://github.com/googlefonts/googlesans); the font files and license notice should come from the official source when bundled in the app.

**Iconography.** I want ordinary controls to use one icon family, rather than mixing shapes and stroke weights from several libraries. Hugeicons has a [Flutter package](https://pub.dev/packages/hugeicons) with a consistent Stroke Rounded set. I’ll use a shared 20–24 size range and one stroke weight, then check that each icon is recognizable and paired with a clear label where needed. An icon should make an action easier to find, not carry a critical meaning on its own.

## Docs / assets

- [Watch the Day 04 Instagram video](https://www.instagram.com/p/Df2OPsNK6DC/). Its “Global Kit” cover appears at the top of this page.
- **Tools chosen for this app:** Flutter for UI, Kotlin for Android-specific behavior, Google Sans for typography, and Hugeicons for interface icons. These are design and development choices, not a list of completed product research.
- [Read Day 01](https://www.heykakaa.com/build-log/day-1) for the reusable product research prompt and suggested research toolkit.
- [Flutter’s theme guide](https://docs.flutter.dev/cookbook/design/themes), [custom font guide](https://docs.flutter.dev/cookbook/design/fonts), and the [Hugeicons Flutter package](https://pub.dev/packages/hugeicons) are useful references for applying this kit.

### Color roles and `global.css`

On a website, a `global.css` file can define shared color variables once and let every page use them. This small example shows the idea:

```css
:root {
  --canvas: #ffffff;
  --surface: #ffffff;
  --text: #000000;
  --muted-text: #595959;
  --divider: #d9d9d9;
}

[data-theme="dark"] {
  --canvas: #080808;
  --surface: #171717;
  --text: #ffffff;
  --muted-text: #bdbdbd;
  --divider: #404040;
}

[data-theme="amoled"] {
  --canvas: #000000;
  --surface: #000000;
  --text: #ffffff;
  --muted-text: #bdbdbd;
  --divider: #404040;
}
```

The Android app is being built with Flutter, so it does **not** read `global.css`. The Flutter equivalent is a shared set of color values and a `ThemeData`/`ColorScheme` applied across the app. Each screen asks the current theme for colors instead of hard-coding them.

### Flutter kit pseudocode

This is a sketch of the structure, not a ready-to-run Dart file:

```text
colors = {
  light:  { canvas: #FFFFFF, surface: #FFFFFF,
            text: #000000, muted: #595959 },
  dark:   { canvas: #080808, surface: #171717,
            text: #FFFFFF, muted: #BDBDBD },
  amoled: { canvas: #000000, surface: #000000,
            text: #FFFFFF, muted: #BDBDBD }
}

typeScale = {
  caption: 12, label: 14, body: 16,
  title: 22, heading: 28, score: 56..72
}

kit = AppKit(
  colors: colors[currentMode],
  fontFamily: "GoogleSans",
  textStyles: typeScale,
  iconStyle: HugeiconsStrokeRounded(size: 24,
                                     consistentStroke: true)
)

app.theme = kit.toFlutterThemeData()
screen.textColor = app.theme.colors.text
screen.homeIcon = HugeIcon(
  icon: HugeIcons.strokeRoundedHome01,
  size: 24,
  color: app.theme.colors.text
)
```

In a real Flutter project, I would register the font files in `pubspec.yaml`, define the light/dark/AMOLED themes in Dart, and use `Theme.of(context)` inside widgets. The Kotlin layer handles Android-specific work; it does not choose the visual style for every Flutter screen.

### Prompt for planning a global kit

```text
Act as a design-system collaborator. I will give you my app idea,
target users, PRD notes, platform, and visual preferences.

Propose a small global kit with:
1. Named color roles for light, dark, and AMOLED themes.
2. Text styles: font family, size, weight, and line height for
   captions, labels, body text, headings, and large numbers.
3. One icon family, style, size range, and stroke rule.
4. Shared spacing, shape, and touch-target rules.
5. A short CSS-variable example and equivalent Flutter theme
   pseudocode, clearly labeled as examples.

Explain why each choice helps the product. Flag color contrast,
font licensing, icon licensing, text scaling, and platform checks.
Separate my confirmed choices from your suggestions. Do not claim
that a mockup, user test, or implementation already exists.
```

## Learnings / blockers + Tomorrow

The useful part of a global kit is consistency: a new screen can reuse the same color roles, text hierarchy, and icon rules instead of making those choices again. The next step is to apply the kit to actual screens and see which choices need adjustment once they are used together.
