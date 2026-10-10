import React, { useContext } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FavouritesContextAPI } from '../../context/FavouritesContext'
import { AudioPlayerContextAPI } from '../../context/AudioPlayerContext'

const Favourites = () => {
  let { favourites, toggleFavourite } = useContext(FavouritesContextAPI);
  let { setSongs, setIsPlaying, setCurrentSongIndex } = useContext(AudioPlayerContextAPI);

  return (
    <section className='h-full w-full'>
      <header>
        <h1 className='text-[24px] font-semibold'>My Favourites</h1>
      </header>
      {favourites.length === 0 ? (
        <p className='mt-6'>No favourite songs yet. Open an album and tap the heart icon next to a song.</p>
      ) : (
        <main className='mt-6 pb-28'>
          <table className='w-full text-left'>
            <thead className='bg-slate-700'>
              <tr>
                <th className='px-2'></th>
                <th className='px-1 py-3'></th>
                <th className='px-1 py-3'>Song Name</th>
                <th className='px-1 py-3'>Singers</th>
                <th className='px-1 py-3'>Music Director</th>
                <th className='px-1 py-3'>Mood</th>
                <th className='px-1 py-3'>Duration</th>
                <th className='px-1 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {favourites.map((song, index) => (
                <tr
                  key={song?.songUrl || index}
                  className='bg-slate-800 cursor-pointer'
                  onClick={() => { setSongs(favourites); setCurrentSongIndex(index); setIsPlaying(true); }}
                >
                  <td className='py-1 text-center'>{index + 1}</td>
                  <td className='py-2 pl-6 w-[100px]'><img src={song?.songThumbnail} alt="" className='h-[60px] rounded-sm' /></td>
                  <td className='py-1 pl-4'>{song?.songName}</td>
                  <td className='py-1'>{song?.songSingers}</td>
                  <td className='py-1'>{song?.songMusicDirector}</td>
                  <td className='py-1'>{song?.songMood}</td>
                  <td className='py-1'>{song?.songDuration}</td>
                  <td className='py-1 pr-4'>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavourite(song); }}
                      className='text-red-500 text-[20px]'
                      title='Remove from favourites'
                    ><FaHeart /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
    </section>
  )
}

export default Favourites