const Alexa = require("ask-sdk-core");
const AWS = require("aws-sdk");
const Adapter = require("ask-sdk-dynamodb-persistence-adapter");
const constants = require("./constants");
const youtubeAPI = require("./youtube-music-api");
const axios = require("axios");

const welcomePhrases = [
  "Fale!",
  "Fale!",
  "Fale!",
  "Fala Pandorinha.",
  "Fala Lúcifer.",
  "Fala mané.",
  "Qual é?",
];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput = welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)];

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Se você não sabe usar isso, não tem como eu te ajudar";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Tchau babaca!";
    return handlerInput
        .responseBuilder
        .speak(speakOutput)
        .addAudioPlayerStopDirective()
        .getResponse();
  },
};

const ResumePlaybackIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.PlayIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.ResumeIntent")
    );
  },
  handle(handlerInput) {
    return controller.play(handlerInput, "Continuando ");
  },
};

const StartOverIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.StartOverIntent"
    );
  },
  handle(handlerInput) {
    console.log("StartOverHandler");
    return controller.playFromStart(handlerInput, "E lá vamos nós ");
  },
};

const NextPlaybackIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
        "PlaybackController.NextCommandIssued" ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.NextIntent")
    );
  },
  handle(handlerInput) {
    console.log("NextPlaybackHandler");
    return controller.playNext(handlerInput);
  },
};

const PreviousPlaybackIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
        "PlaybackController.PreviousCommandIssued" ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.PreviousIntent")
    );
  },
  handle(handlerInput) {
    console.log("PreviousPlaybackHandler");
    return controller.playPrevious(handlerInput);
  },
};

const PauseAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.PauseIntent")
    );
  },
  handle(handlerInput) {
    console.log("PauseAndStopIntentHandler");
    return controller.stop(handlerInput, "Pausing ");
  },
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Você é burro cara, tenta falar de novo.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};

const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `Recebi o intent ${intentName} e não consegui processá-lo.`;

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Foi mal trouxa, não sei o que tá dando errado por aqui. Tenta de novo!";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const PlayMusicIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "TocarMusica" ||
       Alexa.getIntentName(handlerInput.requestEnvelope) === "PlaySong"
      )
    );
  },
  handle(handlerInput) {
    console.log("StartPlaybackHandler");
    
    let randomMode = false;
    if(handlerInput.requestEnvelope.request.intent.slots.randomMode.value)
    {
        randomMode = true;
    }
    
    const searchTerms = {
      artistName:
        handlerInput.requestEnvelope.request.intent.slots.artistName.value,
      musicName:
        handlerInput.requestEnvelope.request.intent.slots.musicName.value,
      groupName:
        handlerInput.requestEnvelope.request.intent.slots.groupName.value,
      albumName:
        handlerInput.requestEnvelope.request.intent.slots.albumName.value,
      playlistName:
        handlerInput.requestEnvelope.request.intent.slots.playlistName.value,   
      randomMode:
        randomMode,
    }
    
    searchTerms.query = `${searchTerms.playlistName || ""} ${searchTerms.musicName || ""} ${searchTerms.albumName || ""} ${searchTerms.groupName || ""} ${searchTerms.artistName || ""}`.trim();

    if (searchTerms.query.includes("jão") || searchTerms.query.includes("jao")) {
      const speakOutput = "Aqui nessa casa não se ouve Jão. Peça uma outra.";
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }  
    return controller.search(handlerInput, searchTerms, null);
  },
};

const MyRadioIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "MyRadio"
      )
    );
  },
  handle(handlerInput) {
      console.log("MyRadioIntentHandler");
      return controller.playPlaylist(handlerInput, "RDAMPLPLaEfP183lgZ1PcXSHu4bskUyM8fmLaw54");
  },
};

const MyRadioRockIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "MyRadioRock"
      )
    );
  },
  handle(handlerInput) {
      console.log("MyRadioRockIntentHandler");
      return controller.playPlaylist(handlerInput, "RDAMPLPLaEfP183lgZ0sz4htGL1y6LkXNSw7T0ri");
  },
};

const MyPlaylistIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "MyPlaylist"
      )
    );
  },
  handle(handlerInput) {
      console.log("MyPlaylistIntentHandler");
      return controller.playPlaylist(handlerInput, "PLaEfP183lgZ1PcXSHu4bskUyM8fmLaw54");
  },
};

const MyPlaylistRockIntentHandler = {
  async canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "MyPlaylistRock"
      )
    );
  },
  handle(handlerInput) {
      console.log("MyPlaylistRockIntentHandler");
      return controller.playPlaylist(handlerInput, "PLaEfP183lgZ0sz4htGL1y6LkXNSw7T0ri");
  },
};

