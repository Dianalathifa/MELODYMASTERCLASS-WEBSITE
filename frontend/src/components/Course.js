import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar/Navbar";
import { Modal, Button, Form } from "react-bootstrap";

function MateriPage() {
  const [dataMateri, setDataMateri] = useState([]);
  const [id, setId] = useState("");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState("");
  const [jenisMateri, setJenisMateri] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State untuk form tambah data
  const [newJudul, setNewJudul] = useState("");
  const [newDeskripsi, setNewDeskripsi] = useState("");
  const [newGambar, setNewGambar] = useState(null);
  const [newMateriType, setNewMateriType] = useState(false);

  // State untuk form edit data
  const [editJudul, setEditJudul] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editGambar, setEditGambar] = useState(null);
  const [editMateriType, setEditMateriType] = useState(false);

  useEffect(() => {
    getDataMateri();
  }, [selectedCategory]);

  const getDataMateri = async () => {
    try {
      let endpoint = 'http://localhost:8080/materi';

      // Adjust the endpoint based on the selected category
      if (selectedCategory) {
        endpoint += `/${selectedCategory}`;
      }

      const response = await axios.get(endpoint);
      setDataMateri(response.data.materi);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showModal = (data) => {
    setId(data.id);
    setJudul(data.judul);
    setDeskripsi(data.deskripsi);
    setGambar(data.gambar);
    setJenisMateri(data.jenis_materi);
    setShow(true);
  };

  const closeModal = () => {
    setId("");
    setJudul("");
    setDeskripsi("");
    setGambar("");
    setJenisMateri("");
    setShow(false);
  };

  const showAddModal = () => {
    setNewJudul("");
    setNewDeskripsi("");
    setNewGambar(null);
    setNewMateriType(false);
    setShowAdd(true);
  };

  const closeAddModal = () => {
    setNewJudul("");
    setNewDeskripsi("");
    setNewGambar(null);
    setNewMateriType(false);
    setShowAdd(false);
  };

  const addDataMateri = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("judul", newJudul);
    formData.append("deskripsi", newDeskripsi);
    formData.append("gambar", newGambar);
    formData.append("jenis_materi", newMateriType ? 'premium' : 'gratis');

    try {
      const response = await axios.post('http://localhost:8080/api/materi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 200) {
        alert(response.data.messages.success);
        getDataMateri();
        closeAddModal();
      } else {
        alert("Data Gagal Ditambahkan: " + response.data.messages.error);
      }
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Data Gagal Ditambahkan. Lihat konsol untuk detail.");
    }
  };

  const showEditModal = (data) => {
    setId(data.id);
    setEditJudul(data.judul);
    setEditDeskripsi(data.deskripsi);
    setEditGambar(null);
    setEditMateriType(data.jenis_materi === "premium");
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setId("");
    setEditJudul("");
    setEditDeskripsi("");
    setEditGambar(null);
    setEditMateriType(false);
    setShowEdit(false);
  };

  const editDataMateri = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("judul", editJudul);
    formData.append("deskripsi", editDeskripsi);
    formData.append("gambar", editGambar);
    formData.append("jenis_materi", editMateriType ? 'premium' : 'gratis');

    try {
      const response = await axios.put(`http://localhost:8080/update/materi/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });

      if (response.data.status === 200) {
        alert(response.data.messages.success);
        getDataMateri();
        closeEditModal();
      } else {
        alert("Data Gagal Diubah: " + response.data.messages.error);
      }
    } catch (error) {
      console.error("Error editing data:", error);
      alert("Data Gagal Diubah. Lihat konsol untuk detail.");
    }
  };

  const showModalDelete = (data) => {
    setId(data.id);
    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setShowDelete(false);
  };

  const deleteDataMateri = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/materi/${id}`);
      alert(response.data.messages);
      getDataMateri();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Data Gagal Dihapus. Lihat konsol untuk detail.");
    } finally {
      closeModalDelete();
    }
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBerlanggananClick = () => {
    // Navigate to the About.js page (you may need to adjust this based on your router setup)
    window.location.href = '/about';
  };

  const handleAksesMateriClick = () => {
    // Handle access to free content (you may need to implement specific logic here)
    alert('Redirect or perform action for accessing free content');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
    <Navbar />
      <div className="flex-course" style={{ marginTop: '150px' }}>
        <div className='col-15 p-1'>
          <div className="mb-3">
            <CButton
              className={`btn btn-custom me-2 ${selectedCategory === null && 'active'}`}
              onClick={() => handleCategoryClick(null)}
            >
              All
            </CButton>
            <CButton
              className={`btn btn-custom me-2 ${selectedCategory === 'gratis' && 'active'}`}
              onClick={() => handleCategoryClick('gratis')}
            >
              Free
            </CButton>
            <CButton
              className={`btn btn-custom me-2 ${selectedCategory === 'premium' && 'active'}`}
              onClick={() => handleCategoryClick('premium')}
            >
              Premium
            </CButton>
          </div>
        <CRow xs="1" sm="2" md="3">
          {dataMateri
            .filter((item) => selectedCategory === null || item.jenis_materi === selectedCategory)
            .map((item, index) => (
              <CCol key={index} className="mb-4">
                <CCard className="h-100">
                  <img
                    src={`http://localhost:8080/gambar/${item.gambar}`}
                    alt={item.judul}
                    className="card-img-top"
                    style={{ maxHeight: '200px'}}
                  />
                  <CCardBody>
                    <h5 className="card-title">{item.judul}</h5>
                    <p className="card-text">{item.deskripsi}</p>
                    <p className="card-text">{item.jenis_materi}</p>
                    {item.jenis_materi === 'premium' && (
                      <CButton
                      className='btn btn-purple text-white'
                      style={{ backgroundColor: '#AA72C3', borderColor: '#AA72C3' }}
                        onClick={handleBerlanggananClick}
                      >
                        Berlangganan
                      </CButton>
                    )}
                    {item.jenis_materi === 'gratis' && (
                      <CButton
                      className='btn btn-purple text-white'
                      style={{ backgroundColor: '#AA72C3', borderColor: '#AA72C3' }}
                        onClick={handleAksesMateriClick}
                      >
                        Akses Materi
                      </CButton>
                    )}
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
        </CRow>
        </div>
      </div>

      <Modal show={showEdit} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Materi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editDataMateri}>
            <Form.Group className="mb-3" controlId="formEditJudul">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEditJudul(e.target.value)}
                value={editJudul}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEditDeskripsi">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setEditDeskripsi(e.target.value)}
                value={editDeskripsi}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEditGambar">
              <Form.Label>Gambar</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setEditGambar(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEditJenisMateri">
              <Form.Label>Jenis Materi</Form.Label>
              <Form.Check
                type="radio"
                label="Gratis"
                checked={!editMateriType}
                onChange={() => setEditMateriType(!editMateriType)}
              />
              <Form.Check
                type="radio"
                label="Premium"
                checked={editMateriType}
                onChange={() => setEditMateriType(!editMateriType)}
              />
            </Form.Group>
            <Button type='submit' color="plum" className="px-4">
              Simpan Perubahan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={closeModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus data ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteDataMateri}>
            Hapus
          </Button>
          <Button variant="secondary" onClick={closeModalDelete}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MateriPage;
