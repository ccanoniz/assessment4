import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import {Button, Form} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'

function ListPost() {
  const [post, setPost] = useState([])
  const [itemToUpdate, setItemToUpdate] = useState("")
  const [idToEdit, setIdToEdit] = useState("")
  const [newValue, setNewValue] = useState("")
  const [originalText, setOriginalText] =useState("")
  const [editingValue, setEditingValue] = useState(originalText)

  const fetchPostByID = async () => {
    const response = await fetch("http://127.0.0.1:8000/gratitude_api/7")
    const data = await response.json()
    console.log(data.result.id)
    setItemToUpdate(data)
    setOriginalText(data.result.post_text)
    console.log(`This is original text : ${originalText}`)
    console.log("testing set item to update")
    console.log(itemToUpdate.result.id)
  };


  useEffect( () => {
    async function getPosts() {
      //const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch("http://127.0.0.1:8000/gratitude_api/")
      const body = await res.json()
      console.log(body)
      setPost(body.result)
    }
    getPosts()
  }, [])

  const handleDelete = (e) => {
    console.log(e.target.getAttribute('post_id'))
    let item_id = e.target.getAttribute('post_id')
    fetch("http://127.0.0.1:8000/gratitude_api/" + item_id, {
      method: "DELETE"
    })
  }

  const handleOnChange = (event) => setOriginalText(event.target.value);


  const handlePressEnter = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      console.log("Pressing Enter")
      // console.log("Staring to call the update api")
      // console.log(`ID: ${itemToUpdate.result.id}`)
      // console.log(`New Value: ${newValue} `)
      console.log(originalText)

      Axios
        .put(`http://127.0.0.1:8000/gratitude_api/7`, {
          //post_text: "this is the updated photo----TESTING",
          post_text: originalText,
          photo: "https://media3.giphy.com/media/K4x1ZL36xWCf6/200.gif?cid=1a3ecaa2avz1hkywsd6f0bhye2zamahu7ecze4oi9zj2tp6k&rid=200.gif&ct=g",
          video: "https://media3.giphy.com/media/K4x1ZL36xWCf6/200.gif?cid=1a3ecaa2avz1hkywsd6f0bhye2zamahu7ecze4oi9zj2tp6k&rid=200.gif&ct=g",
          giphy: "https://media3.giphy.com/media/K4x1ZL36xWCf6/200.gif?cid=1a3ecaa2avz1hkywsd6f0bhye2zamahu7ecze4oi9zj2tp6k&rid=200.gif&ct=g"
        })
        .then((response) => {
          console.log("Updating API")
          console.log(response.data)
          setItemToUpdate(response.data);
        });

    }



  }

  const createGratitudeList = () => {
    return post.map( item => 
      <>
      <Row md={4} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col>
            <Card border="secondary" style={{ width: '18rem' }}>
               <Card.Img variant="top" src ={item.photo} />
                <Card.Body>
                {/* <Card.Title>Card Title</Card.Title> */}
                <Card.Text>
                {item.post_text}
                <br />
                {new Date(item.date_created).toLocaleDateString()}
                </Card.Text>
                <Button variant="primary" post_id = {item.id}>Edit</Button> || 
      
                <Button variant="primary" post_id = {item.id} onClick={handleDelete}>Delete</Button>
              </Card.Body>
             </Card>
        </Col>   
      ))} 
      </Row>
      </>
    )
  }

    
    // <li key={item.id}>
    //   {item.post_text} - Post: Id {item.id} 
    //   <br />
    //   <img src ={item.photo} ></img>
    //   <br/>
    //   <img src ={item.video} ></img>
    //   <br/>
    //   <img src ={item.giphy} ></img>
    //   <br />
    //   <button post_id = {item.id} onClick={handleDelete}>Delete</button>
    // </li>)
  

  return(
    <>
    <h2>List of what I am grateful for today</h2>
    <div className = "container">
      {post && createGratitudeList()}
    </div>
    
    <button onClick={fetchPostByID}>Testing Update </button>

    <div>
      <h1>Editing</h1>
         {itemToUpdate? itemToUpdate.result.post_text: null }
         {itemToUpdate? itemToUpdate.result.id: null }

         {/* {itemToUpdate.result.photo? <img src = {itemToUpdate.result.photo} />: null} */}

         <Form layout="vertical">
          <Form.Group className="mb-3" controlId="postTextInput">
             <Form.Control as="textarea" 
              //  value={itemToUpdate? itemToUpdate.result.post_text: null} 
              value = {originalText}
               rows={10} 
              //  onClick={fetchPostByID}
               onChange={handleOnChange}
               onKeyDown={handlePressEnter}
             />
          </Form.Group>
        </Form>
        <Button variant="primary" type="submit">
            Edit State 
        </Button>
    </div>


   
    </>
  )

}

export default ListPost