const controller = {
  async search(handlerInput, searchTerms) {
    console.log("Search");
    console.log(searchTerms);
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const data = await searchForVideos(searchTerms);
    playbackInfo.videoIds = data.videoIds;
    if(searchTerms.randomMode)
    {
        shuffleArray(playbackInfo.videoIds, false);
    }else if(searchTerms.musicName)
    {
        shuffleArray(playbackInfo.videoIds, true);
    }
    playbackInfo.currentVideoIndex = 0;
    playbackInfo.offsetInMilliseconds = 0;
    return this.play(handlerInput, "Tocando ");
  },
  async playPlaylist(handlerInput, playlistId)
  {
    console.log("playPlaylist");
    console.log(playlistId);
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const data = await getPlaylist(playlistId);
    playbackInfo.videoIds = data.videoIds;
    shuffleArray(playbackInfo.videoIds);
    playbackInfo.currentVideoIndex = 0;
    playbackInfo.offsetInMilliseconds = 0;
    return this.play(handlerInput, "Tocando ");
  },
  async play(handlerInput, message) {
    console.log("Play");
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const { videoIds, offsetInMilliseconds, currentVideoIndex } = playbackInfo;
    const videoId = videoIds[currentVideoIndex];
    let audioFormat;
    try{
        audioFormat = await getAudioInformation(videoId);
    } catch(err){
        return controller.playNext(handlerInput);
    }
    handlerInput.responseBuilder
      .withShouldEndSession(true)
      .addAudioPlayerPlayDirective(
        "REPLACE_ALL",
        audioFormat.url,
        videoId,
        offsetInMilliseconds
    );
    if (message) {
      handlerInput.responseBuilder.speak(
        `${message} ${audioFormat.title}`
      );
    }

    // TODO: maybe add a card with the thumbnail of the video
    const cardTitle = `${audioFormat.title}`;
    const cardContent = `Playing ${audioFormat.title}`;
    return handlerInput.responseBuilder
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  },
  async playFromStart(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    playbackInfo.offsetInMilliseconds = 0;
    return this.play(handlerInput);
  },
  async stop(handlerInput, message) {
    return handlerInput.responseBuilder
      .speak(message)
      .addAudioPlayerStopDirective()
      .getResponse();
  },
  async playNext(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    console.log("PlayNext");
    if (playbackInfo.currentVideoIndex === playbackInfo.videoIds.length - 1) {
      //Reached the end of the playList, fetch nextPage
      await fetchNextVideos(handlerInput);
    }
    playbackInfo.currentVideoIndex += 1;
    playbackInfo.offsetInMilliseconds = 0;
    return this.play(handlerInput);
  },
  async playPrevious(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    if (playbackInfo.currentVideoIndex === 0) {
      return handlerInput.responseBuilder
        .speak("Você tá no começo da playlist trouxa!")
        .addAudioPlayerStopDirective()
        .getResponse();
    }
    playbackInfo.currentVideoIndex = playbackInfo.currentVideoIndex - 1;
    playbackInfo.offsetInMilliseconds = 0;
    return this.play(handlerInput);
  },
};

const searchForVideos = async (searchTerms) => {
    const response = await axios({
        method: 'get',
        url: constants.config.videoSearchURL,
        params: {
            query: searchTerms.query,
        },
        data: searchTerms,
      });
    return response.data;
};

const getPlaylist = async (playlistId) => {
    const response = await axios({
        method: 'get',
        url: constants.config.videoSearchURL,
        params: {
            playlistId: playlistId,
        },
      });
    return response.data;
};

const getAudioInformation = async (videoId) => {
    console.log("Getting VIDEO INFO")
    try{
        const response = await axios({
            method: 'get',
            url: constants.config.videoInfoURL,
            params: {
                videoId: videoId,
            },
          });
        return response.data;
    } catch(err){
        console.log(JSON.stringify(err));
        throw err;
    }
};

const getPlaybackInfo = async (handlerInput) => {
  const data = await handlerInput.attributesManager.getPersistentAttributes();
  return data.playbackInfo;
};

const fetchNextVideos = async (handlerInput) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  console.log("fetchNextVideos");
  const playbackInfo = await getPlaybackInfo(handlerInput);
  // build playlist based on last played song
  const lastVideoId = playbackInfo.videoIds[playbackInfo.videoIds.length - 1];
  const nextVideos = await searchForVideos({playlistName: lastVideoId, query: lastVideoId});
  shuffleArray(nextVideos.videoIds);
  playbackInfo.videoIds = playbackInfo.videoIds.concat(nextVideos.videoIds);
  playbackInfo.videoIds = playbackInfo.videoIds.filter(onlyUnique);
};

