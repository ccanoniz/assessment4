import { useEffect, useState } from 'react'
import Axios from "axios"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';


function UploadFileOriginal () {

  const [imageToUpload, setImageToUpload] = useState("")
  const [imageURL, setImageURL] = useState("")

  const handleSelectImage = (e) => {
    console.log(e.target.files[0])
    setImageToUpload(e.target.files[0])
    console.log(imageToUpload)
    
  }


  const handleUploadFile = (e) => {
    console.log(imageToUpload)
    const formData = new FormData()
    formData.append("file", imageToUpload)
    formData.append("upload_preset", "nwwq4hji");


    Axios.post("https://api.cloudinary.com/v1_1/dnstta9dr/image/upload", formData)
    .then((response) =>{
      console.log(response)
      console.log(response.data.url)

    })

  }

  return (
    <>
      {/* <h2>Uploading a Photo</h2>
      <div>
        <input 
          type = "file" 
          onChange= {handleSelectImage}
        />
        <button onClick ={handleUploadFile}>Upload File</button>
        <br />
        <img src={imageURL} width="100" height="100"/> 
      </div> */}

      
      <Form.Group controlId="formFile" className="mb-3">
        {console.log(imageURL)}
        {imageURL ? <img src={imageURL} width="100" height="100"/> 
          : <Form.Label>Default file input example</Form.Label>}
        
        <Form.Control type="file" onChange= {handleSelectImage}/>
      </Form.Group>

      <br />

      {/* <Button variant="primary" type="submit" onClick ={handleUploadFile}>Upload File</Button> */}
        
      
      {/* <img src={imageURL} width="100" height="100"/>  */}


      {/* <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Add Photo</Modal.Title>
          </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange= {handleSelectImage}/>
          </Form.Group>
           <Button variant="primary" type="submit" onClick ={handleUploadFile}>Upload File</Button>
           <br />
          {console.log(imageURL)}
           <img src={imageURL} width="100" height="100"/> 
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" type="submit" onClick ={handleUploadFile}>Upload File</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>

 */}

    </>
  )
}

export default UploadFileOriginal;