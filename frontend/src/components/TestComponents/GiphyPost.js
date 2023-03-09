import { useEffect, useState } from 'react'

const giphy_api = "https://api.giphy.com/v1/gifs/search?api_key=nosPEGtuw5WMTmOAStstmj0LoLk3dUo9&q=thank+you&limit=25&offset=0&rating=g&lang=en"

function GiphyPost() {
  const [searchTerm, setSearchTerm] = useState("")
  const [listGifs, setListGifs] =  useState([])
  const [selectedGif, setSelectedGif] = useState("")


    const handleSelectGif = (e) => {
      console.log(e.target)
      setSelectedGif(e.target)
    }

    const handleSubmit = async event => {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=nosPEGtuw5WMTmOAStstmj0LoLk3dUo9&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`)
        const body = await res.json()
        console.log(body.data)
        setListGifs(body.data)
    }

    const renderGifs = () => {
      return listGifs.map(item => 
        <div key={item.id}>
            <img src={item.images.fixed_height.url} onClick={handleSelectGif} />
        </div>
      )
      
    }

  return (
    <>
    <h2>Giphy Post</h2>
    <input
      type = "text"
      placeholder = "Search GIFs"
      value = {searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
    />
    <button 
      type = "submit"
      onClick = {handleSubmit}>
      Go
    </button>
    <div>
      <h3>Gif Search Results</h3>
      {listGifs && renderGifs()}
      
    </div>

    </>

  )
}

export default GiphyPost