const AudioPlayerEventHandler = {
  canHandle(handlerInput) {
    // Handles all audio player related events
    return handlerInput.requestEnvelope.request.type.startsWith("AudioPlayer.");
  },
  async handle(handlerInput) {
    const audioPlayerEventName =
      handlerInput.requestEnvelope.request.type.split(".")[1];
    const playbackInfo = await getPlaybackInfo(handlerInput);
    console.log(audioPlayerEventName);
    switch (audioPlayerEventName) {
      case "PlaybackStarted":
        playbackInfo.token = handlerInput.requestEnvelope.request.token;
        playbackInfo.isCurrentlyPlaying = true;
        playbackInfo.hasNextSongQueued = false;
        break;
      case "PlaybackFinished":
        playbackInfo.isCurrentlyPlaying = false;
        if (
          playbackInfo.currentVideoIndex ===
          playbackInfo.videoIds.length - 1
        ) {
          // This shouldn't happen, but just in case, queue next video
          await queueNextVideo(handlerInput);
        } else {
          playbackInfo.currentVideoIndex = playbackInfo.currentVideoIndex + 1;
        }
        if(!playbackInfo.hasNextSongQueued){
            controller.play(handlerInput);
        }
        break;
      case "PlaybackStopped":
        playbackInfo.token = handlerInput.requestEnvelope.request.token;
        playbackInfo.offsetInMilliseconds =
          handlerInput.requestEnvelope.request.offsetInMilliseconds;
        break;
      case "PlaybackNearlyFinished":
          await queueNextVideo(handlerInput);
          break;
      case "PlaybackFailed":
        console.log(
          "Playback Failed : %j",
          handlerInput.requestEnvelope.request.error
        );
        //Skip to the next audio
        return controller.playNext(handlerInput);
      default:
        throw new Error("Should never reach here!");
    }
    return handlerInput.responseBuilder.getResponse();
  },
};

const queueNextVideo = async (handlerInput) => {
  var canPlay = false;
  var retries = 0;
  const playbackInfo = await getPlaybackInfo(handlerInput);
  while(!canPlay && retries < 10)
  {
      try{
          if (
            playbackInfo.currentVideoIndex ===
            playbackInfo.videoIds.length - 1
          ) {
            //Reached the end of the playList, fetch nextPage
            console.log("End of Playlist, search next");
            await fetchNextVideos(handlerInput);
            // Something went wrong, return to the start of playlist
            if(playbackInfo.currentVideoIndex === playbackInfo.videoIds.length - 1){
                playbackInfo.currentVideoIndex = 0;
            }
          }
          let nextAudioId;
          if (playbackInfo.isLoopingSongs) {
            nextAudioId = playbackInfo.videoIds[playbackInfo.currentVideoIndex];
          } else {
            nextAudioId =
              playbackInfo.videoIds[playbackInfo.currentVideoIndex + 1];
          }
          const audioFormat = await getAudioInformation(nextAudioId);
          const expectedPreviousToken = playbackInfo.token;
          const offsetInMilliseconds = 0;
          handlerInput.responseBuilder.addAudioPlayerPlayDirective(
            "ENQUEUE",
            audioFormat.url,
            nextAudioId,
            offsetInMilliseconds,
            expectedPreviousToken
          );                  
          canPlay = true;
          playbackInfo.hasNextSongQueued = true;
      } catch(err){
          retries++;
          playbackInfo.currentVideoIndex = playbackInfo.currentVideoIndex === playbackInfo.videoIds.length - 1? 0 : playbackInfo.currentVideoIndex + 1;
      }
  }
}

const LoadPersistentAttributesRequestInterceptor = {
  async process(handlerInput) {
    console.log("Loading attributes from DB");
    const persistentAttributes =
      await handlerInput.attributesManager.getPersistentAttributes();
    // Check if user is invoking the skill the first time and initialize preset values
    if (!persistentAttributes.playbackInfo) {
      handlerInput.attributesManager.setPersistentAttributes({
        playbackInfo: {
          videoIds: [],
          currentVideoIndex: 0,
          offsetInMilliseconds: 0,
          isCurrentlyPlaying: false,
          isLoopingSongs: false,
          token: "",
          hasNextSongQueued: false,
        },
      });
    }
  },
};

const SavePersistentAttributesResponseInterceptor = {
  async process(handlerInput) {
    await handlerInput.attributesManager.savePersistentAttributes();
  },
};

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array, skipFirst) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        if(skipFirst && j === 0) {
            continue;
        }
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    AudioPlayerEventHandler,
    CancelAndStopIntentHandler,
    PauseAndStopIntentHandler,
    StartOverIntentHandler,
    NextPlaybackIntentHandler,
    PreviousPlaybackIntentHandler,
    ResumePlaybackIntentHandler,
    MyRadioRockIntentHandler,
    MyRadioIntentHandler,
    MyPlaylistRockIntentHandler,
    MyPlaylistIntentHandler,
    PlayMusicIntentHandler,
    SessionEndedRequestHandler,
    FallbackIntentHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LoadPersistentAttributesRequestInterceptor)
  .addResponseInterceptors(SavePersistentAttributesResponseInterceptor)
  .withPersistenceAdapter(
    new Adapter.DynamoDbPersistenceAdapter({
      tableName: process.env.DYNAMODB_PERSISTENCE_TABLE_NAME,
      createTable: false,
      dynamoDBClient: new AWS.DynamoDB({
        apiVersion: "latest",
        region: process.env.DYNAMODB_PERSISTENCE_REGION,
      }),
    })
  )
  .lambda();
