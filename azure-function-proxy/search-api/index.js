const youtubeAPI = require("./youtube-music-api");

module.exports = async function (context, req) {
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
      const data = await youtubeAPI.getPlaylist(playlistId);
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
      data = await youtubeAPI.searchForAlbum(query);
    } else if (playlistName) {
      data = await youtubeAPI.searchForPlaylist(query);
    } else if (musicName) {
      data = await youtubeAPI.searchForMusic(query);
    } else {
      data = await youtubeAPI.searchForArtist(query);
    }
  } catch (err) {
    context.res = { body: err, status: 500 };
    return;
  }

  context.res = { body: data };
};
