const baseURL = process.env.REACT_APP_BASE_URL
const url = `http://${baseURL}/api`



const fetchPostByID = async (postID) => {
  const response = await fetch(`${url}/${postID}`);
  const data = await response.json();
  return data;
};

const fetchAllPost = async (postID) => {
  const response = await fetch(`${url}`);
  const data = await response.json();
  return data;
};

const addPost = async (postObject) => {
  const response = await fetch(`${url}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(postObject)
    }
  )
  const data = await response.json();
  console.log("Add POST API response:")
  console.log(data)
  return data;
}

export {
  fetchPostByID, 
  fetchAllPost,
  addPost

}; 