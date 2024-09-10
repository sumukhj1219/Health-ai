import prismadb from '@/lib/prismadb'
import React from 'react'
import CompanionForm from '../_components/CompanionForm'
import { auth } from '@clerk/nextjs/server'

interface CompanionPageProps{
    params:{
        companionId:string
    }
}


const ComapnionPage = async({params}:CompanionPageProps) => {
const {userId} = auth()

  const companion = await prismadb.companion.findUnique({
        where:{
            id:params.companionId,
            userId
        }
  })
  const categories = await prismadb.category.findMany()
  return (
    <div>
      <CompanionForm 
      initialData = {companion}
      categories = {categories}
      />
    </div>
  )
}

export default ComapnionPage
