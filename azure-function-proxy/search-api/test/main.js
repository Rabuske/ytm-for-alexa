const funcToTest = require("../index");

async function mainTest(){
  let context = {};
  const req = {
    "query": {
      "query": "pitty"
    }
  };
  await funcToTest(context, req);
  console.log(context);
}

mainTest();

