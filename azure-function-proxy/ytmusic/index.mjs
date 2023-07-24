import ytdl from "ytdl-core";

async function handler (context, req) {    
    if(!req.query.videoId)
    {
        console.log(JSON.stringify(req));
        context.res = {
            status: 400, /* Defaults to 200 */
            body: "Missing videoId",
        };            
        return;
    }
    const videoId = req.query.videoId;
    const audioInfo = await ytdl.getInfo(videoId, {});
    const audioFormat = await ytdl.chooseFormat(audioInfo.formats, {
        quality: "251",
    });
    context.res = { body: audioFormat};
    if(audioInfo.player_response && audioInfo.player_response.videoDetails){
        Object.assign(context.res.body, {title: audioInfo.player_response.videoDetails.title});
    }
};

export default handler