# Justified Layout

[![NPM Version](https://img.shields.io/npm/v/%40skaut%2Fjustified-layout)](https://www.npmjs.com/package/@skaut/justified-layout)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/skaut/justified-layout/CI.yml?branch=master&logo=github)](https://github.com/skaut/justified-layout/actions)
[![Codecov (with branch)](https://img.shields.io/codecov/c/github/skaut/justified-layout/master?logo=codecov)](https://app.codecov.io/gh/skaut/justified-layout)
[![NPM Downloads](https://img.shields.io/npm/dm/%40skaut%2Fjustified-layout?logo=npm)](https://www.npmjs.com/package/@skaut/justified-layout)
[![NPM License](https://img.shields.io/npm/l/%40skaut%2Fjustified-layout)](https://github.com/skaut/justified-layout/blob/master/LICENSE)

Pass in box sizes and get back sizes and coordinates for a nice justified layout, like the one seen
all over [Flickr](https://www.flickr.com/explore).

This is a maintained fork of [flickr/justified-layout](https://github.com/flickr/justified-layout),
which is no longer developed.

The library computes geometry only — it never touches the DOM, so rendering stays up to you.

It converts this:

```js
[0.5, 1.5, 1, 1.8, 0.4, 0.7, 0.9, 1.1, 1.7, 2, 2.1]
```

Into this:

```js
{
    "containerHeight": 1269,
    "widowCount": 0,
    "boxes": [
        {
            "aspectRatio": 0.5,
            "top": 10,
            "width": 170,
            "height": 340,
            "left": 10
        },
        {
            "aspectRatio": 1.5,
            "top": 10,
            "width": 510,
            "height": 340,
            "left": 190
        },
        ...
    ]
}
```

Which gives you everything you need to make something like this:

![Demonstration](https://cloud.githubusercontent.com/assets/43693/14033849/f5cffb58-f1da-11e5-9763-dce7e90835e1.png)


## Install

```sh
npm install @skaut/justified-layout
```


## Easy Usage

```js
import justifiedLayout from '@skaut/justified-layout';

const layoutGeometry = justifiedLayout([1.33, 1, 0.65], config);
```

The `config` argument is optional.

CommonJS is still supported for compatibility:

```js
const justifiedLayout = require('@skaut/justified-layout');
```

For use directly in a browser via a `<script>` tag, load `dist/justified-layout.umd.js`,
which exposes a global `justifiedLayout` function.

Type declarations are bundled, so there is no need for a separate `@types` package.


## Input

The first argument is an array of items to lay out. Each item is either an aspect ratio
(`width / height`) or an object with `width` and `height` properties:

```js
justifiedLayout([1.33, 1, 0.65]);
justifiedLayout([{ width: 400, height: 300 }, { width: 300, height: 300 }]);
```


## Config

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `containerWidth` | `number` | `1060` | The width that boxes will be contained within, irrelevant of padding. |
| `containerPadding` | `number` \| `{ top, right, bottom, left }` | `10` | Provide a single integer to apply padding to all sides, or an object to apply individual values to each side. |
| `boxSpacing` | `number` \| `{ horizontal, vertical }` | `10` | Provide a single integer to apply spacing both horizontally and vertically, or an object to apply individual values to each axis. |
| `targetRowHeight` | `number` | `320` | It's called a target because row height is the lever used to fit everything in nicely. The algorithm gets as close to it as it can. |
| `targetRowHeightTolerance` | `number` | `0.25` | How far row heights may deviate from `targetRowHeight`, as a fraction between `0` and `1`. Sticking to `targetRowHeight` exactly would likely make the layout impossible to justify. |
| `edgeCaseMinRowHeight` | `number` | `0.5 * targetRowHeight` | The minimum acceptable row height, for rows that cannot be resolved within tolerance. |
| `edgeCaseMaxRowHeight` | `number` | `2 * targetRowHeight` | The maximum acceptable row height, for rows that cannot be resolved within tolerance. |
| `maxNumRows` | `number` | `Number.POSITIVE_INFINITY` | Stop adding rows at this number, regardless of how many items still need to be laid out. |
| `forceAspectRatio` | `boolean` \| `number` | `false` | Provide an aspect ratio to return everything in that aspect ratio. Makes the values in your input array irrelevant; the length of the array remains relevant. |
| `fullWidthBreakoutRowCadence` | `boolean` \| `number` | `false` | Provide a number `n` to make every `n`th row a single, full-width item. Only happens if that item has an aspect ratio >= 1. |
| `showWidows` | `boolean` | `true` | Whether to return items at the end of the layout that don't make up a full row. If `false`, they are omitted from the output. |
| `widowLayoutStyle` | `'left'` \| `'center'` \| `'justify'` | `'left'` | If widows are visible, how they should be laid out. |


## Output

| Property | Type | Description |
| --- | --- | --- |
| `containerHeight` | `number` | Height of the container holding the layout. |
| `widowCount` | `number` | Number of items in rows that aren't fully packed. |
| `boxes` | `Array` | The laid-out boxes, in input order. |

Each box has:

| Property | Type | Description |
| --- | --- | --- |
| `aspectRatio` | `number` | Aspect ratio of the box. |
| `top` | `number` | Distance between the top of the box and the top boundary of the layout. |
| `width` | `number` | Width of the box. |
| `height` | `number` | Height of the box. |
| `left` | `number` | Distance between the left of the box and the left boundary of the layout. |
| `forcedAspectRatio` | `boolean` | Present and `true` when the aspect ratio was forced via `forceAspectRatio`. |


## Demo

`demo.html` in the repository renders several configurations side by side. Run `npm run build`
first, since it loads the bundle from `dist/`.


## License

Open Source Licensed under the MIT license.
