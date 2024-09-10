'use server'
import prismadb from '@/lib/prismadb';
import { Companion, Message } from '@prisma/client';
import React from 'react';
import CopyButton from './ui/CopyButton';

interface ChatMessagesProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
}

const ChatMessages = async ({ companion }: ChatMessagesProps) => {
    const messages = await prismadb.message.findMany({
        where: {
            companionId: companion.id,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    console.log(messages);
    return (
        <div>
            {messages.map((message) => (
                <div key={message.id}> {/* Using message.id for a stable key */}
                    <div className='flex items-center m-2 justify-end'>
                        <div className='p-4 bg-primary/10 rounded-3xl max-w-lg'>{message.user_message}</div>
                    </div>
                    <div className='flex items-center mt-10 justify-start max-w-xl'>
                        <div className='p-4 bg-primary/10 rounded-3xl'>
                            {message.ai_message}
                            <CopyButton message={message.ai_message} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;
