import { useEffect, useState } from "react";
import axios from 'axios';
import { Modal} from "react-bootstrap";
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
import "./User.css"; // Import your custom CSS file

function User() {
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
        <div className='body-flex'>
            <div className="flex">
                <div className='col-10 p-5'>
                    <h1 className="py-1">
                        Data User
                    </h1>
                    <Modal show={show} onHide={closeModal}>
                        {/* ... (Isi modal sesuai kebutuhan) */}
                    </Modal>
                    {/* Modal DELETE */}
                    <Modal show={showDelete} onHide={closeModalDelete}>
                        {/* ... (Isi modal delete sesuai kebutuhan) */}
                    </Modal>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Tabel User</strong>
                        </CCardHeader>
                        <CCardBody>
                            {/* ... (Isi bagian lain sesuai kebutuhan) */}
                            <CTable striped className="CTable">
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
                                                <CButton className='CButton btn-primary text-white me-2' onClick={() => showModal(user)}>Edit</CButton>
                                                <CButton className='CButton btn-danger text-white' onClick={() => showModalDelete(user)}>Hapus</CButton>
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

export default User;
