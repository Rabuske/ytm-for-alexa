import { search as funcToTest} from "../index.js" 

async function mainTest(){
  console.log(funcToTest)
  let context = {};
  const req = {
    "query": {
      "query": "pitty",
      "playlistId": "VLOLAK5uy_nzQhlGNwiEXU4COhKaDvSgWXtx47jZk3E"
    },
    "body": {
      "fullResults": true
    }
  };
  await funcToTest(context, req);
  console.log(JSON.stringify(context));
}

mainTest();