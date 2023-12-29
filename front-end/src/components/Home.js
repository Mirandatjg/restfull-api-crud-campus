import React, { useEffect, useState } from "react";
import List from "./List";
import { useNavigate } from "react-router-dom";

function Home() {
  const redirect = useNavigate()
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirect("/login");
    } else {
      loadUserData();
      loadData();
    }
  }, []);

  const loadUserData = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUserData(json);
      });
  };

  const loadData = () => {
    fetch("http://127.0.0.1:8000/api/data")
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 200) {
          setData(json.data);
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/data/${id}/destroy`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 201) {
          loadData();
        }
      });
  };

  return (
    <>
      <div className="container">
        <button
          onClick={() => {
            redirect("/add");
          }}
        >
          Tambah Data
        </button>
        <List data={data} handleDelete={handleDelete} />
      </div>
    </>
  );
}

export default Home;
