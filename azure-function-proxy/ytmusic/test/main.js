const funcToTest = require("../index");



async function mainTest(){
  let context = {};
  const req = {
    "query": {
      "videoId": "qrO4YZeyl0I"
    }
  };
  await funcToTest(context, req);
  console.log(context);
}

mainTest();

