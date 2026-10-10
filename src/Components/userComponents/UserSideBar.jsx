import React from 'react'
import { GoPersonAdd } from 'react-icons/go'
import { HiOutlineLockClosed } from 'react-icons/hi'
import {  MdDeleteOutline, MdOutlineSecurityUpdateGood } from 'react-icons/md'
import { RiAccountCircle2Line } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const UserSideBar = () => {
  return (
<section className='p-7'>
    <article>
        <ul className='flex flex-col gap-4'>
        <li><NavLink end to={"/user-profile"} className={({isActive})=>`${isActive && "bg-blue-600" } flex items-center gap-2 px-2  py-1 rounded-md`}><span><RiAccountCircle2Line /></span><span>My Account</span></NavLink></li>
        <li><NavLink to={"update-profile"} className={({isActive})=>`${isActive && "bg-blue-600" } flex items-center gap-2 px-2  py-1 rounded-md`}><span ><MdOutlineSecurityUpdateGood /></span><span>Update Profile</span></NavLink></li>
        <li><NavLink to={"add-profile"} className={({isActive})=>`${isActive && "bg-blue-600" } flex items-center gap-2 px-2  py-1 rounded-md`}><span><GoPersonAdd/></span><span>Add Profile</span></NavLink></li>
        <li><NavLink to={"update-password"} className={({isActive})=>`${isActive && "bg-blue-600" } flex items-center gap-2 px-2  py-1 rounded-md`}><span><HiOutlineLockClosed /></span><span>Update Password</span></NavLink></li>
        <li><NavLink to={"delete-account"} className={({isActive})=>`${isActive && "bg-blue-600" } flex items-center gap-2 px-2  py-1 rounded-md`}><span><MdDeleteOutline /></span><span>Delete Account</span></NavLink></li>  
        </ul>
    </article>
</section>  )
}

export default UserSideBar