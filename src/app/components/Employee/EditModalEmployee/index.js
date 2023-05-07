import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import EditFormModalEmployee from '../EditFormModalEmployee';
import Form from 'react-bootstrap/Form';
import SuccessAlert from "../../Alerts/SucessAlert";
import styles from './EditModalEmployee.module.css';
import { API_URL } from "../../../../config";


function EditModalEmployee({ employee }) {
    const funcionarioToken = JSON.parse(window.localStorage.getItem("FuncionarioToken"));
    const [matricula, setMatricula] = useState(employee.matricula);
    const [nome, setNome] = useState(employee.nome);
    const [funcao, setFuncao] = useState(employee.funcao);

    const employeeData = {
        "id": employee.id,
        "matricula": matricula,
        "nome": nome,
        "funcao": funcao
    }
   
    const [edit, setEdit] = useState(true);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState("success");
    const [message, setMessage] = useState("Dados alterados com sucesso!");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const timer = (type, msg) => {
        setType(type);
        setMessage(msg);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            window.location.reload()
        }, 1200);
    }

    const editar = () => {
        
        fetch(`${API_URL}/employee/edit/${employee.id}`, {
            method: 'PUT',
            body: JSON.stringify(employeeData),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': funcionarioToken.token
            }
        }).then(response => {
            if (response.ok) {
                timer('success', 'Dados alterados com secesso!');
                
            }
            else {
                timer('danger', 'Ocorreu algum problema e os dados não foram salvos.');
            }
        })
    }


    return (
        <>
            <Button variant="out-line dark" onClick={handleShow}>
                <FontAwesomeIcon icon={faEye} />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Funcionário</Modal.Title>
                    <Button variant="out-line dark" onClick={() => setEdit(!edit)}>
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    {/* <EditFormModalEmployee employee={employee} key={employee.id} edit={edit} /> */}
                    <Form>
                        <Form.Group className="mb-3" controlId="formMatricula">
                            <Form.Label>Número de Matrícula</Form.Label>
                            <Form.Control type="text" defaultValue={employee.matricula} onChange={(e) => setMatricula(e.target.value)} disabled={edit} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" defaultValue={employee.nome} onChange={(e) => setNome(e.target.value)} disabled={edit} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFuncao">
                            <Form.Label>Função</Form.Label>
                            <Form.Control type="text" defaultValue={employee.funcao} onChange={(e) => setFuncao(e.target.value)} disabled={edit} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-dark">Cancelar</Button>
                    <Button variant="dark" onClick={editar}>Salvar</Button>
                </Modal.Footer>
                {
                    visible ? <div className={styles.alert}><SuccessAlert tipo={type} msg={message} /></div> : ''
                    
                }
            </Modal>
        </>
    );
}

export default EditModalEmployee;