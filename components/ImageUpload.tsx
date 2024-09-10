'use client'
import React, { useEffect, useState } from 'react'
import {CldUploadButton, CldUploadWidget} from 'next-cloudinary'

import Image from 'next/image'
interface ImageUploadProps {
    value: string,
    onChange: (src: string) => void,
    disabled?: boolean
}

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
    return (
        <div className='space-y-4 w-full flex flex-col justify-center items-center'>
            <CldUploadWidget
            options={{
                maxFiles:1
            }}
            uploadPreset='f1zlx3rb'
            onSuccess={(results:any)=>(
                onChange(results.info.secure_url)
            )}
            >
            {({open})=>(
                <div className='p-4 border-4 border-dotted border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center' onClick={()=>open()}>
                <div className='relative h-40 w-40'>
                <Image 
                fill
                alt='upload'
                src={value || '/image.png'}
                className='rounded-lg object-cover'
                priority={false}
                />
                </div>
                </div>
            )}
            
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload
