import {
  searchForAlbum,
  searchForArtist,
  searchForMusic,
  searchForPlaylist,
  getPlaylist,
} from "./youtube-music-api.js"

async function handler (context, req) {
  if (
    !req.query.query &&
    (!req.body || !req.body.query) &&
    !req.query.playlistId
  ) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: "Missing query or playlistId",
    };
    return;
  }

  const playlistId = req.query.playlistId;

  if (playlistId) {
    try {
      const data = await getPlaylist(playlistId, "Playlist pré-definida");
      context.res = { body: data };
      return;
    } catch (err) {
      context.res = { body: err, status: 500 };
      return;
    }
  }

  const query = req.query.query || req.body.query;
  const musicName = req.body && req.body.musicName;
  const playlistName = req.body && req.body.playlistName;
  const albumName = req.body && req.body.albumName;

  let data;
  try {
    if (albumName) {
      data = await searchForAlbum(query);
    } else if (playlistName) {
      data = await searchForPlaylist(query);
    } else if (musicName) {
      data = await searchForMusic(query);
    } else {
      data = await searchForArtist(query);
    }
  } catch (err) {
    context.res = { body: err, status: 500 };
    return;
  }

  context.res = { body: data };
};

export default handler