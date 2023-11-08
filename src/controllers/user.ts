import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    // Validamos si el usuario ya existe en la DB
    const user = await User.findOne({ where: { username: username } });

    if(user) {
       return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    } 
 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        // Guarda usuario en la DB
        await User.create({
            username: username,
            password: hashedPassword
        })
    
        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

   // Validamos si el usuario existe 
   const user: any = await User.findOne({ where: { username: username } });

   if(!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        })
   }

   // Validamos password
   const passwordValid = await bcrypt.compare(password, user.password)
   if(!passwordValid) {
    return res.status(400).json({
        msg: `Password Incorrecta`
    })
   }

   // Genera token
   const token = jwt.sign({
    username: username
   }, process.env.SECRET || "admin")
   res.json(token)
}

//trae todos los usuarios
export const getUsers = async (req:Request, res: Response) => {
    const users = await User.findAll()
    return res.status(200).json(users)
}