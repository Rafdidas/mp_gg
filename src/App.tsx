import React from 'react';

import './App.css';

function App() {

    const API_KEY = process.env.REACT_APP_MAPLE_KEY;
    // const characterName = "CHARACTER NAME";
    const urlString = "https://open.api.nexon.com/maplestory/v1/ranking/overall?date=2023-12-22";
    
    const answer = fetch(urlString, {
        headers:{
          "x-nxopen-api-key": API_KEY || '',
        },
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
    
    console.log(answer)

  return (
    <div className="App">
     
    </div>
  );
}

export default App;
