'use client'
import React from 'react';
import { Button } from './button';
import { Copy } from 'lucide-react'; 

interface CopyButtonProps {
    message: string; 
}

const CopyButton = ({ message }: CopyButtonProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(message).then(() => {
            alert('AI message copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className='mt-2'>
            <Button size='sm'  onClick={handleCopy} variant={'ghost'}>
                <Copy className='w-3 h-3' />
            </Button>
        </div>
    );
};

export default CopyButton;
