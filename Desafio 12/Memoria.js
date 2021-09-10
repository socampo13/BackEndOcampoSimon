"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memoria = void 0;
var Memoria = /** @class */ (function () {
    function Memoria() {
        this.productos = [];
        this.count = 0;
    }
    Memoria.deleteById = function (id) {
        throw new Error('Method not implemented.');
    };
    Memoria.prototype.getArray = function () {
        return this.productos;
    };
    Memoria.prototype.getElementById = function (id) {
        var result = this.productos.filter(function (el) { return el.id == id; });
        return result;
    };
    Memoria.prototype.addElement = function (element) {
        this.productos.push(__assign(__assign({}, element), { id: this.count + 1 }));
        this.count++;
        return element;
    };
    Memoria.prototype.updateElement = function (element) {
        this.array[element] = element;
    };
    Memoria.prototype.deleteById = function () {
        var deleteProduct = this.productos.findIndex(function (element) { return element.id == element; });
        this.productos.splice(deleteProduct, 1);
    };
    return Memoria;
}());
exports.Memoria = Memoria;
