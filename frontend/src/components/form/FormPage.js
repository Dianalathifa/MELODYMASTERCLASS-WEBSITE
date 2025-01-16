import { React, useState } from "react";
import axios from 'axios';
import { CCard } from '@coreui/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'; // Import file CSS

function FormPage() {
  // Deklarasi variabel nama, email, password
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    if (nama === "" || email === "" || password === "") {
      alert("Data Gagal ditambahkan, field tidak boleh ada yang kosong");
    } else {
      e.preventDefault();
      try {
        await axios.post('http://localhost:8080/api/user', {
          nama: nama,
          email: email,
          password: password
        });
        toast.success("Registrasi berhasil!", { position: "top-center" });
        window.location.href = '/';
      } catch (error) {
        toast.error("Registrasi gagal. Silakan coba lagi.", { position: "top-center" });
      }
    }
  };

  return (
    <div className='body-flex-formpage'>
      <div className="flex-formpage">
        <div className='col-10-formpage p-5'>
          <h1 className="py-1-formpage text-center text-black">Tambah Data User</h1>
          <CCard className="mb-4 bg form-container">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-black">Nama User</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  autoFocus
                  value={nama}
                  onChange={(e) => setNama(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-black">Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-black">Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type='submit' className="col-12 px-10 btn btn-success">Submit</Button>
            </Form>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
