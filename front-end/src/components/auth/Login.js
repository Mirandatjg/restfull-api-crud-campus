import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const redirect = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      redirect("/");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 401 || json.status == 422) {
          setErrors(json.message);
        } else {
          localStorage.setItem("token", json.token);
          redirect("/");
        }
      });
  };
  return (
    <>
      <div className="container">
        {errors && (
          <p
            style={{
              color: "red",
            }}
          >
            {errors}
          </p>
        )}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Masuk</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
