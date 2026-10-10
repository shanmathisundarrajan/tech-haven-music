import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { AuthContextAPI } from "./AuthContext";
import { __DB } from "../backend/firebase";

export let FavouritesContextAPI = createContext(null);

let FavouritesContext = ({ children }) => {
  let { authUser } = useContext(AuthContextAPI);
  let [favourites, setFavourites] = useState([]);

  // Live-listen to this user's favourites document
  useEffect(() => {
    if (!authUser) {
      setFavourites([]);
      return;
    }
    let favRef = doc(__DB, "favourites", authUser.uid);
    let unsubscribe = onSnapshot(
      favRef,
      (snap) => {
        setFavourites(snap.exists() ? snap.data().songs || [] : []);
      },
      (error) => {
        console.log(error);
        toast.error(error.message);
      }
    );
    return () => unsubscribe();
  }, [authUser]);

  let isFavourite = (song) => favourites.some((s) => s.songUrl === song?.songUrl);

  let toggleFavourite = async (song) => {
    if (!authUser) {
      toast.error("Please login to add favourites");
      return;
    }
    let alreadyAdded = isFavourite(song);
    let updatedSongs = alreadyAdded
      ? favourites.filter((s) => s.songUrl !== song.songUrl)
      : [...favourites, song];
    try {
      await setDoc(doc(__DB, "favourites", authUser.uid), { songs: updatedSongs });
      toast.success(alreadyAdded ? "Removed from favourites" : "Added to favourites");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <FavouritesContextAPI.Provider value={{ favourites, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContextAPI.Provider>
  );
};

export default FavouritesContext;