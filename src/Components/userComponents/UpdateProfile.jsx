import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import toast from 'react-hot-toast';
import Spinner from '../../utilities/Spinner';
import { updateProfile } from 'firebase/auth/cordova';

const UpdateProfile = () => {
  let {authUser,setAuthUser}= useContext(AuthContextAPI);
  let [imageFile, setImageFile]= useState(null);
  let [imagePreview, setImagePreview]=useState(null);
  let [isLoading, setIsloading]=useState(false);
let handleInputChange=(e)=>{
  // console.log(e.target.files[0]);
  let file = e.target.files[0];
  if (file){
    let imageUrl = URL.createObjectURL(file)
   setImagePreview(imageUrl);
   setImageFile(file)
    
  }
  
}
let handleSubmit=async(e)=>{
  e.preventDefault();
 try {
  setIsloading(true);
  let imageFormData = new FormData();
  imageFormData.append("file", imageFile);  //by using Cloudinary
  imageFormData.append("upload_preset","tech_haven_music_380");
  imageFormData.append("cloud_name","dmk7c7pom");
  let cloudinaryResponse = fetch("https://api.cloudinary.com/v1_1/dmk7c7pom/image/upload",       //cloudinary base url -- change only the cloud name
  {     
method:"POST",
body: imageFormData

  }  )  
  let  ImageResponseFromDB = await (await cloudinaryResponse).json()
  console.log(ImageResponseFromDB);
  
  console.log(cloudinaryResponse);
  updateProfile(authUser,{
    photoURL: ImageResponseFromDB?.url
  });
  setAuthUser({
    ...authUser, photoURL:ImageResponseFromDB?.url
  })
  
 } catch (error) {
  toast.error(error.message)
 }finally{
  setIsloading(false);
 }
}
  return (
    <section className='h-full w-full flex justify-center items-center'>
      <article className='min-h-[450px] w-[33%] bg-slate-700 rounded-md py-4 px-8 flex flex-col gap-4 items-center'>
        <header>
          <h1 className='text-[24px] font-semibold text-center '>Update Profile</h1>
        </header>
        <main>
          <picture>
            <img src={imagePreview==null ? authUser?.photoURL:imagePreview} alt="" className='h-[250px] w-[250px] border rounded-full' />
          </picture>
        </main>
        <footer>
            <form action="" onSubmit={handleSubmit}>
              <div><label htmlFor="image" className='block border text-center py-2 rounded-md font-semibold px-20 '>Choose Picture</label>
              <input type="file" id='image'  className='hidden' onChange={handleInputChange}/></div>
              <div className='mt-4'>
                <button className='bg-blue-600 w-full py-2 rounded-md' >Upload Picture</button>
              </div>
            </form>
        </footer>
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default UpdateProfile