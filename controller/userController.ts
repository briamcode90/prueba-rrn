import { Request, Response } from "express";
import User from "../models/user";


export const getLtUsers = async ( req: Request, res: Response ) => {
    
    try {

        const usuarios = await User.findAll( {
            where: { active: true }
        } )

        res.json( { usuarios } );

    } catch (error) {
        console.log(error);
        return res.status(500).json( { msg: 'Algo falló, comuníquese con soporte' } );
    }

    
}



export const getUser =  async ( req: Request, res: Response ) => {
    const { id } = req.params;
    
    try {

        const usuario = await User.findByPk( id );
        if ( !usuario ) {
            return res.status(404).json( { 
                msg: `No existe usuario con el id ${id}` } )
        }

        return res.json( { usuario } );

    } catch (error) {
        console.log(error);
        return res.status(500).json( { msg: 'Algo falló, comuníquese con soporte' } );
    }
    
    
}



export const createdUser = async ( req: Request, res: Response ) => {
    const { body } = req;
    const { nombres, apellidos, correo, dni } = body;

    try {

        if ( !nombres || !apellidos || !dni ) {
            return res.status(400).json( { 
                msg: `Los campos ${!nombres ? '[nombres]' : ''} ${!apellidos ? '[apellidos]' : ''} ${!dni ? '[dni]' : ''} son obligatorios` 
            } );
        }

        const userWithSameDNI = await User.findOne( {
            where: { dni }
        } );

        if ( userWithSameDNI ) {
            return res.status(400).json( {
                msg: `Ya existe un usuario con DNI: ${dni} con el nombre: ${ userWithSameDNI.name }`
            } )
        }

        const usuario = await User.create( {
            name: nombres,
            lastname: apellidos,
            email: correo,
            dni
        } );

        res.json( { usuario } );

    } catch ( error ) {
        console.log(error);
        return res.status(500).json( { msg: 'Algo falló, comuníquese con soporte' } );
    }

}




export const updatedUser =  async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { body } = req;
    const { nombres, apellidos, correo } = body;

    try {

        let userUpdt = await User.findByPk( id );
        if ( !userUpdt ) {
            return res.status(404).json( { 
                msg: `No existe usuario con el id ${id}` } )
        }

        await User.update( { 
                name: nombres ? nombres : userUpdt.name,
                lastname: apellidos ? apellidos : userUpdt.lastname,
                email: correo ? correo : userUpdt.email
            }, { 
                where: {
                    idUser: id } 
            } 
        );

        userUpdt = await User.findByPk( id );

        return res.json( { usuario: userUpdt } );
 
    } catch (error) {
        console.log(error);
        return res.status(500).json( { msg: 'Algo falló, comuníquese con soporte' } );
    }

}




export const deletedUser =  async ( req: Request, res: Response ) => {
    const { id } = req.params;

    try {

        let userDlt = await User.findByPk( id );
        if ( !userDlt ) {
            return res.status(404).json( { 
                msg: `No existe usuario con el id ${ id }` } )
        }

        if ( userDlt && !userDlt.active ) {
            return res.status(400).json( { 
                msg: `El usuario ${userDlt.name} ${userDlt.lastname} ya ha sido eliminado anteriormente.` } );
        }

        await User.update( { 
                active: false
            }, { 
                where: {
                    idUser: id } 
            } 
        );

        return res.json( { msg: `Se eliminó al usuario ${userDlt.name} ${userDlt.lastname} correctamente.` } );
 
    } catch (error) {
        console.log(error);
        res.status(500).json( { msg: 'Algo falló, comuníquese con soporte' } );
    }
}