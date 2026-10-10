import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextAPI } from "./AuthContext";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { __DB } from "../backend/firebase";

export let UserContextAPI= createContext(null);

let UserContext = ({children})=>{
    let {authUser} = useContext(AuthContextAPI);
    // null = still loading / not logged in, {} = logged in but no profile saved yet
    let [userDataFromDB, setUserDataFromDB]= useState(null);

    useEffect(()=>{
        if(authUser==null){
            setUserDataFromDB(null);
            return;
        }
        let unsubscribe;
        try {
            let userDataReference=doc(__DB,"user-profile",authUser?.uid);
            unsubscribe = onSnapshot(userDataReference,(user)=>{
                setUserDataFromDB(user.exists() ? user.data() : {});
            },(error)=>{
                toast.error(error.message);
            });
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
        return ()=>{ if(unsubscribe) unsubscribe(); }
    },[authUser])

    return <UserContextAPI.Provider value={{userDataFromDB}}>
        {children}
    </UserContextAPI.Provider>
}
export default UserContext