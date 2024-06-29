import fetch from "node-fetch";
import * as parsers from "./parsers.js";
import * as context from "./context.js";

const parseSearchPlaylistsBody = (body, onlyOfficialPlaylists) => {
  const contents =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer?.contents;

  if (!contents) {
    return [];
  }

  const results = [];

  contents.forEach((content) => {
    try {
      const playlist = parsers.parsePlaylistItem(
        content,
        onlyOfficialPlaylists
      );
      if (playlist) {
        results.push(playlist);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

const searchPlaylists = async (query, options) => {
  try {
    const response = await fetch(
      "https://music.youtube.com/youtubei/v1/search?alt=json&key=" +
        process.env.YOUTUBE_API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          ...context.body,
          params: "EgWKAQIoAWoKEAoQAxAEEAUQCQ%3D%3D",
          query,
        }),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
          origin: "https://music.youtube.com",
        },
      }
    );
    return parseSearchPlaylistsBody(
      await response.json(),
      options?.onlyOfficialPlaylists ?? false
    );
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { searchPlaylists };
