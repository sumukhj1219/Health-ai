'use server';

import prismadb from "@/lib/prismadb";

export default async function markTaskAsComplete(id: any) {
  console.log(`Marking task with id: ${id} as complete`);
  
  try {
    await prismadb.tasks.update({
      where: {
        id: id,
      },
      data: {
        Status: true,
      },
    });

    return { success: true, message: 'Task marked as complete' };
  } catch (error) {
    console.error('Failed to complete task:', error);
    
    return { success: false, error: 'Failed to complete task' };
  }
}
