import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './Login.module.css';
import { useState } from 'react';

function Login() {
    
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
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const login = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8080/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(employee)
            
        }).then(response => response.json())
          .then(token => {
            if(token !== null && token !== "") {
                localStorage.setItem("FuncionarioToken", JSON.stringify(token));
            }
          });
    }

    return (
        <Container className={styles.container}>
            <Row>
                <Col >
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type="text" name="nomeUsuario" onChange={aoDigitar} placeholder="Digite seu nome de usuário" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" name="senha" onChange={aoDigitar} placeholder="Digite sua senha" />
                        </Form.Group>
                        <Button variant="dark" type="submit" onClick={login}>Entrar</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;