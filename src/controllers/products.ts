import { Product } from "../models/product";
import {Request, Response} from "express"

export const getProducts = async (req:Request, res:Response) => {
     /* res.json({
        msg: "hay productos"
    })  */
    const listProducts = await Product.findAll()
    res.json(listProducts)
}