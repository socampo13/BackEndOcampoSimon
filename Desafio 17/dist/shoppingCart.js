"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = void 0;
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.cart = Array();
        this.id = ShoppingCart.counter;
        ShoppingCart.counter++;
        this.timestamp = Date.now();
    }
    ShoppingCart.prototype.getId = function () {
        return this.id;
    };
    ShoppingCart.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    ShoppingCart.prototype.getProducts = function () {
        return this.cart;
    };
    ShoppingCart.prototype.getProductoById = function (id) {
        var producto = this.cart.find(function (element) { return element.id === Number(id); });
        return producto;
    };
    ShoppingCart.prototype.addProducto = function (product) {
        this.cart.push(product);
    };
    ShoppingCart.prototype.deleteProducto = function (id) {
        var index = this.cart.findIndex(function (element) { return element.id === Number(id); });
        this.cart.splice(index, 1);
    };
    ShoppingCart.counter = 1;
    return ShoppingCart;
}());
exports.ShoppingCart = ShoppingCart;
