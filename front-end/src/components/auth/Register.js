import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const redirect = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      redirect("/");
    }
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);

    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 422) {
          setErrors(json.validator);
        } else {
          redirect("/login");
        }
      });
  };
  return (
    <>
      <div className="container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="red">{errors.name[0]}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="red">{errors.email[0]}</span>}
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
            {errors.password && (
              <span className="red">{errors.password[0]}</span>
            )}
          </div>
          <div>
            <label htmlFor="password_confirmation">Ulangi Password</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Daftar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
