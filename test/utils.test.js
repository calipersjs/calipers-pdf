'use strict';

const expect = require('chai').expect;
const utils  = require('../lib/utils');

describe('utils', () => {

  describe('ascii', () => {

    it('should return the correct string', () => {
      const string = 'Test String%!@#\n';
      const buffer = Buffer.from(string);
      const result = utils.ascii(buffer, 0, string.length);
      return expect(result).to.eql(string);
    });

  });

});
