const YTMusic = require('./ytmusicapi/own').default; // Local copy made to support Node 12
const ytDownload = require("ytdl-core");
const youtubeMusic = new YTMusic();

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const searchForMusic = async (query) => {
  const searchResults = await youtubeMusic.search(query);  
  const musicResult = searchResults.find(result => result.resultType === "song");
  if(!musicResult)
  {
    return defaultSearch(searchResults);
  }  
  const result = await processMusicResult(musicResult);
  return result;
}

const searchForArtist = async (query) => {
  const searchResults = await youtubeMusic.search(query);  
  const artistResult = searchResults.find(result => result.resultType === "artist");
  if(!artistResult)
  {
    return defaultSearch(searchResults);
  }

  const result = await processArtistResult(artistResult);
  return result;
}

const searchForAlbum = async (query) => {
  const searchResults = await youtubeMusic.search(query);  
  const albumResult = searchResults.find(result => result.resultType === "album");
  if(!albumResult)
  {
    return defaultSearch(searchResults);
  }
  const result = await processAlbumResult(albumResult);
  return result;
}

const searchForPlaylist = async(query) => {
  const searchResults = await youtubeMusic.search(query);  
  const playlistResult = searchResults.find(result => result.resultType === "album");
  if(!playlistResult)
  {
    return defaultSearch(searchResults);
  }
  const result = await processPlaylistResult(result);
  return result;
}

const processMusicResult = async (result) => {
  const songInfo = await ytDownload.getInfo(result.videoId);
  if(!songInfo)
  {
    throw "Foi mal, não consigui encontrar a música solicitada."
  }

  let finalList = {
    title: result.title,
    videoIds: [result.videoId],
  }

  const artist = await youtubeMusic.getArtist(songInfo.videoDetails.channelId);
  if(!artist)
  {
    return finalList;
  }
  const playlist = await getPlaylist(artist.songs.browseId);
  finalList.title = artist.name + " " + finalList.title;
  finalList.videoIds = finalList.videoIds.concat(playlist.videoIds);
  finalList.videoIds = finalList.videoIds.filter(onlyUnique);
  return finalList;
}

const processAlbumResult = async (result) => {
  const albumInfo = await youtubeMusic.getAlbum(result.browseId);   
  if(!albumInfo)
  {
    throw `Não encontrei resultados para o álbum solicitado`;
  }
  return ({
    title: albumInfo.title,
    videoIds: albumInfo.tracks.map(track => track.videoId),
  });  
}

const processArtistResult = async (result) => {
  const artist = await youtubeMusic.getArtist(result.browseId);

  const playlist = await getPlaylist(artist.songs.browseId);
  return ({
    title: result.name,
    videoIds: playlist.videoIds,
  });
}

const processPlaylistResult = async (result) => {
  const playlist = await getPlaylist(result.browseId, 400);
  return playlist;
}

const defaultSearch = async(searchResults) => {
  const mostRelevant = searchResults[0];
  let result;
  switch (mostRelevant.resultType) {
    case "song":
      result = await processMusicResult(mostRelevant);
      break;
    case "album":
      result = await processAlbumResult(mostRelevant);
      break;
    case "artist":
      result = await processArtistResult(mostRelevant);
      break;
    case "playlist":
      result = await processPlaylistResult(mostRelevant);
    default:
      throw "Não consegui encontrar nenhum resultado válido";
  }
}

const getPlaylist = async(playlistId) => {
  const playlist = await youtubeMusic.getPlaylist(playlistId, 400);
  console.log(playlist);
  return ({
    title: playlist.title,
    videoIds: playlist.tracks.map(track => track.videoId).filter(track => track !== null && track !== "null"),
    token: playlist.suggestions_token,
  });
}

module.exports = {
  searchForAlbum,
  searchForArtist,
  searchForMusic,
  searchForPlaylist,
  getPlaylist,
}
