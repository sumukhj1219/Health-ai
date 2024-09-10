'use client'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16'>
      <div className='flex items-center'>
        <Menu className='block md:hidden' />
        <Link href={'/'}>
        <h1 className='md:block hidden text-xl md:text-3xl text-primary font-extrabold'>
        HEAL.AI
        </h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-3'>
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
