import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";


// create product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const zodParseData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// get and search product controller
const getAllProductsOrSearch = async (req: Request, res: Response) => {
    try {
      const { searchTerm } = req.query;
  
      if (searchTerm && typeof searchTerm === "string") {
        const result = await ProductServices.searchProductsInDB(searchTerm);
        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No products found matching the search",
          });
        }
        return res.status(200).json({
          success: true,
          message: `Products matching search term ${searchTerm} fetched successfully!`,
          data: result,
        });
      } else {
        const result = await ProductServices.getAllProductsFromDB();
        return res.status(200).json({
          success: true,
          message: "Products fetched successfully!",
          data: result,
        });
      }
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err,
      });
    }
};

  // get single product controller
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// update product controller
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body.product;
    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      updateData
    );
    res.status(200).json({
      success: true,
      message: "Product is updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// delete product controller
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product is deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};



export const ProductControllers = {
  createProduct,
  getAllProductsOrSearch,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
