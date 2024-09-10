import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatClient from './components/Client'

interface ChatPageProps{
    params:{
        chatId: string
    }
}

const ChatPage = async({params}: ChatPageProps) => {
  const {userId} = auth()
    if(!userId)
    {
        return redirect('/sign-in')
    }

    const companion = await prismadb.companion.findUnique({
        where:{
            id: params.chatId
        },
        include:{
            messages:{
                orderBy:{
                    createdAt:'asc'
                },
                where:{
                    userId
                }
            },
            _count:{
                select:{
                    messages: true
                }
            }
        }
    })

    if(!companion)
    {
        return redirect('/')
    }
  return (
    <div>
      <ChatClient companion={companion} params={params} />
    </div>
  )
}

export default ChatPage
