#calipers-pdf

[![npm version](https://badge.fury.io/js/calipers-pdf.svg)](http://badge.fury.io/js/calipers-pdf) [![Build Status](https://travis-ci.org/calipersjs/calipers-pdf.svg?branch=master)](https://travis-ci.org/calipersjs/calipers-pdf)

PDF Plugin for [Calipers](https://github.com/calipersjs/calipers).

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

To use, install calipers and calipers-pdf via NPM:

```
npm install calipers calipers-pdf
```

# Usage

Please see the [Calipers README](https://github.com/calipersjs/calipers) for documentation.

# Issues/Bugs

Please report any issues in the [core Calipers repository](https://github.com/calipersjs/calipers/issues).

# Contribute

The easiest and most helpful way to contribute is to find a file that calipers incorrectly measures, and submit a PR with the file. The tests automatically run against all files in the `test/fixtures` directory, so simply drop it into the appropriate subdirectory, and name it according to its size `<width>x<height>x<pages>.pdf`.
