import React from "react";
import { useNavigate } from "react-router-dom";

function List({ data, handleDelete }) {
  const redirect = useNavigate()
  const Datas = () => {
    return (
      <>
        {data.map((value, key) => {
          return (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>
                <img src={value.image} />
              </td>
              <td>{value.nirm}</td>
              <td>{value.name}</td>
              <td>{value.gender}</td>
              <td>{value.major}</td>
              <td>{value.address}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    redirect(`/edit/${value.id}`);
                  }}
                >
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(value.id)}>Hapus</button>
              </td>
            </tr>
          );
        })}
      </>
    );
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nirm</th>
            <th>Nama</th>
            <th>Jenis Kelamin</th>
            <th>Jurusan</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            <Datas />
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Data Kosong
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default List;
