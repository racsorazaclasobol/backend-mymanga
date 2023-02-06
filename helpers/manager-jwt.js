import jwt from 'jsonwebtoken';

const generarJWT = ( uid = '', nombre = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, nombre };

        jwt.sign( payload, process.env.SECRETPRIVATEKEY, {

            expiresIn: '4h'

        }, ( error, token ) => {

            if( error ){
                console.log(error);
                reject( 'Error al generar el Token' )
            }else{
                resolve( token )
            }
            
        } )

    } );    

}


export { generarJWT }