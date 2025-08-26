import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";


export async function POST(request: NextRequest){
    try{
        const { email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json({error: "Email and password are required"}, {status: 400});
        }

        await connectToDatabase();

        const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const newUser = await User.create({email, password});
        console.log(newUser);
        return NextResponse.json({message: "User created successfully"}, {status: 201});


    }catch(error){

        console.error("Error in user registration:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});

    }
}