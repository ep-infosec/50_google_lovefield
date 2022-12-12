/**
 * @license
 * Copyright 2014 The Lovefield Project Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Lovefield exceptions store only error code to reduce
 * distributed binary size. See dist/error_code.json for actual error messages.
 */
goog.provide('lf.Exception');

goog.require('lf.Flags');



/**
 * @param {number} code
 * @param {...(string|number|undefined)} var_args
 * @constructor
 * @extends {Error}
 * @struct
 * @final
 */
lf.Exception = function(code, var_args) {
  /** @type {number} */
  this.code = code;

  /** @type {string} */
  this.message = lf.Flags.EXCEPTION_URL + code;

  if (arguments.length > 1) {
    // Allow at most 4 parameters, each parameter at most 64 chars.
    for (var i = 1; i <= Math.min(4, arguments.length - 1); ++i) {
      var arg = String(arguments[i]).slice(0, 64);
      if (lf.Flags.EXCEPTION_URL.length > 0) {
        this.message += '&p' + (i - 1) + '=' + encodeURIComponent(arg);
      } else {
        this.message += '|' + arg;
      }
    }
  }
};
goog.inherits(lf.Exception, Error);
