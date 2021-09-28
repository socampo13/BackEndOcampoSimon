"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var Cart = /** @class */ (function () {
    function Cart() {
        this.cart = [];
    }
    Cart.prototype.getCart = function () {
        return this.cart;
    };
    Cart.prototype.getElementByIdCart = function (id) {
        var result = this.cart.find(function (element) { return element.id === Number(id); });
        return result;
    };
    Cart.prototype.addElementToCart = function (object) {
        this.cart.push(object);
        return object;
    };
    Cart.prototype.updateObject = function (newProduct, id) {
        var index = this.cart.findIndex(function (element) { return element.id === Number(id); });
        this.cart[index] = newProduct;
    };
    Cart.prototype.deleteObject = function (id) {
        var index = this.cart.findIndex(function (element) { return element.id === Number(id); });
        this.cart.splice(index, 1);
    };
    return Cart;
}());
exports.Cart = Cart;
