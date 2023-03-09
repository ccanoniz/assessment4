import SendEmailApi from '../../api/SendEmailApi';

// Example component
function SendThankNote() {
  // You don't need to manage state by yourself
  // use the variables below
  const {
    loading,
    submitted,
    error,
    sendEmail
  } = SendEmailApi("https://public.herotofu.com/v1/63ca37c0-b33c-11ed-9d71-876aa2478536");

  const sendExample = () => {
    // Can be any data, static and dynamic
    sendEmail({
      example_user: "ccanoniz@gmail.com",
      example_data: new Date().toISOString(),
    });
  };

  return (
    <div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={{ margin: "1rem 0", fontSize: '2rem' }}>
          { submitted && 'Done, email was sent!' }
          { error ? `Unexpected error: ${error}` : null}
          { loading && 'Email is being sent now...' }
        </div>
        <div style={{ margin: "1rem 0" }}>
          <button onClick={sendExample}>Send test data</button>
        </div>
      </header>
    </div>
  );
}

export default SendThankNote;