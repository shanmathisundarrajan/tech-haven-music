import { createRoot } from "react-dom/client";
import App from "./App";
import AuthContext from "./context/AuthContext";
import UserContext from "./context/UserContext";
import AlbumContext from "./context/AlbumContext";
import AudioPlayerContext from "./context/AudioPlayerContext";
import FavouritesContext from "./context/FavouritesContext";
createRoot(document.getElementById("root")).render(<AuthContext>
    <UserContext>
        <AlbumContext>
            <FavouritesContext>
                <AudioPlayerContext>
                    <App/>
                </AudioPlayerContext>
            </FavouritesContext>
        </AlbumContext>
    </UserContext>
</AuthContext>)