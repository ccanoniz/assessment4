import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Axios from "axios"

function SendEmail () {

  const handleSendingEmail = () => {
    console.log("Testing Sending Email")

    var postData = {
      email: "test@test.com",
      password: "password"
    };

    let axiosConfig = {
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "authorization": "bearer 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",
          "Access-Control-Allow-Headers":"Authorization, Content-Type, On-behalf-of, x-sg-elas-acl",
          "X-No-CORS-Reason": "https://sendgrid.com/docs/Classroom/Basics/API/cors.html",

      }
    };
    
    Axios.post("https://api.sendgrid.com/v3/mail/send", postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
    
  }
  // function createPost() {
  //   axios
  //     .post(baseURL, {
  //       title: "Hello World!",
  //       body: "This is a new post."
  //     })
  //     .then((response) => {
  //       setPost(response.data);
  //     });
  // }

  return (
    <>
    <h1>Send Thank You Note</h1>
    <div>
      <Form onSubmit={handleSendingEmail}>
        <Form.Group className="mb-3" controlId="nameInput">
           <Form.Label>Name</Form.Label>
           <Form.Control type="text" placeholder="Recipient's Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="emailInput">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="subjectInput">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Enter Subject" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="MessageInput">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" placeholder="Enter Your Message" row= {10} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send Email
        </Button>

      </Form>
    </div>
    <Button onClick={handleSendingEmail}>Testing Email</Button>

    </>
  )
}

export default SendEmail