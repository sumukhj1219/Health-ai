import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <Navbar />
            <div className='hidden md:flex fixed mt-16 w-20 flex-col inset-y-0'>
            <Sidebar />
            </div>
            <main className='md:pl-20 pt-16 h-full'>
                {children}
            </main>
        </div>

    )
}

export default RootLayout
