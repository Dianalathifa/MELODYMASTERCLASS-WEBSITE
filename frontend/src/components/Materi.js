import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react';
import "bootstrap/dist/css/bootstrap.min.css";
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

  // State untuk form tambah data
  const [newJudul, setNewJudul] = useState("");
  const [newDeskripsi, setNewDeskripsi] = useState("");
  const [newGambar, setNewGambar] = useState(null);  // Gunakan null untuk mengatasi isu state tidak ter-update saat memilih ulang gambar
  const [newMateriType, setNewMateriType] = useState(false);

  // State untuk form edit data
  const [editJudul, setEditJudul] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editGambar, setEditGambar] = useState(null);  // Gunakan null untuk mengatasi isu state tidak ter-update saat memilih ulang gambar
  const [editMateriType, setEditMateriType] = useState(false);

  useEffect(() => {
    getDataMateri();
  }, []);

  const getDataMateri = async () => {
    try {
      const response = await axios.get('http://localhost:8080/materi');
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
    setNewGambar(null);  // Reset nilai gambar
    setNewMateriType(false);
    setShowAdd(true);
  };

  const closeAddModal = () => {
    setNewJudul("");
    setNewDeskripsi("");
    setNewGambar(null);  // Reset nilai gambar
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
    setEditGambar(null);  // Reset nilai gambar
    setEditMateriType(data.jenis_materi === "premium");
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setId("");
    setEditJudul("");
    setEditDeskripsi("");
    setEditGambar(null);  // Reset nilai gambar
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div className="flex">
        <div className='col-10 p-5'>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tabel Materi</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                Tabel ini menampilkan seluruh data materi
              </p>
              <CButton
                className="btn btn-success text-white me-2"
                onClick={showAddModal}
              >
                Tambah Data
              </CButton>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableDataCell>Judul</CTableDataCell>
                    <CTableDataCell>Deskripsi</CTableDataCell>
                    <CTableDataCell>Gambar</CTableDataCell>
                    <CTableDataCell>Jenis Materi</CTableDataCell>
                    <CTableDataCell>Action</CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                  {dataMateri.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{item.judul}</CTableDataCell>
                      <CTableDataCell>{item.deskripsi}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={`http://localhost:8080/gambar/${item.gambar}`}
                          alt={item.judul}
                          style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{item.jenis_materi}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className='btn btn-primary text-white me-2'
                          onClick={() => showEditModal(item)}
                        >
                          Edit
                        </CButton>
                        <CButton
                          className='btn btn-danger text-white'
                          onClick={() => showModalDelete(item)}
                        >
                          Hapus
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                  <CTableRow>
                    <CTableDataCell colSpan="4" className="text-center">

                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </div>
      </div>

      <Modal show={showAdd} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Tambah Data Materi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addDataMateri}>
            <Form.Group className="mb-3" controlId="formJudul">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewJudul(e.target.value)}
                value={newJudul}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDeskripsi">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setNewDeskripsi(e.target.value)}
                value={newDeskripsi}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGambar">
              <Form.Label>Gambar</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setNewGambar(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJenisMateri">
              <Form.Label>Jenis Materi</Form.Label>
              <Form.Check
                type="radio"
                label="Gratis"
                checked={!newMateriType}
                onChange={() => setNewMateriType(!newMateriType)}
              />
              <Form.Check
                type="radio"
                label="Premium"
                checked={newMateriType}
                onChange={() => setNewMateriType(!newMateriType)}
              />
            </Form.Group>
            <Button type='submit' color="primary" className="px-4">
              Tambahkan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
            <Button type='submit' color="primary" className="px-4">
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
