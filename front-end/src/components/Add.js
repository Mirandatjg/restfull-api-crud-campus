import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const redirect = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [errors, setErrors] = useState([]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("major", major);
    formData.append("address", address);
    formData.append("image", image);

    fetch("http://127.0.0.1:8000/api/data", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 422) {
          setErrors(json.validator);
        } else {
          redirect("/");
        }
      });
  };

  return (
    <>
      <div className="container">
        <button
          onClick={() => {
            redirect("/");
          }}
        >
          Kembali
        </button>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
            <label htmlFor="gender">Jenis Kelamin</label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Pilih Jenis Kelamin</option>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {errors.gender && <span className="red">{errors.gender[0]}</span>}
          </div>
          <div>
            <label htmlFor="major">Jurusan</label>
            <select
              name="major"
              id="major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option>Pilih Jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Teknik Komputer">Teknik Komputer</option>
            </select>
            {errors.major && <span className="red">{errors.major[0]}</span>}
          </div>
          <div>
            <label htmlFor="address">Alamat</label>
            <textarea
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            {errors.address && <span className="red">{errors.address[0]}</span>}
          </div>
          <div>
            <label htmlFor="image">Gambar</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
            />
            {errors.image && <span className="red">{errors.image[0]}</span>}
          </div>
          <div>
            <button type="submit">Simpan</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Add;
