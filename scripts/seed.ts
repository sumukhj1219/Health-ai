const {PrismaClient} =  require("@prisma/client")
const db = new PrismaClient()

async function main()
{
    try {
        await db.category.createMany({
            data:[
                {name: 'Skin Care'},
                {name: 'Heart Care'},
                {name: 'Physician'},
                {name: 'Blood and Iron'},
                {name: 'Fitness and Sleep'},
                {name: 'Allergy'},
            ]
        })
        await db.taskCategory.createMany({
            data:[
                {name: 'Body'},
                {name:  'Skin'},
                {name: 'Cardio'},
                {name: 'Brain'},
                {name:  'Muscles'}       
            ]
        })
    } catch (error) {
        console.log('error', error)
    } finally
    {
        await db.$disconnect()
    }
}

main()
