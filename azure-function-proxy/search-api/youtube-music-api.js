
import {
  searchMusics,
  searchAlbums,
  searchPlaylists,
  getSuggestions,
  listMusicsFromAlbum,
  listMusicsFromPlaylist,
  searchArtists,
  getArtist,
} from 'node-youtube-music';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const searchForMusic = async (query) => {
  const musics = await searchMusics(query);
  const suggestions = await getSuggestions(musics[0].youtubeId);    
  return ({
    title: suggestions[0].title,
    videoIds: suggestions.map(video => video.youtubeId),
  });
}

const searchForArtist = async (query) => {
  const artists = await searchArtists(query);
  if(artists.length == 0)
  {
    return await searchForMusic(query);
  }
  const artist = await getArtist(artists[0].artistId)
  const musics = await listMusicsFromPlaylist(artist.songsPlaylistId.slice(2))
  return ({
    title: artist.name,
    videoIds: musics.map(video => video.youtubeId)
  })
}

const searchForAlbum = async (query) => {
  const albuns = await searchAlbums(query);
  if(albuns.length == 0)
  {
    return await searchForMusic(query);
  }
  const musics = await listMusicsFromAlbum(albuns[0].albumId);
  return ({
    title: albuns[0].title,
    videoIds: musics.map(video => video.youtubeId)
  });
}

const searchForPlaylist = async(query) => {
  const playlists = await searchPlaylists(query, { onlyOfficialPlaylists: false});  
  if(playlists == 0)
  {
    return await searchForMusic(query);
  }
  const mostSongs = playlists.sort((p1, p2) => p2.totalSongs - p1.totalSongs)
  return await getPlaylist(mostSongs[0].playlistId, mostSongs[0].title)
}

const getPlaylist = async(playlistId, playlistTitle) => {
  const musics = await listMusicsFromPlaylist(playlistId)
  return ({
    title: playlistTitle,
    videoIds: musics.map(video => video.youtubeId)
  });
}

export {
  searchForAlbum,
  searchForArtist,
  searchForMusic,
  searchForPlaylist,
  getPlaylist,
}
