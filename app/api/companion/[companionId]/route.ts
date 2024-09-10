import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: Request, {params}:{params:{companionId:string}})
{
    try {
        const body = await req.json()
        const user = await currentUser()
        const {src, name, description, instruction, categoryId, seed} = body

        if(!user)
        {
            return NextResponse.json({error:"Unauthorized User"}, {status:404})
        }

        if(!params.companionId)
        {
            return NextResponse.json({error:"Companion Id is required"}, {status:300})
        }

        if(!src || !name || !description || !instruction || !categoryId || !seed)
        {
            return NextResponse.json({error:"All fields are required"}, {status:404})
        }
        const companion = await prismadb.companion.update({
            where:{
                id:params.companionId
            },
            data:{
                categoryId,
                userId:user.id,
                userName:user.firstName,
                src,
                name,
                description,
                instructions:instruction,
                seed,
            }
        })
        
        return NextResponse.json(companion)

    } catch (error) {
        console.log('[-]COMPANION PATCH ERROR', error);
        return  NextResponse.json({error:"Error in Patching"}, {status:500})
    }
}

export async function DELETE(req: Request, {params}:{params:{companionId:string}})
{
    try {
        const {userId} = auth()
        if(!userId)
        {
            return NextResponse.json({error:"Unauthorized"}, {status:404})
        }
        const companion = await prismadb.companion.delete({
            where:{
                id:params.companionId,
                userId
            }
        })
        return NextResponse.json({companion}, {status:200})
    } catch (error) {
        console.log('[-]COMPANION DELETE ERROR', error);
        return  NextResponse.json({error:"Error in Deleting"}, {status:500})
    }
}