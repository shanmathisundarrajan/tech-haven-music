import { deleteUser } from 'firebase/auth/cordova';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const DeleteAccount = () => {
  let [inputText, setInputText]= useState("");
  let handleInputChange=(e)=>{
    let inputText=e.target.value;
    setInputText(inputText);
  }
  let handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(inputtext);
    deleteUser();
    toast.success("User Deleted Successfully");
    
  }
  return (
    <section className='h-full w-full flex justify-center items-center '>
      <article className='w-[60%] h-[300px] bg-slate-700 rounded-md p-6 flex flex-col gap-6'>
        <header><h1 className='text-[32px] font-semibold'>Deleting Account</h1></header>
        <main>
        <p className='w-[80%]'>Deleting Account will remove all the informations from the database and <b>It can't be reversed</b></p>
      </main>
      <footer>
        <form action="" className='flex justify-between items-end' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor="">To Delete this Account type <b>DELETE</b></label>
            <input type="text" className='outline-none border py-1 px-2 rounded-md bg-white text-red-600 w-[255px] font-semibold' onChange={handleInputChange} />
          </div>
          <div>
            <button className={`px-16 py-2 rounded-md ${inputText!="DELETE" ?"bg-slate-500 cursor-not-allowed":"bg-red-600 cursor-pointer"}`} disabled={inputText!="DELETE"}>Delete Account</button>
          </div>
        </form>
      </footer>
      </article>
      
    </section>
  )
}

export default DeleteAccount