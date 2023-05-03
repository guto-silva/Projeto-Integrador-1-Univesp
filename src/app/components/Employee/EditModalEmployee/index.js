import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import EditFormModalEmployee from '../EditFormModalEmployee';
import Form from 'react-bootstrap/Form';

function EditModalEmployee({ employee }) {

    const employeeData = {
        "id": employee.id,
        "funcao": employee.funcao,
        "matricula": employee.matricula,
        "nome": employee.nome
    }

    const aoDigitar = (e) => {
        setEditEmployee({...employee, [e.target.name]:e.target.value});
    }

    const [editEmployee, setEditEmployee] = useState(employeeData);

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editar = () => {
        fetch(`http://localhost:8080/employee/edit/${editEmployee.id}`, {
            method: 'put',
            body: JSON.stringify(editEmployee),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(retorno => retorno.json())
          .then(retorno_convertido => {
            console.log(retorno_convertido);
          });
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
                            <Form.Control type="text" defaultValue={editEmployee.matricula} onChange={aoDigitar} disabled={edit} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" defaultValue={editEmployee.nome} onChange={aoDigitar} disabled={edit} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFuncao">
                            <Form.Label>Função</Form.Label>
                            <Form.Control type="text" defaultValue={editEmployee.funcao} onChange={aoDigitar} disabled={edit} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-dark">Cancelar</Button>
                    <Button variant="dark" onClick={editar}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModalEmployee;