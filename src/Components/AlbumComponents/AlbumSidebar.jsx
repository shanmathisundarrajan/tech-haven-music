import React from 'react'
import { IoMdAlbums } from 'react-icons/io'
import { IoAlbumsOutline } from 'react-icons/io5'
import { RiDashboardFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const AlbumSidebar = () => {
  return (
<section className='p-7'>
    <article>
        <ul className='flex flex-col gap-4'>
        <li><NavLink end to={"/"} className={({isActive})=>`${isActive && "bg-blue-600" } flex items-center gap-2 px-2  py-1 rounded-md`}><span><RiDashboardFill /></span><span>Dashboard</span></NavLink></li>
        <li><NavLink to={"/favourites"} className={({isActive})=>`${isActive && "bg-blue-600" } flex items-center gap-2 px-2  py-1 rounded-md`}><span ><IoMdAlbums/></span><span> Favourites</span></NavLink></li>
        {/* <li><NavLink to={"/"} className={({isActive})=>`${isActive && "bg-blue-600" } flex items-center gap-2 px-2  py-1 rounded-md`}><span><IoAlbumsOutline /></span><span>All Albums</span></NavLink></li> */}
        </ul>
    </article>
</section>  )
}

export default AlbumSidebar