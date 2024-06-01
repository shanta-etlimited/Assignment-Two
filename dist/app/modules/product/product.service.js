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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await ProductModel.create(product); //built in static method
    const product = new product_model_1.Product(productData);
    if (yield product.isProductExists(productData.name)) {
        throw new Error('Product already exists');
    }
    const result = yield product.save(); //built in instance
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id });
    return result;
});
const updateSingleProductFromDB = (_id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.updateOne({ _id }, { $set: updateData });
    return result;
});
const deleteSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.updateOne({ _id }, { isDeleted: true });
    return result;
});
const searchProductsInDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i');
    const result = yield product_model_1.Product.find({
        $and: [
            { isDeleted: { $ne: true } },
            {
                $or: [
                    { name: regex },
                    { description: regex },
                    { category: regex },
                    { tags: regex }
                ]
            }
        ]
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
    searchProductsInDB
};
