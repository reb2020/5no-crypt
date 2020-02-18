"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var stringToHex_1 = tslib_1.__importDefault(require("./lib/stringToHex"));
var hexToString_1 = tslib_1.__importDefault(require("./lib/hexToString"));
var encode_1 = tslib_1.__importDefault(require("./lib/encode"));
var decode_1 = tslib_1.__importDefault(require("./lib/decode"));
var Crypt = /** @class */ (function () {
    function Crypt(text, salt) {
        if (salt === void 0) { salt = ''; }
        this.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.ord = {};
        this.chr = {};
        this.keys = {};
        this.keysReverse = {};
        this.text = text;
        this.salt = salt;
        if (salt) {
            this.salt = Buffer.from(salt).toString('base64').replace(/[^a-zA-Z0-9]+/g, '');
            var newStr = {};
            var index_1 = 0;
            for (var _i = 0, _a = this.salt.split(''); _i < _a.length; _i++) {
                var key = _a[_i];
                newStr[key] = index_1;
                index_1++;
            }
            for (var _b = 0, _c = this.keyStr.split(''); _b < _c.length; _b++) {
                var key = _c[_b];
                newStr[key] = index_1;
                index_1++;
            }
            this.keyStr = Object.keys(newStr).join('');
        }
        var index = 0;
        for (var _d = 0, _e = this.keyStr.split(''); _d < _e.length; _d++) {
            var key = _e[_d];
            this.keys[index] = key;
            this.keysReverse[key] = index;
            index++;
        }
    }
    Crypt.prototype.init = function (startIndex) {
        var index = startIndex;
        for (var _i = 0, _a = this.keyStr.split(''); _i < _a.length; _i++) {
            var key = _a[_i];
            this.ord[key] = index;
            this.chr[index] = key;
            index++;
        }
    };
    Crypt.prototype.stringToOrd = function (text) {
        var newStr = [];
        for (var _i = 0, _a = text.split(''); _i < _a.length; _i++) {
            var key = _a[_i];
            newStr.push(this.ord[key]);
        }
        return newStr;
    };
    Crypt.prototype.stringToChr = function (text) {
        var newStr = [];
        var tArray = text.split('');
        for (var i = 0; i < tArray.length; i = i + 2) {
            newStr.push(this.chr[tArray[i] + tArray[i + 1]]);
        }
        return newStr;
    };
    Crypt.prototype.encrypt = function () {
        var _this = this;
        var index = Math.floor(10 + Math.random() * 16);
        this.init(index);
        var newStr = this.stringToOrd(stringToHex_1.default(this.text));
        var step = 3;
        var strLen = newStr.length;
        var result = newStr.reduce(function (data, current) {
            data.data.push(current);
            data.index++;
            if ((data.index % step) === 0 || strLen === data.index) {
                data.allData.push(data.data);
                data.data = [];
            }
            return data;
        }, {
            index: 0,
            data: [],
            allData: [],
        });
        var newText = result.allData.map(function (block) { return encode_1.default(block.join(''), _this.keys); }).join('');
        return "" + this.keys[index] + newText;
    };
    Crypt.prototype.decrypt = function () {
        var _this = this;
        var index = this.keysReverse[this.text.substr(0, 1)];
        this.init(index);
        var step = 4;
        var bHash = this.text.substr(1, this.text.length - 1).replace('_', '');
        var b = 0;
        var result = bHash.split('').reduce(function (data, current) {
            data.data[b] = "" + (data.data[b] ? data.data[b] : '') + current;
            data.index++;
            if ((data.index % step) === 0) {
                b++;
            }
            return data;
        }, {
            index: 0,
            data: [],
            allData: [],
        });
        var newText = result.data.map(function (part) { return decode_1.default(part, _this.keysReverse); }).join('');
        var hex = this.stringToChr(newText);
        return hexToString_1.default(hex.join(''));
    };
    return Crypt;
}());
module.exports = function (text, salt) {
    if (salt === void 0) { salt = ''; }
    return new Crypt(text, salt);
};
