'use client'
import ImageUpload from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Companion } from '@prisma/client'
import { Wand } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

interface ComapnionFormProps{
    initialData : Companion | null,
    categories : Category[]
}
const formSchema = z.object({
    name:z.string().min(1,{
        message:'Name is required',
    }),
    description:z.string().min(1,{
        message:'Description is required'
    }),
    instruction:z.string().min(100,{
        message:'Instructions are required atleast 100 characters'
    }),
    seed:z.string().min(100,{
        message:'Seed required atleast 100 characters'
    }),
    src:z.string().min(1,{
        message:'Image is required'
    }),
    categoryId:z.string().min(1,{
        message:'Category is required'
    })
})

const CompanionForm = ({initialData, categories}:ComapnionFormProps) => {
const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: initialData || {
        name:"",
        description:"",
        instruction:"",
        seed:"",
        src:"",
        categoryId:""
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit=async(value: z.infer<typeof formSchema>)=>{
        try {
            if(initialData)
            {
                await axios.patch(`/api/companion/${initialData.id}`, value)
            }
            await axios.post('/api/companion', value)
        } catch (error) {
            console.log('Something went wrong', error);
        }
        router.refresh()
        router.push('/')
  }
  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
            <div className='space-y-2 w-full '>
                <div>
                <h3 className='text-lg font-medium'>
                    General Information
                </h3>
                <p className='text-sm text-muted-foreground'>
                General Information About Your Companion
                </p>
                </div>
                <Separator className='bg-primary/10' />
            </div>
            <FormField
            name='src'
            render={({field})=>(
                <FormItem className='flex flex-col items-center justify-center space-y-4'>
                    <FormControl>
                        <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField 
            name='name'
            control={form.control}
            render={({field})=>(
                <FormItem className='col-span-2 md:col-span-1'>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                        disabled={isLoading}
                        placeholder='Sachin Tendulkar'
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
              <FormField 
            name='description'
            control={form.control}
            render={({field})=>(
                <FormItem className='col-span-2 md:col-span-1'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input
                        disabled={isLoading}
                        placeholder='God Of Cricket'
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
              <FormField 
            name='categoryId'
            control={form.control}
            render={({field})=>(
                <FormItem>
                    <FormLabel>Select a category</FormLabel>
                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="bg-background"
                            defaultValue={field.value}
                            >
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                            {categories.map((category)=>(
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className='space-y-2 w-full '>
                <div>
                    <h3 className='text-lg font-medium'>
                    Configurations
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                    This section is configured to instruct AI
                    </p>
                </div>
                <Separator className='bg-primary/10' />
            </div>
            <FormField 
            name='instruction'
            control={form.control}
            render={({field})=>(
                <FormItem className='col-span-2 md:col-span-1'>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                        <Textarea
                        className='bg-background resize-none'
                        rows={7}
                        disabled={isLoading}
                        placeholder=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquam impedit laborum, eaque libero qui harum, eligendi ut deleniti, veritatis doloremque. Dolor odio labore non repellendus reiciendis? Vel ipsam voluptate saepe praesentium dicta aliquid reiciendis amet itaque quas architecto doloremque cupiditate, dolor officia numquam velit iusto harum accusamus aspernatur laudantium nemo voluptatem labore optio dolorem esse. Iure ad rem voluptates laborum iusto cum quis praesentium dolorem iste facere temporibus, unde quia adipisci perferendis aperiam distinctio enim ex tempora voluptatem delectus. Cupiditate asperiores est doloribus corporis ipsum reprehenderit laboriosam fugit tenetur. Aspernatur, sit aliquam, laborum officiis rem repudiandae nemo quod tempore suscipit optio voluptates voluptate consequatur fugit asperiores molestiae ut, quos earum vero quae dolor temporibus quibusdam deleniti. Velit quidem esse mollitia vero itaque rerum a repellendus dicta reprehenderit sint eos dolore quia laudantium, vel qui. Autem consequuntur tenetur, laboriosam, error ipsam dolorem odio delectus quaerat, id modi rem? Saepe possimus suscipit nobis laudantium ab dolorum vitae recusandae enim quibusdam magni, voluptatibus sapiente necessitatibus facilis dicta aperiam explicabo minus molestias itaque. Quasi earum iusto magni quod dicta quibusdam dolorum eos vel quos ex asperiores alias velit omnis qui quaerat tempora accusantium labore id excepturi, hic cumque sed voluptates architecto? Doloremque, obcaecati!'
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />

<FormField 
            name='seed'
            control={form.control}
            render={({field})=>(
                <FormItem className='col-span-2 md:col-span-1'>
                    <FormLabel>This is how actual conversation looks like!</FormLabel>
                    <FormControl>
                        <Textarea
                        className='bg-background resize-none'
                        rows={7}
                        disabled={isLoading}
                        placeholder=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquam impedit laborum, eaque libero qui harum, eligendi ut deleniti, veritatis doloremque. Dolor odio labore non repellendus reiciendis? Vel ipsam voluptate saepe praesentium dicta aliquid reiciendis amet itaque quas architecto doloremque cupiditate, dolor officia numquam velit iusto harum accusamus aspernatur laudantium nemo voluptatem labore optio dolorem esse. Iure ad rem voluptates laborum iusto cum quis praesentium dolorem iste facere temporibus, unde quia adipisci perferendis aperiam distinctio enim ex tempora voluptatem delectus. Cupiditate asperiores est doloribus corporis ipsum reprehenderit laboriosam fugit tenetur. Aspernatur, sit aliquam, laborum officiis rem repudiandae nemo quod tempore suscipit optio voluptates voluptate consequatur fugit asperiores molestiae ut, quos earum vero quae dolor temporibus quibusdam deleniti. Velit quidem esse mollitia vero itaque rerum a repellendus dicta reprehenderit sint eos dolore quia laudantium, vel qui. Autem consequuntur tenetur, laboriosam, error ipsam dolorem odio delectus quaerat, id modi rem? Saepe possimus suscipit nobis laudantium ab dolorum vitae recusandae enim quibusdam magni, voluptatibus sapiente necessitatibus facilis dicta aperiam explicabo minus molestias itaque. Quasi earum iusto magni quod dicta quibusdam dolorum eos vel quos ex asperiores alias velit omnis qui quaerat tempora accusantium labore id excepturi, hic cumque sed voluptates architecto? Doloremque, obcaecati!'
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <div className='flex justify-center w-full'>
                <Button size={'lg'} disabled={isLoading}>
                {initialData ? "Edit Your Companion" : "Create New Companion" }
                <Wand className='w-4 h-4 ml-4' />
                </Button>

            </div>
        </form>
      </Form>
    </div>
  )
}

export default CompanionForm
