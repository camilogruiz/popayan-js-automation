/**
 * Main module for POPAYANJS
 * @type {Object}
 * @namespace POPAYANJS
 * @author Alejandro Nanez Ortiz <alejonanez@gmail.com>
 */

var POPAYANJS = POPAYANJS || {};

POPAYANJS.Counter = function (options) {
    'use strict';

    this.count = 0;
    this.buttonElement = options.buttonElement;
    this.labelElement = options.labelElement;
};

POPAYANJS.Counter.prototype.add = function () {
    'use strict';
    this.count = this.count + 1;
};

POPAYANJS.Counter.prototype.clicking = function () {
    'use strict';
    this.add();
    this.setLabelText(this.count);
};

POPAYANJS.Counter.prototype.startListeners = function () {
    'use strict';
    this.buttonElement.addEventListener('click', this.clicking.bind(this));
};

POPAYANJS.Counter.prototype.setLabelText = function (newValue) {
    'use strict';
    this.labelElement.textContent = newValue;
};
