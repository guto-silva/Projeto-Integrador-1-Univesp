import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './Login.module.css';
import { useState } from 'react';
import { API_URL } from '../../../config';

function Login() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const employeeData = {
        "id": null,
        "funcao": "",
        "matricula": "",
        "nome": "",
        "nomeUsuario": nomeUsuario,
        "senha": senha
    }

    const login = async (e) => {

        e.preventDefault();
        
        await fetch(API_URL+"/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(employeeData)

        }).then(response => response.json())
          .then(token => {
                if (token !== null && token !== "") {
                    localStorage.setItem("FuncionarioToken", JSON.stringify(token));
                    window.location.href = "#/documents";
                    window.location.reload();
                }
            });
    }

    return (
        <Container className={styles.container}>
            <Row>
                <Col >
                    <Form onSubmit={login}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type="text" name="nomeUsuario" onChange={(e) => { setNomeUsuario(e.target.value) }} placeholder="Digite seu nome de usuário" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" name="senha" onChange={(e) => { setSenha(e.target.value) }} placeholder="Digite sua senha" required />
                        </Form.Group>
                        <Button variant="dark" type="submit">Entrar</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;