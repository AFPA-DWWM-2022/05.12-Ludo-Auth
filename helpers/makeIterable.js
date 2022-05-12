/*
 * asIterable.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

module.exports = {
  makeIterable: (o) => {
    o[Symbol.iterator] = function* () {
      for (const key of Object.keys(o).sort()) yield [key, o[key]];
    };

    return o;
  },
};
