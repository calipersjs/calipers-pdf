'use strict';

const PopplerDocument = require('poppler-simple').PopplerDocument;
const utils           = require('./utils');

exports.detect = function (buffer) {
  return utils.ascii(buffer, 0, 4) === '%PDF';
};

exports.measure = async function (path) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PopplerDocument(path);

      if (doc.pageCount < 1) {
        return reject(new Error('Invalid PDF'));
      }

      const result = {
        type: 'pdf',
        encrypted: doc.isEncrypted,
        pages: []
      };

      for (let i = 1; i <= doc.pageCount; i++) {
        const page = doc.getPage(i);
        result.pages.push({
          width: page.width,
          height: page.height
        });
      }

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
