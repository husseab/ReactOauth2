import { useAuth0 } from "@auth0/auth0-react";
import "./App.css"
import axios from "axios";
function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently
  } = useAuth0();

  function callAPI() {
    axios.get("http://localhost:4000/")
    .then(response => console.log("res.data", response.data))
    .catch(err => console.log(err.message))
  }
 async function callProtectedAPI() {
  try {
    const token = await getAccessTokenSilently();
    const response = await axios.get("http://localhost:4000/protected", {
      headers: { Authorization: `Bearer ${token}`}
    })
    console.log(response.data)
  }
  catch(error) {
    console.log(error.message)
  }
  }

  return (
    <div className="App">
      <h1>Auth0 authentication</h1>
      <ul>
        <li><button onClick={loginWithPopup}>Log in with Popup</button></li>
        <li><button onClick={loginWithRedirect}>Log in with Redirect</button></li>
        <li><button onClick={logout}> Log out</button></li>
      </ul>
      <h3>User is {isAuthenticated ? "logged in." : "not logged in." }</h3>
      <ul>
        <li>
          <button onClick={callAPI}>Call API Route</button>
        </li>
        <li>
          <button onClick={callProtectedAPI}>Call Protected API Route</button>
        </li>
      </ul>
      {isAuthenticated && (
      <pre style={{textAlign: 'start'}}>{JSON.stringify(user,null,2)}</pre>)}
    </div>
  );
}

export default App;
