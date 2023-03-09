import {Button, Container, Form, Row} from 'react-bootstrap'
import { useState } from 'react'
import { addPost } from '../../api/GratitudeApi'
import UploadFile  from './UploadFile'
import GiphyPost from '../Giphy/GiphyPost'
import "../Giphy/Giphy.css"
import "./AddForm.css"
import { useNavigate } from "react-router-dom"


import Axios from 'axios'

function AddFormTest() {

  const navigate = useNavigate()

  const [ show, setShow] = useState(false)
  const [ showGif, setShowGif] = useState(false)

  
  // useState for Add Post
  const [ successMessage, setSuccessMessage ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ status, setStatus] = useState("")
  const [ postText, setPostText] = useState("")

  // useState for Upload Files
  const [imageToUpload, setImageToUpload] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [trigger, setTrigger] = useState(false)
  const [finalURL, setFinalURL] = useState("")

  //useState for Adding Gif
  const [searchTerm, setSearchTerm] = useState("")
  const [listGifs, setListGifs] =  useState([])
  const [selectedGif, setSelectedGif] = useState("")


  //Add Photo -  This function handles when user upload the file from their comp
  const handleSelectImage = (e) => {
    setImageToUpload(e.target.files[0])
    setTrigger(true)
    
  }

  //Add Photo -  This function handles when you click Save in the Upload Photo Modal
  const handleSavePhoto = () => {
    console.log("Image URL")
    console.log(imageURL)


    setFinalURL(imageURL)
    console.log(finalURL)
    setShow(false)
  }

  const handleSaveGif = (e) => {
    setFinalURL(selectedGif)
    setShowGif(false)
  }

  //Add Photo -  This function call the Cloudinary API
  const handleUploadFile = (e) => {
    console.log(imageToUpload)
    const formData = new FormData()
    formData.append("file", imageToUpload)
    formData.append("upload_preset", "nwwq4hji");

    Axios.post("https://api.cloudinary.com/v1_1/dnstta9dr/image/upload", formData)
    .then((response) =>{
      setImageURL(response.data.url)

    })

    setTrigger(false)

  }

  //Function that handles when user wants to save the thank you post- Creates the post object
  const handleAddPost = (e) => {
    console.log("Testing Clicking Add in the Add Form")
    e.preventDefault()
    const postObject = {
      post_text: postText,
      photo: finalURL,
      video: finalURL,
      giphy: finalURL
    }
    console.log("THIS IS POST OBJECT")
    addPost(postObject)
  }


  // Function that calls the Add API 
  const addPost = async (postObject) => {
    console.log("Calling the POST API")
    const baseURL = process.env.REACT_APP_BASE_URL
    const url = `http://${baseURL}/api/`
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postObject)
    }
    const resp = await fetch(url, context)
    const body = await resp.json()
    if (resp.status === 400) {
      setStatus(body)
    } else {
      alert("Successfully Added!!!")
      window.location.reload();
    }
  }

  const handleAddPhotoModal = () => {
    setShow(true)
  } 

  const handleClose = () => {
    setShow(false)
  } 

  const handleAddGifModal = () => {
    setShowGif(true)
  } 

  const handleCloseGifModal = () => {
    setShowGif(false)
  } 

  const handleSelectGif = (e) => {
    console.log(e.target)
    // image.style.border = "5px solid yellow"  ---> Trying to change border of image when selected
    setSelectedGif(e.target.src)
  }

  //Add Gif =  Calls the Giphy API to search for images 
  //Note:  Limited to 5 photos for now
  const handleSubmit = async event => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=nosPEGtuw5WMTmOAStstmj0LoLk3dUo9&q=${searchTerm}&limit=5&offset=0&rating=g&lang=en`)
      const body = await res.json()
      console.log(body.data)
      setListGifs(body.data)
  }

  const renderGifs = () => {
    return listGifs.map(item =>
        <img key={item.id}
            className="gifphyImages"
            src={item.images.fixed_height.url} 
            onClick={handleSelectGif} />
    )
   
  }

  return(
    <>
    <h2 className="add-form-header">What I am grateful for today?</h2>
    <Container className="addFormDiv">
      <Row>
        <div>
        <Button onClick={handleAddPhotoModal}>Add Photo</Button>{" "}
        <Button variant="primary" onClick={handleAddGifModal}>Add Gif</Button>
        </div>
      </Row>

      <Row>
        <div className="add-from-image-viewer">
          {<img src={finalURL} /> ? <img src={finalURL} />: null }
        </div>
      </Row>

      <Row>       
          <Form layout="vertical">
          <Form.Group className="mb-3" controlId="postTextInput">
            <Form.Control 
              as="textarea" 
              placeholder="Thank you for ..." 
              rows={10}
              onChange={(e) => setPostText(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleAddPost} size="lg">Add</Button>
          <br />
        </Form>
        <br />
      </Row>
  
      <UploadFile
          show={show}
          handleClose={handleClose}
          handleSelectImage={handleSelectImage}
          trigger={trigger}
          handleUploadFile ={handleUploadFile}
          imageURL={imageURL}
          handleSavePhoto={handleSavePhoto}
       />

      <GiphyPost
        showGif = {showGif}
        handleAddGifModal = {handleAddGifModal}
        handleCloseGifModal = {handleCloseGifModal}
        searchTerm = {searchTerm}
        setSearchTerm = {setSearchTerm}
        handleSubmit = {handleSubmit}
        listGifs = {listGifs}
        renderGifs = {renderGifs}
        handleSaveGif = {handleSaveGif}
        
      />
    </Container>
    </>
  )

}

export default AddFormTest
