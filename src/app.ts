import cors from "cors";
import express, { Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { OrderRoutes } from "./app/modules/order/order.route";
const app = express();

//parsers
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my assignment two server"); 
});
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
