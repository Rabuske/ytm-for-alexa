import {
  searchForAlbum,
  searchForArtist,
  searchForMusic,
  searchForPlaylist,
  getPlaylist
} from "./youtube-music-api.js";

async function search(context, req) {
  context.res = { body: req, status: 500 };

  const searchTerm = req.query.query || (req.body? req.body.query : null);
  const playlistId = req.query.playlistId;
  
  if (!searchTerm && !playlistId) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: "Missing query or playlistId",
    };
    return;
  }

  const options = { fullResults: req.body && req.body.fullResults };

  // Start by playing an specific playlist
  if (playlistId) {
    try {
      const data = await getPlaylist(playlistId, options);
      context.res = { body: data };
      return;
    } catch (err) {
      context.res = { body: err, status: 500 };
      return;
    }
  }

  // Parse all possible parameters sent in the body
  const isArtist = req.body && req.body.artistName;
  const isMusic = req.body && req.body.musicName;
  const isPlaylist = req.body && req.body.playlistName;
  const isAlbum = req.body && req.body.albumName;  
  const searchType = req.body ? req.body.searchType || 'ALL' : 'ALL';

  // If searchType is provided, only that type of result is returned
  let data;
  try {
    switch (searchType) {
      case 'ALBUMS':
        data = await searchForAlbum(searchTerm, options);
        break;
      case 'ARTISTS':
        data = await searchForArtist(searchTerm, options);
        break;
      case 'PLAYLISTS':
        data = await searchForPlaylist(searchTerm, options);
        break;
      case 'MUSICS':
        data = await searchForMusic(searchTerm, options);
      default:
        // Just a hack to avoid compatibility issues for now
        if (isArtist) {
          data = await searchForAlbum(searchTerm, options);
        } else if (isPlaylist) {
          data = await searchForPlaylist(searchTerm, options);
        } else if (isMusic) {
          data = await searchForMusic(searchTerm, options);
        } else {
          data = await searchForArtist(searchTerm, options);
        }
      };
  } catch (err) {
    context.res = { body: err, status: 500 };
    return;
  }

  context.res = { body: data };
};

//module.exports = search;
export { search };