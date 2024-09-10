'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import prismadb from "@/lib/prismadb";
import schedule from 'node-schedule'

const GenerateTasks = async () => {
    const apiKey = process.env.GEMINI_API_KEY as string;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const n = 5;

    const topics = [
        'Body',
        'Cardio',
        'Muscles',
        'Skin',
        'Brain'
    ];

    try {
        for (let i = 0; i < n; i++) {
            const name_prompt = `Generate a one line dont use multiple lines also dont use any special characters task for a daily task related to ${topics[i]} fitness.`;
            const taskResponse: any = await model.generateContent(name_prompt);

            const taskText = taskResponse.response.text();

            await prismadb.taskCategory.update({
                where: {
                    name: `${topics[i]}`,
                },
                data: {
                    tasks: {
                        create: {
                            task_name: taskText,
                            Status: false,
                            
                        }
                    }
                }
            });

            console.log(`Task ${i + 1}: ${taskText}`);
        }
    } catch (error) {
        console.error("Error generating or saving tasks:", error);
    }
};

export default GenerateTasks