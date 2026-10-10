import React, { useContext, useEffect, useState } from 'react'
import { AuthContextAPI } from "../../context/AuthContext"
import Spinner from '../../utilities/Spinner';
import {doc, setDoc} from 'firebase/firestore';
import { __DB } from '../../backend/firebase';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';


const AddProfile = () => {
  let {authUser}= useContext(AuthContextAPI);
   console.log(authUser);
let data = useLocation();
// console.log(data?.state);
let dataFromNavlink = data?.state;

  let [isLoading, setIsloading]= useState(false);
  let {uid, email, displayName, photoURL}= authUser || {}
  let initialUserData={
    dob: dataFromNavlink?.dob||"",
    contact:dataFromNavlink?.contact||"",
    gender:dataFromNavlink?.gender||"",
    address:dataFromNavlink?.address||"",
    languages:dataFromNavlink?.languages||"",
    role:dataFromNavlink?.role||"user"
  }
  let [userData, setUserdata]=useState(initialUserData);
  let {dob, contact, gender, address, languages}=userData;
let handleInputChange=(e)=>{
  let {name , value}= e.target;
  setUserdata({
    ...userData, [name]:value
  })
}
useEffect(()=>{
  console.log(authUser);
  
},[])
let handleSubmit = async(e)=>{
  e.preventDefault();
  console.log(userData);
  
 try {
  setIsloading(true);
  if(authUser !=null){
    let payLoad ={...userData,uid,email,photoURL,displayName}
    // console.log(payLoad);

    let user_data_collection = doc(__DB,"user-profile",uid);
    let storingDataAtDB=await setDoc(user_data_collection, payLoad);
    toast.success("Data Stored Successsfully")
    // console.log(storingDataAtDB);
    setUserdata(initialUserData);
  }

  
 } catch (error) {
toast.error(error.message);
  
 }  
finally{
  setIsloading(false);
}}
  return (
    <section className='h-full w-full flex items-center justify-center'>
      <article className='min-h-[400px] w-[55%] bg-slate-700 py-4  px-6 rounded-md'>
        <header>
          <h1 className='text-[24px] font-semibold text-center'>Add Profile</h1>
        </header>
        <hr className='mt-1' />
        <main className='mt-4 '>
         <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
         {/* first row div */}
         <div className='w-full flex gap-4 '>
          {/* First aside dob */}
<aside className='flex flex-col gap-1 w-[48%]'>
   <label htmlFor="dob">Date of Birth</label>
    <input type="date" name='dob' value={dob} onChange={handleInputChange} placeholder='Enter your Dob' className='outline-none border py-2 px-2 rounded-md'/>
</aside>
{/* second row contact */}
<aside className='flex flex-col gap-1 w-[48%]'>
   <label htmlFor="contact">Contact</label>
    <input type="tel" name='contact' value={contact} onChange={handleInputChange} placeholder='Enter your Contact' className='outline-none border py-2 px-2 rounded-md'/>
</aside>


         </div>
         {/* second row div */}
         <div className='w-full flex gap-4 '>
          {/* first aside gender */}
<aside className='flex flex-col gap-1 w-[48%]'>
   <label htmlFor="gender">Gender</label>
<div className='border py-2 px-2 rounded-md'>
Male <input checked={gender=="male"} type="radio" name='gender' value={"male"} onChange={handleInputChange}  className='outline-none border py-2 px-2 rounded-md mr-1'/>
Female <input checked={gender=="female"} type="radio" name='gender' value={"female"} onChange={handleInputChange}  className='outline-none border py-2 px-2 rounded-md mr-1'/>
Others <input checked={gender=="others"} type="radio" name='gender' value={"others"} onChange={handleInputChange}  className='outline-none border py-2 px-2 rounded-md mr-1'/>

</div>
</aside>
{/* second row contact */}
<aside className='flex flex-col gap-1 w-[48%]'>
   <label htmlFor="languages">Languages</label>
    <input type="text" name='languages' value={languages} onChange={handleInputChange} placeholder='Enter your Languages' className='outline-none border py-2 px-2 rounded-md'/>
</aside>
         </div>
         <div className='flex flex-col gap-1'>
          <label htmlFor="address">Address</label>
          <textarea name="address" id="address" onChange={handleInputChange} value={address} className='border py-2 px-2 rounded-md outline-none'></textarea>
         </div>
         <div>
          <button className='bg-blue-600 hover:bg-blue-800 w-full py-2 rounded-md'>Submit</button>
         </div>
         </form>
        </main>
      </article>
      {isLoading  && <Spinner/>}
    </section>
  )
}

export default AddProfile