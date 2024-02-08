// "use client"
import React from 'react'
import ProfileCard from '@/Components/Dashboard/ProfileCard/ProfileCard'
import '../profile/profile.css'
const Profile = () => {
 
  return (
    <div className='min-h-screen  classes flex justify-center items-center '> 
    {/* profile card */}
      <ProfileCard/>  
    </div>
  );
};

export default Profile;
