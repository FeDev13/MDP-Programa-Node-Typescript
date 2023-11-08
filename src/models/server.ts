import express, { Application } from "express"
import { Product } from "./product"
import { User } from "./user"
import routesProduct from "../routes/product"
import routesUser from "../routes/user"

class Server {
    private app: Application
    private port: string

    constructor(){
        this.app = express()
        this.port = process.env.PORT || "3001"
        this.listen()
        this.dbConnection() 
        this.middleware() //simpre va antes de las rutas
        this.routes()
       
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log("servidor corriendo por el puerto" + this.port);
            
        })
    }

    routes() {
        this.app.use("/api/products", routesProduct)
        this.app.use("/api/users", routesUser)
    }

    middleware() {
        this.app.use(express.json())
    }

    async dbConnection(){
        try {
            await Product.sync()
            await User.sync()
        } catch (error) {
            console.error("error", error);
            
        }
    }
}

export default Server