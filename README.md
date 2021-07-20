# calipers-pdf

[![npm version](https://badge.fury.io/js/calipers-pdf.svg)](http://badge.fury.io/js/calipers-pdf) ![Build Status](https://github.com/calipersjs/calipers-pdf/actions/workflows/ci.yml/badge.svg?branch=master)


PDF Plugin for [Calipers](https://github.com/calipersjs/calipers). It can be
used to measure the page dimensions of a PDF and to check whether or not a PDF
is encrypted (password-protected).

# Installation

The [Poppler](http://poppler.freedesktop.org/) library C++ interface is required for PDF support.

To install Poppler on Mac OS X using Homebrew:

```
brew install poppler
```

To install Poppler on Ubuntu:

```
apt-get install pkg-config
apt-get install libpoppler-cpp-dev
```

To use, install calipers and calipers-pdf via npm:

```
npm install calipers calipers-pdf
```

# Usage

Calipers must be initialized by calling the required function with supported
file types passed in, in this case `'pdf'`.

```javascript
// Initializes Calipers with support for calipers-pdf.
var Calipers = require('calipers')('pdf');
```

Calipers exposes a single function, `measure`, once initialized.

### `measure(filePath, [callback])`

Measures the file at the given path.
- `filePath` - The path of the file.
- `callback` - called when the file has been measured
  - `err` - An Error is provided for unsupported file types or corrupt files.
  - `result` - Contains the following keys:
    - `type` - a string representing the file type (e.g. `'pdf'`)
    - `encrypted` - a boolean which is true if the PDF is encryted, false otherwise
    - `pages` - an array of objects with keys `width` and `height` which values
      are floating-point PostScript Point dimensions

# Examples

```js
var Calipers = require('calipers')('pdf');

// You can use a callback:
Calipers.measure('/path/to/document.pdf', function (err, result) {
  // result:
  // {
  //   type: 'pdf',
  //   encrypted: false,
  //   pages: [
  //     {
  //       width: 450,
  //       height: 670
  //     },
  //     {
  //       width: 450,
  //       height: 670
  //     }
  //   ]
  // }
});

// Or you can use promises:
Calipers.measure('/path/to/file.pdf')
.then(function (result) {
  // result:
  // {
  //   type: 'pdf',
  //   encrypted: false,
  //   pages: [
  //     {
  //       width: 450,
  //       height: 670
  //     }
  //   ]
  // }
});
```

# Issues/Bugs

Please report any issues in the [core Calipers repository](https://github.com/calipersjs/calipers/issues).

# Contribute

The easiest and most helpful way to contribute is to find a file that calipers incorrectly measures, and submit a PR with the file. The tests automatically run against all files in the `test/fixtures` directory, so simply drop it into the appropriate subdirectory, and name it according to its size `<width>x<height>x<pages>.pdf`.
