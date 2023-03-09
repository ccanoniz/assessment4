import { useState } from 'react'
import { addPost } from '../../api/GratitudeApi'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Axios from "axios"



function AddPost() {
  const [ successMessage, setSuccessMessage ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ posts, setPosts] = useState([])
  const [ error, setError] = useState("")
  const [ show, setShow] = useState(false)

  const [imageToUpload, setImageToUpload] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [trigger, setTrigger] = useState(false)

  const handleClose = () => setShow(false);
  const handleAddPhoto = () => {
    setShow(true)
  } 

  const handleSelectImage = (e) => {
    setImageToUpload(e.target.files[0])
    console.log(imageToUpload)
    setTrigger(true)
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
      photo: imageURL,
      video: imageURL,
      giphy: imageURL
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

     <Modal show={show} onHide={handleClose}>
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    <div> 
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postTextInput">
           <Form.Label>What am I grateful for today?</Form.Label>
           <Form.Control as="textarea" placeholder="Thank you for ..." rows={5} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageInput">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" placeholder="Enter Image URL" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="videoInput">
          <Form.Label>Video URL</Form.Label>
          <Form.Control type="text" placeholder="Enter Video URL" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="giphyInput">
          <Form.Label>Giphy URL</Form.Label>
          <Form.Control type="text" placeholder="Enter Giphy URL" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <img src={imageURL} />


    </div>



    </>
  )

}

export default AddPost
