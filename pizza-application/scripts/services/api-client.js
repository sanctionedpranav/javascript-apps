// Network API client for Pizza Application

import { URL } from "../../utils/constant";

async function networkCall() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    
    return data;

  } catch(err){
    console.log("Problem in API call", err);
    throw err;
    
  }  
}

export default networkCall;