import { Request, Response } from "express";
import User from "../models/user";


export const getLtUsers = async ( req: Request, res: Response ) => {
    const usuarios = await User.findAll();

    res.json( { usuarios } );
}



export const getUser =  async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const usuario = await User.findByPk( id );

    if ( !usuario ) {
        return res.status(404).json( { 
            msg: `No existe usuario con el id ${ id }` } )
    }
    
    res.json( { usuario } );
}



export const createdUser = async ( req: Request, res: Response ) => {
    const { body } = req;

    try {

        const userWithSameDNI = await User.findOne( {
            where: { dni: body.dni }
        } );
        

        if ( userWithSameDNI ) {
            return res.status(400).json( {
                msg: `Ya existe un usuario con DNI: ${ body.dni } con el nombre: ${ userWithSameDNI.name }`
            } )
        }

        //const usuario = User. // new User(body);
        const usuario = await User.create(body);

        res.json( { usuario } );

    } catch ( error ) {
        console.log(error);
        res.status(500).json( { 
            msg: 'Algo falló, comuníquese con soporte' } )
    }

}


export const updatedUser = ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { body } = req;

    res.json( { 
        msg: 'updatedUser',
        id,
        body } )
}




export const deletedUser = ( req: Request, res: Response ) => {
    const { id } = req.params;

    res.json( { 
        msg: 'deletedUser',
        id } )
}