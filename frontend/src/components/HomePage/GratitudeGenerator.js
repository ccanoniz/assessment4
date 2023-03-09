import { useState } from "react";
import Papa from "papaparse";
import Button from 'react-bootstrap/Button';

/*
This is the component in the homepage that displays random stuffs to grateful for
- Used Papaparse library to get the information from a google sheet that is publicly viewable 
- There is a default text when the homepage is displayed 
- When you click the "Get More Idea" button it will randomly pick a text in the google sheet
*/

function GratitudeGenerator() {

  const [dataList, setDataList] = useState({})
  const [itemToDisplay, setItemToDisplay] = useState("Opposable thumbs: Think about all the tasks opposable thumbs make possible: holding most things, hitch hiking, thumbs up signs, thumbs down signs, thumb wars, playing marbles, coin tosses, fastening paper clips, texting, and so many more things.")

  Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQV4_G3nQiD4tGWZ1CBZ_F2Z6MUfExFj5GaOADCRYPlQSF4P-LmjsfTn6XRIV6FmhzyhiPHXbDAY6ZX/pub?gid=0&single=true&output=csv", {
    download: true,
    header: true,
    complete: (results) => {
      setDataList(results.data);
    },
  });

  const handleGetIdea = () => {
    const randonNumber =  Math.floor(Math.random() * (dataList.length - 1)) + 1
    console.log(dataList[randonNumber].stuffs)
    setItemToDisplay(dataList[randonNumber].stuffs)

  }

  return (
    <>
    <div className="idea-generator-div">
      <h2 className="idea-generator-header">Random Things To Be Grateful For</h2>
      <p className="idea-generator-paragraph">{itemToDisplay}</p>
      <Button variant="outline-primary" size="lg" onClick={handleGetIdea}>Get More Idea</Button>
    </div>
    </>

  )
    
}

export default GratitudeGenerator;