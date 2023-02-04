import { request, response } from "express";


const authLogin = ( req = request, res = response ) => {
    
    res.json({ msg: 'authLogin' })

}

export {
    authLogin,
}