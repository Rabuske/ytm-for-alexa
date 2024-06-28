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

const searchForMusic = async (query, options) => {
  const musics = await searchMusics(query);
  const suggestions = await getSuggestions(musics[0].youtubeId);
  
  if(options?.fullResults)
  {
    return ({
      musics: musics,
      suggestions: suggestions
    });
  }

  return ({
    title: suggestions[0].title,
    videoIds: suggestions.map(video => video.youtubeId),
  });
}

const searchForArtist = async (query, options) => {
  const artists = await searchArtists(query);
  if(artists.length == 0)
  {
    return await searchForMusic(query, options);
  }
  const artist = await getArtist(artists[0].artistId)
  const musics = await listMusicsFromPlaylist(artist.songsPlaylistId)

  if(options?.fullResults)
  {
    return ({
      artist: artist,
      musics: musics
    });
  }

  return ({
    title: artist.name,
    videoIds: musics.map(video => video.youtubeId)
  })
}

const searchForAlbum = async (query, options) => {
  const albums = await searchAlbums(query);
  if(albums.length == 0)
  {
    return await searchForMusic(query, options);
  }
  const musics = await listMusicsFromAlbum(albums[0].albumId);

  if(options?.fullResults)
  {
    return ({
      albums: albums,
      musics: musics,
    })
  }

  return ({
    title: albums[0].title,
    videoIds: musics.map(video => video.youtubeId)
  });
}

const searchForPlaylist = async(query, options) => {
  const playlists = await searchPlaylists(query, { onlyOfficialPlaylists: false});  
  if(playlists == 0)
  {
    return await searchForMusic(query, options);
  }
  const mostSongs = playlists.sort((p1, p2) => p2.totalSongs - p1.totalSongs)
  return await getPlaylist(mostSongs[0].playlistId, mostSongs[0].title, options)
}

const getPlaylist = async(playlistId, playlistTitle, options) => {
  const musics = await listMusicsFromPlaylist(playlistId)
  if(options?.fullResults)
  {
    return ({
      title: playlistTitle,
      musics: musics,
    });  
  }
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
