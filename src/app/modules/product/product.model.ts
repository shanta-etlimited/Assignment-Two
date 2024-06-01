import {Schema, model} from "mongoose";
import {
    ProductMethods,
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from "./product.interface";

const variantsSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  value: {
    type: String,
    required: [true, "Value is required"],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "Stock status is required"],
  },
});
const productSchema = new Schema<TProduct, ProductModel, ProductMethods>(
  {
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
  },
);


//query middleware
productSchema.pre("find", async function (next) {
  this.find({ isDeleted: {$ne: true} });
  next();
});

productSchema.pre("findOne", async function (next) {
  this.findOne({ isDeleted: {$ne: true} });
  next();
});
productSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: {$ne: true} } });
  next();
});




productSchema.methods.isProductExists = async function (name: string) {
    const existingUser = await Product.findOne({ name });
    return existingUser;
}

export const Product = model<TProduct, ProductModel>("Product", productSchema)
