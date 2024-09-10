import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'

interface ChatAvatarProps{
    src: string | null
}

const ChatAvatar = ({src}:ChatAvatarProps) => {
  return (
    <Avatar className='h-12 w-12'>
      <AvatarImage src={src} />
    </Avatar>
  )
}

export default ChatAvatar
