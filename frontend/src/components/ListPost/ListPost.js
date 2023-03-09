import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import {Button, Alert} from 'react-bootstrap'
import Axios from 'axios'
import UpdateForm from './UpdateForm'
import "./ListPost.css"


function ListPost() {
  const [post, setPost] = useState([])
  const [itemToUpdate, setItemToUpdate] = useState("")
  const [originalText, setOriginalText] =useState("")
  const [show, setShow] = useState(false)
  const [postId, setPostId] = useState("")
  const [dataUpdated, setDataUpdated] = useState(false)

  const baseURL = process.env.REACT_APP_BASE_URL
  const url = `http://${baseURL}/api`



  // Function that calls the POST API to update the post
  const getPostDetailsByID = async (idToBeUpdated) => {
    console.log("Using AXIOS")
    try {
      const response = await Axios.get(`${url}/${idToBeUpdated}`)
      setItemToUpdate(response.data)
      setOriginalText(response.data.result.post_text)
    } catch (err) {
      console.log(err)
      alert(`Oops Something Wrong: ${err}`)
    }
  };

  // Function to get all the thank you posts 
  useEffect( () => {
    async function getPosts() {
      //const base_url = process.env.REACT_APP_BASE_URL
      console.log("GETTING POST DATA USING AXIOS")
      const response = await Axios.get(`${url}/`)
      console.log(response)
      setPost(response.data.result)
      setOriginalText(response.data.result.post_text)
      setDataUpdated(false)
    }
    getPosts()
  }, [dataUpdated])

    /*Function to handle deleting a post 
     - Get the Post Id from the attribute
     - Call the delete api 
     - Show success message 
     - Set the flag(setDataUpdated) to update the data in the page 
    
    */
    const handleDelete = (e) => {
    console.log(e.target.getAttribute('post_id'))
    let item_id = e.target.getAttribute('post_id')

    Axios
      .delete(`${url}/${item_id}`)
      .then(() =>  {
        setDataUpdated(true)
        alert("Successfully Deleted!")
        console.log("Calling Get Posts API")
      })
    }
  
  // Function to get the value entered in the update form
  const handleOnChange = (event) => setOriginalText(event.target.value);

  /* Function to handle when user click on the Edit Icon
     - This function will get the POST_ID from the attribute 
  */
  const handleEdit = (e) => {
    console.log(`ID TO BE UPDATED: ${e.target.getAttribute('post_id')}`)
    getPostDetailsByID(e.target.getAttribute('post_id'))
    setShow(true)
  }
 
  //Function to close the Edit Modal 
  const handleClose = () => {
    setShow(false)
  } 

  /* Function to handle updating a post 
     - Get the Post Id from the attribute
     - Call the update api 
     - Show success message 
     - Set the flag(setDataUpdated) to update the data in the page 
     - Set the flag(setShow) to false to close the update modal     
  */
  const handlePressEnter = (e) => {
      console.log(e.target.getAttribute('post_id'))
      console.log(originalText)
      Axios
        .put(`${url}/${e.target.getAttribute('post_id')}`, {
          post_text: originalText
        })
        .then((response) => {
          console.log("Updating API")
          console.log(response.data)
          setItemToUpdate(response.data);
          setDataUpdated(true)
          console.log(dataUpdated)
          setShow(false)
          alert("Post Successfully Updated!")
        });

    
  }

  /* Function to display all thank you posts
    - Display each post details in a card 
    - Display in rows and columns  
  */

  const createGratitudeList = () => {
    return post.map( item => 
      <>
        <Card className= "cardPost" key={item.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src ={item.photo} />
          <Card.Body>
            <Card.Text>
            {/* {item.id} : */}
            {item.post_text}
            <br />
            </Card.Text>
            <div className = "cardFooter">
              <small>{new Date(item.date_created).toLocaleDateString()}{" "}</small>
              <div>
                <Button variant="primary" post_id = {item.id} onClick={handleEdit}>Edit</Button>{" "}
                <Button variant="primary" post_id = {item.id} onClick={handleDelete}>Delete</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    )
  }

  return(
    <>
      {/* <h2>List of what I am grateful for today</h2> */}
      <div className = "postList">
        {post && createGratitudeList()}
      </div>
      <div>
      <UpdateForm
          show={show}
          handleClose={handleClose}
          originalText={originalText}
          handleOnChange={handleOnChange}
          onKeyDown={handlePressEnter} 
          handlePressEnter={handlePressEnter}
          fetchPostByID={getPostDetailsByID}
          itemToUpdate={itemToUpdate}    
     
       />
    </div>
    </>
 
  )

}

export default ListPost
