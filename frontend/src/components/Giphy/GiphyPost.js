import Modal from 'react-bootstrap/Modal'
import {Button, Form} from 'react-bootstrap'
import "./Giphy.css"
import SearchIcon from '@mui/icons-material/Search';

// This is the component for the GiphyModal

function GiphyPost(props) {

  return (
    <>
      <Modal size="lg" show={props.showGif} onHide={props.handleCloseGif} id="modal-gif" scrollbar={true}>
        <Modal.Header >
        <Modal.Title>Add Gif</Modal.Title>
        </Modal.Header >
        <Modal.Body>
          <div className="search-input-div"> 
          <input 
            type = "text"
            placeholder = "Search for a gif to add to your post"
            className = "gif-search-input-box"
            onChange={(e)=>props.setSearchTerm(e.target.value)}
          />
          <Button variant="outline-primary" type="submit" onClick={props.handleSubmit}><SearchIcon /></Button>
          </div>

          <div>
            {props.listGifs && props.renderGifs()}
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseGifModal}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSaveGif}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default GiphyPost

