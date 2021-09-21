"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(id, timestamp, name, description, code, thumbnail, price) {
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
    }
    return Product;
}());
exports.Product = Product;
