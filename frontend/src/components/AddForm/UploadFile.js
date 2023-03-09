import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

// Function for Uploading a photo file to your post 

function UploadFile(props) {
  return(
    <>
    <Modal show={props.show} onHide={props.handleClose} id="modal-photo">
        <Modal.Header closeButton>
        <Modal.Title>Add Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add a photo to your post</Form.Label>
            <Form.Control type="file" onChange= {props.handleSelectImage}/> <br />
            {props.trigger? props.handleUploadFile() : null }
            {props.imageURL ? <img src={props.imageURL} width="100" /> : null}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSavePhoto}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    
    
    </>
  )

}

export default UploadFile
