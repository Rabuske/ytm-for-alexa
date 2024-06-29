import fetch from "node-fetch";
import * as parsers from "./parsers.js";
import * as context from "./context.js";

const getArtist = async (artistId, options) => {
  try {
    const response = await fetch(
      "https://music.youtube.com/youtubei/v1/browse?key=" +
        process.env.YOUTUBE_API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          ...context.body,
          browseId: artistId,
        }),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        },
      }
    );

    let JsonData = await response.json();

    if (!JsonData) {
      throw new Error("No data returned from YouTube Music API");
    }

    return parsers.parseArtistData(JsonData, artistId);
  } catch (e) {
    console.error(e);
    return {};
  }
};

export { getArtist };
