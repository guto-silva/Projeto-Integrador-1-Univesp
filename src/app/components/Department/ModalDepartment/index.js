import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import FormModalDepartment from '../FormModalDepartment';
import Form from 'react-bootstrap/Form';

function ModalDepartment() {

    const funcionarioToken = JSON.parse(window.localStorage.getItem('FuncionarioToken'));

    const [nome, setNome] = useState('');
    const [numeroTramite, setNumeroTramite] = useState('');

    const departmentData = {
        "nome": nome,
        "numeroTramite": numeroTramite
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const salvar = async () => {
        await fetch('http://localhost:8080/department', {
            method: 'POST',
            body: JSON.stringify(departmentData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': funcionarioToken.token
            }
        }).then(response => response.json())
          .then(response => console.log(JSON.stringify(response)));
    };

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>NOVO DEPARTAMENTO</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Departamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <FormModalDepartment /> */}
                    <Form>
                        <Form.Group className="mb-3" controlId="formNumeroTramite">
                            <Form.Label>Número do Trâmite</Form.Label>
                            <Form.Control type="text" onChange={(e) => {setNumeroTramite(e.target.value)}} placeholder="Digite o número de matrícula" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNomeDepartamento">
                            <Form.Label>Nome do Departamento</Form.Label>
                            <Form.Control type="text" onChange={(e) => {setNome(e.target.value)}} placeholder="Digite o nome" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-dark">Cancelar</Button>
                    <Button variant="dark" onClick={salvar}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDepartment;