import fetch from "node-fetch";
import * as parsers from "./parsers.js";
import * as context from "./context.js";

const parseListMusicsFromAlbumBody = (body, album) => {

  const { contents } = body.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicShelfRenderer;
  const songs = [];

  contents.forEach((element) => {
    try {
      const song = parsers.parseMusicInAlbumItem(element);
      if (song) {
        song.album = album.title;
        song.artist = album.artist;
        song.thumbnailUrl = album.thumbnailUrl;
        songs.push(song);
      }
    } catch (err) {
      console.error(err);
    }
  });
  return songs;
};

const listMusicsFromAlbum = async (album) => {
  try {
    const response = await fetch(
      "https://music.youtube.com/youtubei/v1/browse?alt=json&key=" +
        process.env.YOUTUBE_API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          ...context.body,
          browseId: album.albumId,
        }),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
          origin: "https://music.youtube.com",
        },
      }
    );
    return parseListMusicsFromAlbumBody(await response.json(), album);
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { parseListMusicsFromAlbumBody, listMusicsFromAlbum };
