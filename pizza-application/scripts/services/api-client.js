// Network API client for Pizza Application

import { URL } from "../../utils/constant";

function networkCall() {
  const data = fetch(URL);

  console.log("Promise is pending", data);
  data.then((res) => {
    console.log("Response is: ", res);
  }).catch((err) => {
    console.log("Error is: ", err);
  });
  console.log("Bye");
}