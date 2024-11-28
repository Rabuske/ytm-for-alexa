import {
  searchForAlbum,
  searchForArtist,
  searchForMusic,
  searchForPlaylist,
  getPlaylist
} from "./search-api/youtube-music-api.js";

import azureFunctions from '@azure/functions';

async function search(request) {
  console.log(request);
  const searchTerm = request.query.get('query');
  const playlistId = request.query.get('playlistId');
  if (!searchTerm && !playlistId) {
    return ({
      status: 400 /* Defaults to 200 */,
      body: "Missing query or playlistId",
    });    
  }

  const fullResults = request.query.get('fullResults');
  const options = { fullResults: fullResults || false };

  // Start by playing an specific playlist
  if (playlistId) {
    try {
      const data = await getPlaylist(playlistId, options);
      return ({ jsonBody: data });
    } catch (err) {
      return ({ jsonBody: err, status: 500 });
    }
  }

  // Parse all possible parameters sent in the body
  const searchType = request.query.get('searchType') || 'ALL';
    
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
      default :
        data = await searchForMusic(searchTerm, options);
      };
  } catch (err) {
    return ({ jsonBody: err, status: 500});
  }
  return ({ jsonBody: data });
};

azureFunctions.app.http('search-api', {
  methods: ['GET'],
  handler: async (request) => {
    return await search(request);
  }
});

export { search };
