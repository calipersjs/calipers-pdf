'use strict';

const expect = require('chai').expect;
const fs     = require('fs');
const path   = require('path');
const pdf    = require('../lib/index');

describe('pdf', () => {

  describe('detect', () => {

    it('should return true for a PDF', () => {
      const pdfPath = path.resolve(__dirname, 'fixtures/pdf/123x456.1.pdf');
      const result = pdf.detect(fs.readFileSync(pdfPath));
      expect(result).to.eql(true);
    });

    it('should return false for a non-PDF', () => {
      const pngPath = path.resolve(__dirname, 'fixtures/png/123x456.png');
      const result = pdf.detect(fs.readFileSync(pngPath));
      expect(result).to.eql(false);
    });

  });

  describe('measure', () => {

    const fixtures = path.resolve(__dirname, 'fixtures/pdf');
    const files = fs.readdirSync(fixtures);

    files.forEach((file) => {
      const fileSplit = file.split(/x|\./);
      const width = parseInt(fileSplit[0]);
      const height = parseInt(fileSplit[1]);
      const pages = parseInt(fileSplit[2]);

      const expectedOutput = {
        type: 'pdf',
        encrypted: false,
        pages: []
      };
      for (let i = 0; i < pages; i++) {
        expectedOutput.pages[i] = { width, height };
      }

      it(`should return the correct dimensions for ${  file}`, () => {
        const pdfPath = path.resolve(fixtures, file);
        return pdf.measure(pdfPath)
          .then((result) => {
            for (let i = 0; i < result.pages.length; i++) {
              result.pages[i].width = Math.round(result.pages[i].width);
              result.pages[i].height = Math.round(result.pages[i].height);
            }
            expect(result).to.eql(expectedOutput);
          });
      });
    });

    it('should error with a corrupt PDF', () => {
      const pdfPath = path.resolve(__dirname, 'fixtures/corrupt.pdf');
      return expect(pdf.measure(pdfPath)).to.be.rejectedWith(Error);
    });

    it('should error with a PDF with no pages', () => {
      const pdfPath = path.resolve(__dirname, 'fixtures/no_pages.pdf');
      return expect(pdf.measure(pdfPath)).to.be.rejectedWith(Error);
    });

    it('should identify an encrypted PDF', () => {
      const pdfPath = path.resolve(__dirname, 'fixtures/encrypted.pdf');
      return pdf.measure(pdfPath)
        .then((result) => {
          expect(result.encrypted).to.be.true;
        });
    });

  });

});
