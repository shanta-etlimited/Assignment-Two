import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProduct);

router.get("/", ProductControllers.getAllProductsOrSearch);

router.get("/:productId", ProductControllers.getSingleProduct);

router.put("/:productId", ProductControllers.updateSingleProduct);

router.delete("/:productId", ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;