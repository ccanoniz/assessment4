import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

function UpdateForm(props) {
  return(
    <>
    <Modal show={props.show} onHide={props.handleClose} id="modal-photo">
        <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <button onClick={props.fetchPostByID}>Testing Update </button> */}
          {/* {props.itemToUpdate? props.itemToUpdate.result.post_text: null } */}
        <Form layout="vertical">
         <Form.Group className="mb-3" controlId="postTextInput">
            <Form.Control as="textarea"
            value = {props.originalText}
            rows={10}
           //  onClick={fetchPostByID}
            onChange={props.handleOnChange}
            // onKeyDown={props.handlePressEnter}

              
            />
         </Form.Group>
       </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" post_id={props.itemToUpdate? props.itemToUpdate.result.id: null} onClick={props.handlePressEnter}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default UpdateForm
