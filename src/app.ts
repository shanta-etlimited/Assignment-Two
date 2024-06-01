import cors from "cors";
import express, { Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
const app = express();

//parsers
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!"); 
});



export default app;
