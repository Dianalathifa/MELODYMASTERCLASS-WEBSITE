import { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";
// import CustomTable from "../components/tables/customTable/CustomTable";

// import { IUserTable } from "../interfaces/Itable";

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import "bootstrap/dist/css/bootstrap.min.css";
// import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";

// Import your custom CSS file


function UserPage() {
    const [data_user, setDataUser] = useState([]);

    const GetDataUser = async () => {
        const getData = await axios.get(
            'http://localhost:8080/user'
        );
        setDataUser(getData.data.data);
        console.log(getData);

    };
    const [id, setId] = useState("");
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [show, setShow] = useState(false);

    const UpdateDataUser = async (event) => {
        event.preventDefault();
        try {
            const putData = await axios.put(
                `http://localhost:8080/update/user/${id}`,
                {
                    nama: nama,
                    email: email,
                    password: password
                });
            alert(putData.data.messages)
            window.location.reload();
        } catch (error) {
            alert("Data Gagal diubah")
        }
    };
    const showModal = (data) => {
        setId(data.id);
        setNama(data.nama);
        setEmail(data.email);
        setPassword(data.password);
        setShow(true);
    }
    const closeModal = () => {
        setId("");
        setNama("");
        setEmail("");
        setPassword("");
        setShow(false);
    }

    // menghapus data
    const [showDelete, setShowDelete] = useState(false);
    const showModalDelete = (data) => {
        setId(data.id);
        setNama(data.nama);
        setEmail(data.email);
        setShowDelete(true);
    }
    const closeModalDelete = () => {
        setId("");
        setNama("");
        setEmail("");
        setShowDelete(false);
    }
    const DeleteDataUser = async (event) => {
        event.preventDefault();
        try {
            const deleteData = await axios.delete(
                `http://localhost:8080/delete/user/${id}`);
            alert(deleteData.data.messages)
            window.location.reload();
        } catch (error) {
            alert("Data Gagal dihapus")
        }
    };
    
    useEffect(() => {
        GetDataUser();
    }, []);
    

    return (
        
        <div className='body-flex-user'>
            <div className="flex-user">
                <div className='col-10 p-5'>
                    <h1 className="py-1">
                       
                    </h1>
                    <Modal show={show} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Update Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={UpdateDataUser}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"></Form.Group>
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" autoFocus onChange={(e) => setNama(e.target.value)} value={nama} />
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" autoFocus onChange={(e) => setEmail(e.target.value)} value={email} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" autoFocus onChange={(e) => setPassword(e.target.value)} value={password} />
                                </Form.Group>
                                <Button type='submit' color="primary" className="px-4"> Update </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}> Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Modal DELETE */}
                    <Modal show={showDelete} onHide={closeModalDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Apakah Anda yakin menghapus data ini?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Detail Data</h5>
                                        <div className="row">
                                            <p className="col-4 card-text">
                                                Nama User
                                            </p>
                                            <p className="col-6 card-text">
                                                : {nama}
                                            </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 card-text">
                                                Email
                                            </p>
                                            <p className="col-6 card-text">
                                                : {email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' color="primary" className="px-4"
                                onClick={DeleteDataUser}>
                                Hapus Data
                            </Button>
                            <Button variant="danger" onClick={closeModalDelete}>
                                Batal
                            </Button>
                        </Modal.Footer>
                    </Modal>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>Tabel User</strong>
                                </CCardHeader>
                                <CCardBody>
                                    <p className="text-medium-emphasis small">
                                        Tabel ini menampilkan seluruh data user yang login
                                    </p>
                                    <div className="py-3">
                                        <CButton className="btn btn-success text-white me-2" href="form">
                                            Tambah Data
                                        </CButton>
                                    </div>
                                    <CTable striped>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {data_user.map((user, index) => (
                                                <CTableRow key={index}>
                                                    <CTableDataCell> {user.nama} </CTableDataCell>
                                                    <CTableDataCell> {user.email} </CTableDataCell>
                                                    <CTableDataCell> {user.password} </CTableDataCell>
                                                    <CTableDataCell>
                                                        <CButton className='btn btn-primary text-white me-2' onClick={() => showModal(user)}>Edit</CButton>
                                                        <CButton className='btn btn-danger text-white' onClick={() => showModalDelete(user)}>Hapus</CButton>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            ))}
                                        </CTableBody>
                                    </CTable>

                                </CCardBody>
                            </CCard>
                        </div>
                </div>
            </div>
            );
}
            export default UserPage;