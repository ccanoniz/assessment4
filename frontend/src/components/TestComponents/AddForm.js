import { useState } from 'react'
import { addPost } from '../../api/GratitudeApi'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Axios from "axios"
import GiphyPost from './GiphyPost'



function AddPost() {
  const [ successMessage, setSuccessMessage ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ posts, setPosts] = useState([])
  const [ error, setError] = useState("")
  const [ show, setShow] = useState(false)
  const [ showGif, setShowGif] = useState(false)


  const [imageToUpload, setImageToUpload] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [trigger, setTrigger] = useState(false)

  const handleClose = () => setShow(false);
  const handleCloseGif = () => setShowGif(false);

  const [searchTerm, setSearchTerm] = useState("")
  const [listGifs, setListGifs] =  useState([])
  const [selectedGif, setSelectedGif] = useState("")

  const [finalURL, setFinalURL] = useState("")


    const handleSelectGif = (e) => {
      console.log(e.target.src)
      setSelectedGif(e.target.src)
    }

    const handleSearchGif = async event => {
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

  const handleAddPhoto = () => {
    setShow(true)
  } 

  const handleAddGif = () => {
    setShowGif(true)
  } 

  const handleSelectImage = (e) => {
    setImageToUpload(e.target.files[0])
    console.log(imageToUpload)
    setTrigger(true)
  }

  const handleSaveGif = (e) => {
    setFinalURL(selectedGif)
    setShowGif(false)
  }

  const handleSavePhoto = (e) => {
    setFinalURL(imageURL)
    setShow(false)
  }


  const handleUploadFile = (files) => {
    const formData = new FormData()
    formData.append("file", imageToUpload)
    formData.append("upload_preset", "nwwq4hji");


    Axios.post("https://api.cloudinary.com/v1_1/dnstta9dr/image/upload", formData)
    .then((response) =>{
      console.log(response.data.url)
      setImageURL(response.data.url)
    })

    setTrigger(false)

  }

  const handleSubmit = (event) => {
    const {elements} = event.target
    // let postObject = {
    //   post_text: `${elements["postTextInput"].value}`,
    //   photo: `${elements["imageInput"].value}`,
    //   video: `${elements["videoInput"].value}`,
    //   giphy: `${elements["giphyInput"].value}`
    // }

    let postObject = {
      post_text: `${elements["postTextInput"].value}`,
      photo: finalURL,
      video: finalURL,
      giphy: finalURL
    }


    addPost(postObject)
    .then((json) => {
      if (json.hasOwnProperty('error')){
        console.log(json.error.details)
        setErrorMessage(`${JSON.stringify(json.error.details.messages)}`)
      }
      else{
        console.log(setSuccessMessage)
      }
    })
    // event.preventDefault()
  }

  return(
    <>
    <h2>What I am grateful for today?</h2>
     <Button variant="primary" onClick={handleAddPhoto}>
         Add Photo
     </Button>

     <Button variant="primary" onClick={handleAddGif}>
         Add Gif
     </Button>

     <Modal show={show} onHide={handleClose} id="modal-photo">
        <Modal.Header closeButton>
          <Modal.Title>Add Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add a photo to your post</Form.Label>
            <Form.Control type="file" onChange= {handleSelectImage}/>

            {trigger? handleUploadFile() : null }
        
            {imageURL ? <img src={imageURL} width="100" height="100"/> 
            : null}
      
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSavePhoto}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showGif} onHide={handleCloseGif} id="modal-gif">
        <Modal.Header closeButton>
          <Modal.Title>Add Gif</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <GiphyPost /> */}
          <input
            type = "text"
            placeholder = "Search GIFs"
            value = {searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button 
            type = "submit"
            onClick = {handleSearchGif}>
            Go
          </button>
          <div>
             <h3>Gif Search Results</h3>
            {listGifs && renderGifs()}
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseGif}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveGif}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    <div> 
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postTextInput">
           <Form.Label>What am I grateful for today?</Form.Label>
           <Form.Control as="textarea" placeholder="Thank you for ..." rows={10} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <img src={finalURL} />


    </div>



    </>
  )

}

export default AddPost
