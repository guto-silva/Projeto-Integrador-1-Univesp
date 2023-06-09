import { API_URL } from "../../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import EditFormModalDepartment from '../EditFormModalDepartment';
import Form from 'react-bootstrap/Form';
import SuccessAlert from '../../Alerts/SucessAlert';
import styles from './EditModalDepartment.module.css';


function EditModalDepartment({ department }) {
    const funcionarioToken = JSON.parse(window.localStorage.getItem("FuncionarioToken"));
    
    const [nome, setNome] = useState(department.nome);
    const [numeroTramite, setNumeroTramite] = useState(department.numeroTramite);

    const departmentData = {
        "id": department.id,
        "nome": nome,
        "numeroTramite": numeroTramite
    }

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const timer = (tipo, msg) => {
        setType(tipo);
        setMessage(msg);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 2000);
    }

    const editar = async () => {
        
        await fetch(`${API_URL}/department/edit/${department.id}`, {
            method: 'PUT',
            body: JSON.stringify(departmentData),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': funcionarioToken.token
            }
        }).then(response => {
            if(response.ok) {
                timer('success', 'Dados alterados com sucesso!');
                window.location.reload();
            }
            else {
                timer('danger', 'Não foi possível atualizar os dados');
            }
        });
    }

    return (
        <>
            <Button variant="out-line dark" onClick={handleShow}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Departamento</Modal.Title>
                    <Button variant="out-line dark" onClick={() => setEdit(!edit)}>
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    {/* <EditFormModalDepartment department={ department } key={department.id} edit={edit} /> */}
                    <Form>
                        <Form.Group className="mb-3" controlId="formTramite">
                            <Form.Label>Número do Trâmite</Form.Label>
                            <Form.Control type="text" defaultValue={department.numeroTramite} onChange={(e) => {setNumeroTramite(e.target.value)}} disabled={edit} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNomeDepartamento">
                            <Form.Label>Nome do Departamento</Form.Label>
                            <Form.Control type="text" defaultValue={department.nome} onChange={(e) => {setNome(e.target.value)}} disabled={edit} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-dark">Cancelar</Button>
                    <Button variant="dark" onClick={editar}>Salvar</Button>
                </Modal.Footer>
                {visible ? <div className={styles.alert}><SuccessAlert tipo={type} msg={message}/></div> : ''}
            </Modal>
        </>
    );
}

export default EditModalDepartment;