import React from 'react'
import Search from '../page'


const Filesearch = ({params,searchParams}) => {
    console.log(searchParams)
  return (
    <div>
{/* <h1 className='text-4xl my-24'>{params?.filesearch}</h1> */}
<h1 className='text-4xl my-24'>{searchParams?.search}</h1>
     <Search></Search>
    </div>
  )
}

export default Filesearch
