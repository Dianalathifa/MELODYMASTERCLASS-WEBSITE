import { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";
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

function TransaksiPage() {
    const [dataTransaksi, setDataTransaksi] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [price, setPrice] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [tanggalTransaksi, setTanggalTransaksi] = useState("");
    const [duration, setDuration] = useState("");

    const getDataTransaksi = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/transaksi'
            );
            console.log('Data response:', response.data); // Tambahkan baris ini
            setDataTransaksi(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const showUpdateData = (transaksi) => {
        setId(transaksi.id);
        setEmail(transaksi.email);
        setPrice(transaksi.price);
        setPaymentMethod(transaksi.payment_method);
        setTanggalTransaksi(transaksi.tanggal_transaksi);
        setDuration(transaksi.duration);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        clearForm();
    };

    const showDeleteData = (transaksi) => {
        setId(transaksi.id);
        setEmail(transaksi.email);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        clearForm();
    };

    const updateDataTransaksi = async (event) => {
        event.preventDefault();
        try {
            const updateData = await axios.put(
                `http://localhost:8080/update/transaksi/${id}`,
                {
                    email: email,
                    price: price,
                    payment_method: paymentMethod,
                    tanggal_transaksi: tanggalTransaksi,
                    duration: duration,
                }
            );
            alert(updateData.data.messages);
            getDataTransaksi();
            closeUpdateModal();
        } catch (error) {
            alert("Failed to update transaction data");
        }
    };

    const deleteDataTransaksi = async (event) => {
        event.preventDefault();
        try {
            const deleteData = await axios.delete(
                `http://localhost:8080/delete/transaksi/${id}`
            );
            alert(deleteData.data.messages);
            getDataTransaksi();
            closeDeleteModal();
        } catch (error) {
            alert("Failed to delete transaction data");
        }
    };

    const clearForm = () => {
        setId("");
        setEmail("");
        setPrice("");
        setPaymentMethod("");
        setTanggalTransaksi("");
        setDuration("");
    };

    useEffect(() => {
        getDataTransaksi();
    }, []);

    return (
        <div className='body-flex-user'>
            <div className="flex-user">
                <div className='col-10 p-5'>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Tabel Transaksi</strong>
                        </CCardHeader>
                        <CCardBody>
                            <p className="text-medium-emphasis small">
                                Tabel ini menampilkan seluruh data transaksi
                            </p>
                            <CTable striped>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Tanggal Transaksi</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {dataTransaksi && dataTransaksi.map((transaksi, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell> {transaksi.email} </CTableDataCell>
                                            <CTableDataCell> {transaksi.price} </CTableDataCell>
                                            <CTableDataCell> {transaksi.payment_method} </CTableDataCell>
                                            <CTableDataCell> {transaksi.tanggal_transaksi} </CTableDataCell>
                                            <CTableDataCell> {transaksi.duration} </CTableDataCell>
                                            <CTableDataCell>
                                                <CButton
                                                    className='btn btn-primary text-white me-2'
                                                    onClick={() => showUpdateData(transaksi)}
                                                >
                                                    Edit
                                                </CButton>
                                                <CButton
                                                    className='btn btn-danger text-white'
                                                    onClick={() => showDeleteData(transaksi)}
                                                >
                                                    Hapus
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>

                    {/* Modal Update */}
                    <Modal show={showUpdateModal} onHide={closeUpdateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Update Data Transaksi</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={updateDataTransaksi}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Payment Method</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        value={paymentMethod}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal Transaksi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setTanggalTransaksi(e.target.value)}
                                        value={tanggalTransaksi}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setDuration(e.target.value)}
                                        value={duration}
                                    />
                                </Form.Group>
                                <Button type='submit' color="primary" className="px-4">
                                    Update
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeUpdateModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal Delete */}
                    <Modal show={showDeleteModal} onHide={closeDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Apakah Anda yakin menghapus data ini?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Detail Data</h5>
                                        <div className="row">
                                            <p className="col-4 card-text">Email</p>
                                            <p className="col-6 card-text">: {email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type='submit'
                                color="primary"
                                className="px-4"
                                onClick={deleteDataTransaksi}
                            >
                                Hapus Data
                            </Button>
                            <Button variant="danger" onClick={closeDeleteModal}>
                                Batal
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default TransaksiPage;