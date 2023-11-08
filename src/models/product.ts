import sequelize from "../db/connect";
import {DataTypes} from "sequelize"

export const Product = sequelize.define("product", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    }
})