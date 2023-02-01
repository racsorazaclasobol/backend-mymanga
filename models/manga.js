import { model, Schema } from 'mongoose'

const MangaSchema = Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es un campo obligatorio' ],
    },
    autor: {
        type: String, 
        required: [ true, 'El autor es un campo obligatorio' ],
    },
    portada: {
        type: String,
        required: [ true, 'La portada es un campo obligatorio' ],
    },
    estado: {
        type: Boolean,
        default: true
    }

});

MangaSchema.methods.toJSON = function() {

    const { __v, _id, ...manga } = this.toObject();

    manga.uid = _id;

    return manga;
}

export default model( 'Manga', MangaSchema );