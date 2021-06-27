import { Request, Response, NextFunction } from 'express'
import { JsonWebTokenError, verify } from 'jsonwebtoken'


interface IPayload {
    sub: string
}

export function ensureAuthenticate(
    request: Request, 
    response: Response, 
    next: NextFunction
) {

    //receber o token
    const authToken = request.headers.authorization

    //validar se token está preenchido
    if(!authToken) {
        return response.status(401).end()
    }    

    const [, token] = authToken.split(" ")
    
    //validar se token é válido
    try {
        const { sub } = verify(
            token, 
            '58e1c3c9f25de9e4388dced4450e8c69'
        ) as IPayload
        
        //recuperar informações do usuário
        request.user_id = sub


        return next()
    } catch(err) {
        return response.status(401).end()
    }

    

}
