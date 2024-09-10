'use client'
import React, { ChangeEventHandler, useState, FormEvent } from 'react'
import { Input } from './ui/input'
import { SendHorizonal } from 'lucide-react'
import { Button } from './ui/button'
import axios from 'axios'
import { Companion, Message } from '@prisma/client'

interface ChatFormProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        }
    }
}
const ChatForm = ({ companion }: ChatFormProps) => {
  
    const [value, setValue] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`/api/chat/${companion.id}`, {value});
            setValue(""); // Clear the input after sending the message
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='border-t border-primary/10 py-4 flex items-center gap-x-2'>
            <Input
                placeholder='Type a message'
                className='bg-primary/10'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button variant={'ghost'} type='submit'>
                <SendHorizonal className='h-6 w-6' />
            </Button>
        </form>
    )
}

export default ChatForm
