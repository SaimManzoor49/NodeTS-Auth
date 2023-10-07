import { createUser, getUserByEmail } from "Models/users"
import express from "express"
import { random,authentication } from "helpers"


export const register = async(req:express.Request,res:express.Response)=>{

    try{

        const {email,password,username} = req.body
        if(!email.length||!password.length||!username.length){
            return res.status(400).json({
                message:'provide data correctly'
            })
        }
        const isUserExist = await getUserByEmail(email)
        
        if(isUserExist){
            return res.status(400).json({
                message:'user already registered'
            })
        }

        const salt  = random()

        const user = await createUser({
            email,username,authentication:{salt,password:authentication(salt,password)}
        })

        if(user){

            return res.status(200).json({
                message:'user created',
                data:user
            })
        }

    }catch(err){
        console.log(""+err)
        return res.status(400).json({message:'something went wrong'})
    }

}



