import ChatHeader from '@/components/Chat-header';
import ChatForm from '@/components/ChatForm';
import ChatMessage from '@/components/ChatMessage';
import { Companion, Message } from '@prisma/client'
import React from 'react'

interface ChatClientProps{
    companion: (Companion & {
        messages: Message[];
        _count:{
            messages: number
        }
    }),

    params:{
      chatId:string
    }
}

const ChatClient = ({companion, params}:ChatClientProps) => {

  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader companion={companion}/>
      <ChatMessage companion={companion}/>
      <ChatForm companion={companion}/>
    </div>
  )
}

export default ChatClient
