import React from 'react';
import { Companion, Message } from '@prisma/client';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm'; // Import the ChatForm component

interface ChatMessageProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
}

const ChatMessage = ({ companion }: ChatMessageProps) => {
    return (
        <div className="flex flex-col relative min-h-screen">
            <div className="flex-1 overflow-y-auto pr-4">
                <ChatMessages companion={companion}/>
            </div>
        </div>
    );
};

export default ChatMessage;
