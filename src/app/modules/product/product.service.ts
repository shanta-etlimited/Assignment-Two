import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
    // const result = await ProductModel.create(product); //built in static method
    const product = new Product(productData);
    if(await product.isProductExists(productData.name)){
        throw new Error('Product already exists');
    }
    const result = await product.save(); //built in instance
    return result;
}

const getAllProductsFromDB = async () => {
    const result = await Product.find();
    return result;
}

const getSingleProductFromDB = async (_id: string) => {
    const result = await Product.findOne({_id});
    return result;
}

const updateSingleProductFromDB = async (_id: string, updateData: Partial<TProduct>) => {
    const result = await Product.updateOne({ _id }, { $set: updateData });
    return result;
}

const deleteSingleProductFromDB = async(_id: string)=>{
    const result = await Product.updateOne({_id}, {isDeleted: true});
    return result
}

const searchProductsInDB = async (searchTerm: string) => {
    const regex = new RegExp(searchTerm, 'i');
    const result = await Product.find({
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
}


export const ProductServices ={
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
    searchProductsInDB
}