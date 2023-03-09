import { useEffect, useState } from 'react'
import Axios from "axios"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function UploadFile () {

  const [imageToUpload, setImageToUpload] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [trigger, setTrigger] = useState(false)
  const [show, setShow] = useState(false);

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

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Add a photo to your post</Form.Label>
        <Form.Control type="file" onChange= {handleSelectImage}/>

        {trigger? handleUploadFile() : null }
        
        {imageURL ? <img src={imageURL} width="100" height="100"/> 
          : null}
      
      </Form.Group>
    </>
  )
}

export default UploadFile();