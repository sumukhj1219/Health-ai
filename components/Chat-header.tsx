'use client'
import { Companion, Message } from '@prisma/client'
import React from 'react'
import ChatAvatar from './ChatAvatar';
import { Edit, MessageSquare, MoreVertical, Trash } from 'lucide-react';
import { useAuth, useUser } from '@clerk/nextjs';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import { DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ChatHeaderProps{
    companion: (Companion & {
        messages: Message[];
        _count:{
            messages: number
        }
    })
}

const ChatHeader = ({companion}:ChatHeaderProps) => {
  const router = useRouter()
  const {userId} = useAuth()
  
  const onDelete=async()=>{
    try {
        await axios.delete(`/api/companion/${companion.id}`)
    } catch (error) {
        console.log('Error', error)
    }
    router.refresh()
    router.push('/')
  }

  return (
    <div className='flex w-full justify-between items-center border-b border-primary/10 pb-4'>
        <div className='flex gap-x-2 items-center'>
        <ChatAvatar src={companion.src} />
        <div className='flex flex-col gap-y-1'>
        <div className='flex items-center gap-x-2'>
        <p className='font-bold'>{companion.name}</p>
        <div className='flex items-center text-xs text-muted-foreground'>
        <MessageSquare className='w-3 h-3 mr-1'/>
        {companion._count.messages}
        </div>
        </div>
        <p className='text-xs text-muted-foreground'>
        {companion.userName}
        </p>
        </div>
        </div>
        { companion.userId && 
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'secondary'}>
                        <MoreVertical/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={()=>(router.push(`/companion/${companion.id}`))}>
                        <Edit className='w-3 h-3 mr-2' />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash className='w-3 h-3 mr-2'  />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        }
    </div>
  )
}

export default ChatHeader
