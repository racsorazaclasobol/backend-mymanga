import jwt from 'jsonwebtoken';

const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

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