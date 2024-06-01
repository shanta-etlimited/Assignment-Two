"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variantsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "Type is required"],
    },
    value: {
        type: String,
        required: [true, "Value is required"],
    },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    inStock: {
        type: Boolean,
        required: [true, "Stock status is required"],
    },
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    tags: {
        type: [String],
        required: [true, "Tags are required"],
    },
    variants: {
        type: [variantsSchema],
        required: [true, "Variants are required"],
    },
    inventory: {
        type: inventorySchema,
        required: [true, "Inventory is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
//query middleware
productSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
productSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.findOne({ isDeleted: { $ne: true } });
        next();
    });
});
productSchema.pre("aggregate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
        next();
    });
});
productSchema.methods.isProductExists = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Product.findOne({ name });
        return existingUser;
    });
};
exports.Product = (0, mongoose_1.model)("Product", productSchema);
