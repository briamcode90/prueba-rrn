import { DataTypes, Model } from "sequelize";
import db from "../db/connection";


interface UserInstance extends Model {
    idUser: number;
    name: string;
    lastname: string;
    dni: string;
    email: string;
    active: boolean;

}


const User = db.define<UserInstance>('Usuario', {
    idUser: {
        type: DataTypes.INTEGER,
        field: 'id_usuario',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombres'
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'apellidos'
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'flag_activo'
    }
}, {
        schema: 'demo',
        tableName:'tusuario',
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_modificacion'
    });

export default User;