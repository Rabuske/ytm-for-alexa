import { search as funcToTest } from "../../src/functions/search-api.js"
import pkg from '@azure/functions'

async function mainTest(){
  const json = JSON.stringify({
    fullResults: true,
    artistName: "Pitty"
  });
  let request = new pkg.HttpRequest({
      url: 'http://localhost/search-api',
      method: 'GET',
      query: {
        query: "Pitty",
        searchType: "ARTISTS",
        fullResults: true
      },
  });
  const response = await funcToTest(request);
  console.log(JSON.stringify(response));
}

mainTest();
