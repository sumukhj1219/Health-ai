import Companions from '@/components/Companions'
import SearchBar from '@/components/SearchBar'
import Categories from '@/components/ui/categories'
import prismadb from '@/lib/prismadb'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

interface HomePageProps{
  searchParams:{
    categoryId: string,
    name: string
  }
}

const Home = async({searchParams}:HomePageProps) => {
  const data = await prismadb.companion.findMany({
    where:{
      categoryId:searchParams.categoryId,
      name:{
        search:searchParams.name
      }
    },
    orderBy:{
      createdAt:'desc'
    },
    include:{
      _count:{
        select:{
          messages:true
        }
      }
    }
  })
  const categories = await prismadb.category.findMany()
  return (
    <div className='h-full p-4 space-y-2'>
      <SearchBar />
      <Categories data={categories}/>
      <Companions data={data}/>
    </div>
  )
}

export default Home
