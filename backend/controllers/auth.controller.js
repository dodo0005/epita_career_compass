import prisma from "../config/prisma.js";
import {
    hashPassword,
    comparePassword
} from "../utils/password.js";

import {
    generateToken
} from "../utils/jwt.js";



export async function register(req,res){

    try{

        const {
            email,
            password
        } = req.body;


        if(!email || !password){

            return res.status(400).json({
                error:"Email and password required"
            });

        }


        const existingUser =
            await prisma.user.findUnique({
                where:{
                    email
                }
            });


        if(existingUser){

            return res.status(409).json({
                error:"User already exists"
            });

        }


        const hashedPassword =
            await hashPassword(password);


        const user =
            await prisma.user.create({

                data:{
                    email,
                    password:hashedPassword
                }

            });


        const token =
            generateToken(user.id);


        res.json({

            token,

            user:{
                id:user.id,
                email:user.email
            }

        });


    }catch(error){

        console.error(error);

        res.status(500).json({
            error:"Registration failed"
        });

    }

}




export async function login(req,res){

    try{

        const {
            email,
            password
        } = req.body;


        const user =
            await prisma.user.findUnique({
                where:{
                    email
                }
            });


        if(!user){

            return res.status(401).json({
                error:"Invalid credentials"
            });

        }


        const valid =
            await comparePassword(
                password,
                user.password
            );


        if(!valid){

            return res.status(401).json({
                error:"Invalid credentials"
            });

        }


        const token =
            generateToken(user.id);


        res.json({

            token,

            user:{
                id:user.id,
                email:user.email
            }

        });


    }catch(error){

        console.error(error);

        res.status(500).json({
            error:"Login failed"
        });

    }

}