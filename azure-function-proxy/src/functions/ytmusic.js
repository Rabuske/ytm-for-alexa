import pkg from '@azure/functions';
const { app, HttpResponse } = pkg;
import ytdl from "@distube/ytdl-core"; 

async function ytmusic(request) {    
    const videoId = request.query.get('videoId');
    if(!videoId)
    {
        return ({
            status: 400 /* Defaults to 200 */,
            body: "Missing query or playlistId",
        });
    }
    const audioInfo = await ytdl.getInfo(videoId, {});
    const audioFormat = ytdl.chooseFormat(audioInfo.formats, {
        quality: "251",
    });
    let body = audioFormat;
    if(audioInfo.player_response && audioInfo.player_response.videoDetails){
        Object.assign(body, {title: audioInfo.player_response.videoDetails.title});
    }
    return {jsonBody: body};    
};

app.http('ytmusic', {
    methods: ['GET'],
    handler: async (request) => {
      return await ytmusic(request);
    }
  });
  
  export { ytmusic };
