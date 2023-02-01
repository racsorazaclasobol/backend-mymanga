import { model, Schema } from 'mongoose'

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es un campo obligatorio' ],
    },
    correo: {
        type: String,
        required: [ true, 'El correo es un campo obligatorio' ],
    },
    password: {
        type: String,
        required: [ true, 'El password es un campo obligatorio' ],
    },
    rol: {
        type: String,
        default: 'USER_ROLE' //[ USER_ROLE, ADMIN_ROLE ] 
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

UsuarioSchema.methods.toJSON = function() {

    const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;

    return usuario;
}

export default model( 'Usuario', UsuarioSchema );