import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { chatId: string } }) {
  const body = await req.json();
  const { value } = body;
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!value) {
    return NextResponse.json({ error: "No input provided" }, { status: 400 }); // Using 400 for bad request
  }

  const apiKey = process.env.GEMINI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  try {
    const companion = await prismadb.companion.findUnique({
      where: {
        id: params.chatId,
      },
      include: {
        messages: {
          where: {
            userId: userId,
          },
        },
      },
    });

    if (!companion) {
      return NextResponse.json({ error: "No companion found to chat" }, { status: 404 });
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: companion.instructions }]
        },
      ],
    });

    const result = await chatSession.sendMessage(value);

    const responseText = await result.response.text(); 

    if (!responseText) {
      return NextResponse.json({ error: "No response available" }, { status: 500 });
    }

    await prismadb.message.create({
      data: {
        role: "user", 
        content: responseText,
        ai_message: responseText,
        user_message: value,
        companionId: params.chatId,
        userId: userId,
      },
    });
    return NextResponse.json({ response: responseText }, { status: 200 });
  } catch (error) {
    console.error("Error occurred during the AI chat session:", error);
    return NextResponse.json({ error: "Error in generating AI response" }, { status: 500 });
  }
}
