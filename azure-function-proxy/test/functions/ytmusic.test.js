import { ytmusic as funcToTest } from "../../src/functions/ytmusic.js"
import pkg from '@azure/functions'

async function mainTest(){
  let context = {};
  let request = new pkg.HttpRequest({
    url: 'http://localhost/ytmusic',
    method: 'GET',
    query: {
      videoId: "qrO4YZeyl0I"
    },
});
  const response = await funcToTest(request);
  console.log(response);
}

mainTest();