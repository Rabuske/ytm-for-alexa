import fetch from "node-fetch";
import * as parsers from "./parsers.js";
import * as context from "./context.js";

const parseArtistsSearchBody = (body) => {
  const { contents } =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer;
  const results = [];

  contents.forEach((content) => {
    try {
      const artist = parsers.parseArtistSearchResult(content);
      if (artist) {
        results.push(artist);
      }
    } catch (err) {
      console.error(err);
    }
  });
  return results;
};

const searchArtists = async (query, options) => {
  try {
    const response = await fetch(
      "https://music.youtube.com/youtubei/v1/search?alt=json&key=" +
        process.env.YOUTUBE_API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          ...context.body,
          params: "EgWKAQIgAWoKEAMQBBAJEAoQBQ%3D%3D",
          query,
        }),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
          "Accept-Language": options?.lang ?? "en",
          origin: "https://music.youtube.com",
        },
      }
    );
    return parseArtistsSearchBody(await response.json());
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { parseArtistsSearchBody, searchArtists };
