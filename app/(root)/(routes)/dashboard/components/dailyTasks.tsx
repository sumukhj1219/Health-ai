import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GenerateTasks from "../action-ai/generate-tasks";
import schedule from 'node-schedule';
import prismadb from "@/lib/prismadb";
import HandleButton from "../action-ai/HandleButton";
import Image from "next/image";

export default async function DailyTasksComponent() {
  
  schedule.scheduleJob('*/5 * * * *', async () => {
    try {
      // await GenerateTasks();
    } catch (error) {
      console.error('Failed to generate tasks:', error);
    }
  });

  const tasks = await prismadb.tasks.findMany({
    where: { Status: false },
  }).catch(error => {
    console.error('Failed to fetch tasks:', error);
    return [];
  });

  return (
    <Card className="max-w-3xl">
      <CardHeader className="px-7">
        {
          tasks.length > 0 ? (
            <>
             <CardTitle>Daily Tasks</CardTitle>
             <CardDescription>Complete daily tasks to increase your streak.</CardDescription>
            </>
           
          ) :(
            <>
             <CardTitle>No Tasks Available</CardTitle>
             <CardDescription>Come back again tomorrow!</CardDescription>
            </>
          )
        }
        
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow className="bg-accent max-w-lg" key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.task_name}</div>
                  </TableCell>
                  <TableCell>
                    <HandleButton id={task.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow  className="hover:bg-transparent ">
                <TableCell className="flex items-center justify-center">
                  <div className="flex-col justify-center items-center mx-auto">
                    <Image
                      src={'/notasks.png'}
                      alt={"No Tasks"}
                      className="grayscale"
                      width={200}
                      height={200}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
