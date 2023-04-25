import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import FormModalEmployee from '../FormModalEmployee';
import Form from 'react-bootstrap/Form';
function ModalEmployee() {

    const employeeData = {
        "id": null,
        "funcao": "",
        "matricula": "",
        "nome": "",
        "nomeUsuario": "",
        "senha": ""
    }

    const [employee, setEmployee] = useState(employeeData);

    // Obtendo dados do formulário
    const aoDigitar = (e) => {
        setEmployee({...employee, [e.target.name]:e.target.value});
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Cadastrar Funcionario
    const cadastrar = () => {
        fetch('http://localhost:8080/employee', {
            method: 'post',
            body: JSON.stringify(employee),
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
            <Button variant="outline-dark" onClick={handleShow}>NOVO FUNCIONÁRIO</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Funcionário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <FormModalEmployee /> */}
                    <Form>
                        <Form.Group className="mb-3" controlId="formMatricula">
                            <Form.Label>Número de Matrícula</Form.Label>
                            <Form.Control type="text" onChange={aoDigitar} name="matricula" placeholder="Digite o número de matrícula" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" onChange={aoDigitar} name="nome" placeholder="Digite o nome" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFuncao">
                            <Form.Label>Função</Form.Label>
                            <Form.Control type="text" onChange={aoDigitar} name="funcao" placeholder="Digite a função" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNomeUsuario">
                            <Form.Label>Nome de usuário</Form.Label>
                            <Form.Control type="text" onChange={aoDigitar} name="nomeUsuario" placeholder="Digite o nome de usuário" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSenha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" onChange={aoDigitar} name="senha" placeholder="Digite a senha" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-dark">Cancelar</Button>
                    <Button variant="dark" onClick={ () => cadastrar()}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEmployee;