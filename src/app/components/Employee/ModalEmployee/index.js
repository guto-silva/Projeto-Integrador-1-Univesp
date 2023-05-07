import { API_URL } from '../../../../config';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import FormModalEmployee from '../FormModalEmployee';
import Form from 'react-bootstrap/Form';
import SuccessAlert from '../../Alerts/SucessAlert';
import styles from './ModalEmployee.module.css';

function ModalEmployee() {

    const [funcao, setFuncao] = useState('');
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const employeeData = {
        "id": null,
        "funcao": funcao,
        "matricula": matricula,
        "nome": nome,
        "nomeUsuario": nomeUsuario,
        "senha": senha
    }

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
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Cadastrar Funcionario
    const cadastrar = () => {
       
        fetch(API_URL+'/employee', {
            method: 'post',
            body: JSON.stringify(employeeData),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            response.json();
            if(response.ok) {
                timer('success', 'Funcionário cadastrado com sucesso');
            }
            else {
                timer('danger', 'Não foi possível cadastrar funcionário');
            }
        })
          .then(response => {
                window.location.reload()
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
                            <Form.Control type="number" onChange={(e) => {setMatricula(e.target.value)}} name="matricula" placeholder="Digite o número de matrícula" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" onChange={(e) => {setNome(e.target.value)}} name="nome" placeholder="Digite o nome" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFuncao">
                            <Form.Label>Função</Form.Label>
                            <Form.Control type="text" onChange={(e) => {setFuncao(e.target.value)}} name="funcao" placeholder="Digite a função" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNomeUsuario">
                            <Form.Label>Nome de usuário</Form.Label>
                            <Form.Control type="text" onChange={(e) => {setNomeUsuario(e.target.value)}} name="nomeUsuario" placeholder="Digite o nome de usuário" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSenha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" onChange={(e) => {setSenha(e.target.value)}} name="senha" placeholder="Digite a senha" required/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-dark">Cancelar</Button>
                    <Button variant="dark" onClick={ () => cadastrar()}>Salvar</Button>
                </Modal.Footer>           
                {visible ? <div className={styles.alert}><SuccessAlert tipo={type} msg={message}/></div> : ''}
            </Modal>
        </>
    );
}

export default ModalEmployee;