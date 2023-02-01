import { model, Schema } from 'mongoose'

const ChapterSchema = Schema({

    titulo: {
        type: String,
        required: [ true, 'El titulo es un campo obligatorio' ],
    },
    capitulo:{ 
        type: Number,
        required: true,
        unique: true
    },
    paginas: {
        type: [{
            pagina: Number,
            tipo: String,
            url: String,
        }],
        required: [ true, 'Las páginas son un campo obligatorio' ],
    },
    estado: {
        type: Boolean,
        default: true
    },
    manga: {
        type: Schema.Types.ObjectId,
        ref: 'Manga',
        required: true
    }

});

ChapterSchema.methods.toJSON = function() {

    const { __v, _id, ...chapter } = this.toObject();

    chapter.uid = _id;

    return chapter;
}

export default model( 'Chapter', ChapterSchema );