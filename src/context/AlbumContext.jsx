import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react"
import { __DB } from "../backend/firebase";

export let  AlbumContextAPI = createContext(null);
let AlbumContext = ({children}) =>{
    let [allAlbums, setAllAlbums] = useState(null);
    let fetchAlbumData = async() =>{
        try {
            let AlbumDataCollectionRef = collection(__DB,"album_collections");
            // console.log("reference done");
            
            let AlbumDataFromDB = await getDocs(AlbumDataCollectionRef);
            let AllAlbumsFromDB = AlbumDataFromDB?.docs.map((doc)=>({
                id:doc.id,
                ...doc?.data()

            }))
            setAllAlbums(AllAlbumsFromDB);
            // console.log("Album data", AllAlbums);
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
fetchAlbumData();
    },[])
    return <AlbumContextAPI.Provider value={{allAlbums}}>
  {children}
    </AlbumContextAPI.Provider>
}
export default AlbumContext