import { useState } from "react";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Define the handleSubmit function
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Make the POST request to the signup API
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      // Parse the response JSON
      const result = await response.json();
      console.log(result); // Log the result to view the response structure

      if (!response.ok) {
        throw new Error(result.message || "Signup failed.");
      }

    } catch (error) {
      setError(error.message); // Set the error message in state if request fails
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>} {/* Conditionally render the error message */}
      
      <form onSubmit={handleSubmit}>
        <label>
          Username:           
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        
        <label>
          Password:           
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

