import Chapter  from '../../models/Chapter.js';
import Manga    from '../../models/Manga.js';
import Role     from '../../models/role.js';
import Usuario  from '../../models/usuario.js';

/******************************************/
/************** USUARIOS ******************/
/******************************************/
const IsUsuarioValid = async( uid = '' ) => {

    const query = { uid, estado: true };

    const usuario = await Usuario.exists( query );

    if( !usuario ) throw new Error( `El Usuario ingresado no existe.` )

}

const IsRoleValid = async( rol = '' ) => {

    const query = { rol };

    const role = await Role.exists( query );

    if( !role ) throw new Error( `El Rol ingresado no existe.` )

}


/******************************************/
/************** CHAPTERS ******************/
/******************************************/

const isChapterValid = async( uid = '' ) => {

    const query = { uid, estado: true };

    const chapter = await Chapter.exists( query );

    if( !chapter ) throw new Error( `El chapter ingresado no existe.` )

}

/******************************************/
/*************** MANGAS *******************/
/******************************************/

const isMangaValid = async( uid = '' ) => {

    const query = { uid, estado: true };

    const manga = await Manga.exists( query );

    if( !manga ) throw new Error( `El manga ingresado no existe.` )

}


export { 
    isChapterValid,
    isMangaValid,
    IsUsuarioValid,
    IsRoleValid,
}