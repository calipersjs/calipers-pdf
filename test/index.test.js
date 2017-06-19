'use strict';

var fs   = require('fs');
var path = require('path');
var pdf  = require('../lib/index');

describe('pdf', function () {

  describe('detect', function () {

    it('should return true for a PDF', function () {
      var pdfPath = path.resolve(__dirname, 'fixtures/pdf/123x456.1.pdf');
      var result = pdf.detect(fs.readFileSync(pdfPath));
      expect(result).to.eql(true);
    });

    it('should return false for a non-PDF', function () {
      var pngPath = path.resolve(__dirname, 'fixtures/png/123x456.png');
      var result = pdf.detect(fs.readFileSync(pngPath));
      expect(result).to.eql(false);
    });

  });

  describe('measure', function () {

    var fixtures = path.resolve(__dirname, 'fixtures/pdf');
    var files = fs.readdirSync(fixtures);

    files.forEach(function (file) {
      var fileSplit = file.split(/x|\./);
      var width = parseInt(fileSplit[0]);
      var height = parseInt(fileSplit[1]);
      var pages = parseInt(fileSplit[2]);

      var expectedOutput = {
        type: 'pdf',
        pages: []
      };
      for (var i = 0; i < pages; i++) {
        expectedOutput.pages[i] = { width: width, height: height };
      }

      it('should return the correct dimensions for a path to ' + file, function () {
        var pdfPath = path.resolve(fixtures, file);

        return pdf.measure(pdfPath)
        .then(function (result) {
          for (var i = 0; i < result.pages.length; i++) {
            result.pages[i].width = Math.round(result.pages[i].width);
            result.pages[i].height = Math.round(result.pages[i].height);
          }
          expect(result).to.eql(expectedOutput);
        });
      });

      it('should return the correct dimensions for a buffer of ' + file, function () {
        var pdfPath = path.resolve(fixtures, file);
        var buffer = fs.readFileSync(pdfPath);

        return pdf.measure(buffer)
        .then(function (result) {
          for (var i = 0; i < result.pages.length; i++) {
            result.pages[i].width = Math.round(result.pages[i].width);
            result.pages[i].height = Math.round(result.pages[i].height);
          }
          expect(result).to.eql(expectedOutput);
        });
      });

    });

    it('should error with a path to a corrupt PDF', function () {
      var pdfPath = path.resolve(__dirname, 'fixtures/corrupt/corrupt.pdf');
      return expect(pdf.measure(pdfPath)).to.be.rejectedWith(Error);
    });

    it('should error with a buffer of a corrupt PDF', function () {
      var pdfPath = path.resolve(__dirname, 'fixtures/corrupt/corrupt.pdf');
      var buffer = fs.readFileSync(pdfPath);
      return expect(pdf.measure(buffer)).to.be.rejectedWith(Error);
    });

    it('should error with a path to a PDF with no pages', function () {
      var pdfPath = path.resolve(__dirname, 'fixtures/corrupt/no_pages.pdf');
      return expect(pdf.measure(pdfPath)).to.be.rejectedWith(Error);
    });

    it('should error with a buffer of a PDF with no pages', function () {
      var pdfPath = path.resolve(__dirname, 'fixtures/corrupt/no_pages.pdf');
      var buffer = fs.readFileSync(pdfPath);
      return expect(pdf.measure(buffer)).to.be.rejectedWith(Error);
    });

  });

});
