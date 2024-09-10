'use client';
import React from 'react';
import handleComplete from './handleComplete';
import { Button } from '@/components/ui/button';

const HandleButton = ({ id }:any) => {
  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); 

    try {
      const result = await handleComplete(id);
      if (result.success) {
        console.log('Task completed successfully');
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <Button variant={'outline'} onClick={handleClick}>
      Done
    </Button>
  );
};

export default HandleButton;
