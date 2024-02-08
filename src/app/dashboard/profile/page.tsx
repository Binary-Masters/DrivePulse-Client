// "use client"
import React from 'react'
import ProfileCard from '@/Components/Dashboard/ProfileCard/ProfileCard'
import Dropdown from '@/Components/Dashboard/ProfileCard/Dropdown'
import '../profile/profile.css'
import useGetSingleUser from '@/Hooks/useGetSingleUser'
const Profile = () => {
 
  return (
    <div className='min-h-screen  classes flex justify-center items-center '> 
    {/* profile card */}
      <ProfileCard/>  
    </div>
  )
}

export default Profile
