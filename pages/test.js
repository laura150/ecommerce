import React from 'react'

const test = () => {
    const array = [
        {
            id: 1,
            name: 'laura'
        },
        {
            id: 2,
            name: 'Tayo'
        },
        {
            id: 3,
            name: 'mama'
        }
    ]

    
    console.log(array.map((x) =>(
       [...array, {type: 'happy'}]
      
    )))
    const newobj = {
        id : 5,
        name: 'irene'
    }

    array.push(newobj)
    console.log(array)

    return (
        <div>
          
        </div>
    )
}

export default test
