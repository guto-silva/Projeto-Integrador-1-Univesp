import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
// import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import EditFormModalEmployee from '../EditFormModalEmployee';
import Form from 'react-bootstrap/Form';
// import styles from './EditModalEmployee.module.css';

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


    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editar = () => {
        fetch(`http://localhost:8080/employee/edit/${employee.id}`, {
            method: 'PUT',
            body: JSON.stringify(employeeData),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': funcionarioToken.token
            }
        }).then(response => {
            if (response.ok) {
                alert("Dados alterados com secesso!");
            }
            else {
                alert("Ocorreu algum problema e os dados não foram salvos.");
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
                {/* <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <p className={styles.alertMessage}>
                        Dados alterados com sucesso!
                    </p>
                </Alert> */}
            </Modal>
        </>
    );
}

export default EditModalEmployee;