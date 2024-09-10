import prismadb from "@/lib/prismadb";
import { sendEmail } from "@/utils/mails.utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instruction, categoryId, seed } = body;

        if (!user) {
            return NextResponse.json({ error: "Unauthorized User" }, { status: 404 });
        }

        if (!src || !name || !description || !instruction || !categoryId || !seed) {
            return NextResponse.json({ error: "All fields are required" }, { status: 404 });
        }

        const companion = await prismadb.companion.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions: instruction,
                seed,
            }
        });

        const sender = {
            name: '@Heal.ai',
            address: 'hm44b@belgianairways.com'
        };

        const recievers = [{
            name: user.firstName,
            address: user.emailAddresses[0]?.emailAddress // Assuming emailAddresses is an array
        }];

        // Constructing the HTML message
        const htmlMessage = `
            <html>
                <body>
                    <h1> Welcome to our website, ${user.firstName}!</h1>
                    <p>We are excited to have you on board. Here are some details about your new companion:</p>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Description:</strong> ${description}</li>
                        <li><strong>Instructions:</strong> ${instruction}</li>
                        <li><strong>Category ID:</strong> ${categoryId}</li>
                        <li><strong>Seed:</strong> ${seed}</li>
                    </ul>
                    <p>Thank you for joining us!</p>
                </body>
            </html>
        `;

        await sendEmail({
            sender,
            recievers,
            subject: 'Welcome to our website',
            message: htmlMessage
        });

        return NextResponse.json(companion);

    } catch (error) {
        console.log('[-]COMPANION ERROR', error);
        return NextResponse.json({ error: "Error in Posting" }, { status: 500 });
    }
}
