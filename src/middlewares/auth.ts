import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["authorization"]
        const key = process.env.JWT_KEY
        if (!token) {
                res.status(400).json({
                        msg: "invnlid tokeb"
                })
                return
        }
        if (!key) {
                throw new Error("JWT_KEY is not defined in environment variables");
        }
        try {
                jwt.verify(token, key); // now safe
                const decoded = jwt.verify(token, key)
                if(!decoded){
                        res.status(400).json({
                                msg:"invalid token auth failed"
                        })
                }
                //@ts-ignore
                req.userID = decoded.id
                next()

        } catch (e) {
                res.status(400).json({e})
        }
}
