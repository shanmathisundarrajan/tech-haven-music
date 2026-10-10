import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../utilities/Spinner';
import { addDoc, collection } from 'firebase/firestore';
import { __DB } from '../backend/firebase';

const CreateAlbum = () => {
  let initialAlbumState = {
    albumTitle:"",
    albumPoster:"",
    albumReleaseDate:"",
    albumLanguages:"",
    albumDescription:""
  }
  let initialSongState = {
    songName:"",
    songUrl:"",
    songThumbnail:"",
    songSingers:"",
    songMood:"",
    songMusicDirector:""
  }
  let [albumState, setAlbumState]=useState(initialAlbumState);
  let [songState, setSongState]=useState([initialSongState]);
  let [isLoading, setIsLoading]=useState(false);
  let [albumThumbnailPoster, setAlbumThumbnailPoster]= useState(null);
  let {albumTitle, albumPoster, albumReleaseDate, albumLanguages, albumDescription}= albumState;
  // handling album {poster}
  let handleAlbumPoster = (e)=>{
    let file = e.target.files[0];
    if(file){
      setAlbumThumbnailPoster(file)
    }
  }
  // Handling input changes in album form
  let handleAlbumInputChange = (e)=>{
    let {name, value}= e.target;
    setAlbumState({
      ...albumState,[name]:value
    })
  }
// Add section method for song 
let addSongSection = (e)=>{
  e.preventDefault();
  setSongState([
  ...songState,{
    songName:"",
    songUrl:"",
    songThumbnail:"",
    songSingers:"",
    songMood:"",
    songMusicDirector:""
  }
])
}
// Remove song section
let removeSongSection = ( index, e)=>{
  e.preventDefault();
  if(index>0) { 
    setSongState(songState.filter((el, ind)=>{
    return ind != index;
  }))
}
}
// Handling the songs input
let handleSongsInputChange = (index, e)=>{
  let {name, value}=e.target;
  let updatedState = [...songState];

  updatedState[index][name]= value;
  setSongState(updatedState);

}
// handling files of songs section
let handleSongsFilesInput=(index, inpName, e)=>{
  let updatedSongs = [...songState];
  updatedSongs[index][inpName]=e.target.files[0];
  setSongState(updatedSongs);
}

  // Upload one file to Cloudinary ("auto" lets Cloudinary detect image / audio)
  let uploadToCloudinary = async (file)=>{
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tech_haven_music_380");
    let response = await fetch("https://api.cloudinary.com/v1_1/dmk7c7pom/auto/upload", {
      method:"POST",
      body: formData
    });
    let result = await response.json();
    if(!response.ok || result?.error){
      throw new Error(result?.error?.message || "Cloudinary upload failed");
    }
    return result;
  }
  // 215.4 seconds -> "3:35"
  let formatDuration = (seconds)=>{
    let total = Math.round(Number(seconds) || 0);
    let mins = Math.floor(total/60);
    let secs = String(total%60).padStart(2,"0");
    return `${mins}:${secs}`;
  }

  // Form Submit Method
  let handleFormSubmit=async(e)=>{
    e.preventDefault();
    if(!albumThumbnailPoster){
      toast.error("Please select an album poster");
      return;
    }
    for(let i=0;i<songState.length;i++){
      let song = songState[i];
      if(!song.songName || !(song.songUrl instanceof File) || !(song.songThumbnail instanceof File)){
        toast.error(`Song ${i+1}: enter the name, choose the audio file and the poster`);
        return;
      }
    }
    try {
      setIsLoading(true);
      let posterResult = await uploadToCloudinary(albumThumbnailPoster);
      let songs = await Promise.all(songState.map(async(song)=>{
        let [thumbResult, audioResult] = await Promise.all([
          uploadToCloudinary(song.songThumbnail),
          uploadToCloudinary(song.songUrl)
        ]);
        return {
          songName: song.songName,
          songSingers: song.songSingers,
          songMood: song.songMood,
          songMusicDirector: song.songMusicDirector,
          songThumbnail: thumbResult.secure_url,
          songUrl: audioResult.secure_url,
          songDuration: formatDuration(audioResult.duration)
        }
      }));
      let Payload = {...albumState, albumPoster: posterResult.secure_url, AllSongs: songs};
      await addDoc(collection(__DB,"album_collections"), Payload);
      toast.success("Album created successfully");
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <section className='h-full w-full flex justify-center' >
      <article className='min-h-[400px] w-[65%] bg-slate-800 rounded-md mt-12 pt-4 px-8'>
<header><h1 className='text-[24px] font-semibold text-center'>Create Album </h1></header>
<hr className='my-2'/>
{/* Form Starting */}
<main >
  {/* Album form starting */}
  <header className='my-4'>
    <h1 className='text-[20px] font-semibold'>Album Details</h1>
  </header>
  <article >
    <form action="" onSubmit={handleFormSubmit}>
      {/* album starts */}
<header  className='flex flex-wrap justify-between gap-y-4'>
  {/* first row album */}
<div className='flex flex-col gap-2 w-[48%]'>
  <label htmlFor="albumTitle">Album Title</label>
  <input type="text" placeholder='Enter Album Title' name='albumTitle' value={albumTitle} onChange={handleAlbumInputChange} className='outline-none py-2 px-2 border rounded-md' />
</div>
<div className='flex flex-col gap-2 w-[48%]'>
  <label htmlFor="albumTitle">Album Poster</label>
  <input type="file" name='albumPoster' onChange={handleAlbumPoster}  className='outline-none py-2 px-2 border rounded-md file:bg-blue-600 file:px-1 file:rounded-sm' />
</div>
  {/* second row album */}

<div className='flex flex-col gap-2 w-[48%]'>
  <label htmlFor="albumTitle">Album Release Date</label>
  <input type="date" name='albumReleaseDate' value={albumReleaseDate}  onChange={handleAlbumInputChange} className='outline-none py-2 px-2 border rounded-md' />
</div>
<div className='flex flex-col gap-2 w-[48%]'>
  <label htmlFor="albumLanguages">Album Languages</label>
  <input type="text"   placeholder='Enter Album Languages' name='albumLanguages' value={albumLanguages} onChange={handleAlbumInputChange} className='outline-none py-2 px-2 border rounded-md' />
</div>
{/* third row */}
<div className='flex flex-col gap-2 w-[100%]'>
  <label htmlFor="albumTitle">Album Description</label>
<textarea onChange={handleAlbumInputChange} className='py-2 px-2 ' placeholder='Enter the Description' name='albumDescription' value={albumDescription}></textarea>
</div>
  </header>
        {/* album end */}
        {/* songs form starts here */}
<main className='py-4'>
  <header><h1 className='text-[20px] font-semibold '>Songs Section</h1></header>
  {/* iterating the songsState */}
  {songState?.map((song, index)=>{
    return <section key={index} className='bg-slate-700 w-[100%] min-h-[250px] rounded-md my-4 py-2 px-6'>
      <header><h1 className='text-[18px] font-semibold text-center '>Song {index+1}</h1></header>
      {/* this is songs divs section */}
      <main className='flex justify-between flex-wrap gap-y-4'>
        {/* First row songs section */}
        <div className='flex flex-col gap-2 w-[32%]'>
          <label htmlFor="">Song Name</label>
          <input type="text" name='songName' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songName} placeholder='Enter song name' className='outline-none border py-2 px-2 rounded-md'/>
        </div>
        <div className='flex flex-col gap-2 w-[32%]'>
          <label htmlFor="">Song Url</label>
          <input type="file" name='songUrl' onChange={(e)=>handleSongsFilesInput(index,"songUrl",e)} className='outline-none border py-2 px-2 rounded-md file:bg-blue-600 file:px-1 file:rounded-md'/>
        </div>
        <div className='flex flex-col gap-2 w-[32%]'>
          <label htmlFor="">Song Poster</label>
          <input type="file" name='songThumbnail' onChange={(e)=>handleSongsFilesInput(index,"songThumbnail",e)} className='outline-none border py-2 px-2 rounded-md'/>
        </div>
        {/* second row songs section  */}
        <div className='flex flex-col gap-2 w-[32%]'>
          <label htmlFor="">Song Singers</label>
          <input type="text"name='songSingers' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songSingers}  placeholder='Enter Singers' className='outline-none border py-2 px-2 rounded-md'/>
        </div>
        <div className='flex flex-col gap-2 w-[32%]'>
          <label htmlFor="">Song Mood</label>
          <input type="text" name='songMood' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songMood}  placeholder='Enter song mood' className='outline-none border py-2 px-2 rounded-md'/>
        </div>
        <div className='flex flex-col gap-2 w-[32%]'>
          <label htmlFor="">Song MusicDirector</label>
          <input type="text" name='songMusicDirector' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songMusicDirector}  placeholder='Enter Music Director' className='outline-none border py-2 px-2 rounded-md'/>
        </div>
      </main>
      <footer className='flex justify-between py-6'>
        <button className='py-2 px-4 bg-red-600 rounded-md 'onClick={(e)=>removeSongSection(index, e)}>Remove Section</button>
      {index==songState.length-1 && <button className='py-2 px-4 bg-blue-600 rounded-md'onClick={addSongSection} >Add Section</button>
    }
      </footer>

    </section>
  })}
  <section>

  </section>
</main>
       {/* songs form end here */}
        {/* submit part starts */}
        <footer>
          <button  className='bg-blue-600 hover:bg-blue-800 w-[100%] py-2 rounded-md'>Submit</button>
        </footer>
        {/* Submit part ends */}

    </form>
  </article>
  {/* Album form Ending */}
</main>
{/* Form Ending here */}
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default CreateAlbum