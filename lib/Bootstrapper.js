'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016-present, Deloitte Digital.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-3-Clause license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Habitat = require('./Habitat');

var _Habitat2 = _interopRequireDefault(_Habitat);

var _ReactDomFactory = require('./factories/ReactDomFactory');

var _ReactDomFactory2 = _interopRequireDefault(_ReactDomFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_HABITAT_SELECTOR = 'data-component';

/**
 * Parses a container and populate components
 * @param {object}    factory               The dom factory
 * @param {array}     container             The container
 * @param {array}     elements              The elements to parse
 * @param {string}    componentSelector     The component selector
 * @param cb
 */
function parseContainer(factory, container, elements, componentSelector) {
  var cb = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

  // Iterate over component elements in the dom
  for (var i = 0; i < elements.length; ++i) {
    var ele = elements[i];
    var componentName = ele.getAttribute(componentSelector);
    var component = container.resolve(componentName);

    if (component) {
      factory.inject(component, _Habitat2.default.parseProps(ele), _Habitat2.default.create(ele, factory.identifier()));
    } else {
      console.warn('Cannot resolve component "' + componentName + '"');
    }
  }

  if (typeof cb === 'function') {
    cb.call();
  }
}

/**
 *  Bootstrapper class
 */

var Bootstrapper = function () {

  /**
   * Constructor
   */
  function Bootstrapper() {
    _classCallCheck(this, Bootstrapper);

    // Sanity check
    if (!window || !window && !window.document) {
      throw new Error('ReactBootstrapper requires a DOM but cannot see one :(');
    }

    // Set dom component selector
    this.componentSelector = DEFAULT_HABITAT_SELECTOR;

    // Set dom factory
    this.factory = new _ReactDomFactory2.default();

    // Find all the elements in the dom with the component selector attribute
    this.elements = window.document.body.querySelectorAll('[' + this.componentSelector + ']');
  }

  /**
   * Set the container
   * @param {object}    container   - The container
   * @param {function}  [cb=null]   - Optional callback
   */


  _createClass(Bootstrapper, [{
    key: 'setContainer',
    value: function setContainer(container) {
      var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      // Wire up the components from the container
      parseContainer(this.factory, container, this.elements, this.componentSelector, cb);
    }
  }]);

  return Bootstrapper;
}();

exports.default = Bootstrapper;