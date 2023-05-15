import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import FormModalDocument from '../FormModalDocument';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../../config';
import SuccessAlert from '../../Alerts/SucessAlert';
import styles from './ModalDocument.module.css';

function ModalDocument() {

    const funcionarioToken = JSON.parse(window.localStorage.getItem('FuncionarioToken'));

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [numeroProtocolo, setNumeroProtocolo] = useState('');
    const [numeroRequisicao, setNumeroRequisicao] = useState('');
    const [modalidade, setModalidade] = useState(0);
    const [departamentoOrigem, setDepartamentoOrigem] = useState({});
    const [comprador, setComprador] = useState({});
    const [descricao, setDescricao] = useState('');

    const documentData = {
        "numeroProtocolo": numeroProtocolo,
        "numeroRequisicao": numeroRequisicao,
        "modalidade": modalidade,
        "departamentoOrigem": departamentoOrigem,
        "comprador": comprador,
        "descricao": descricao
    };

    useEffect(() => {
        const funcionarioToken = JSON.parse(window.localStorage.getItem("FuncionarioToken"));
        fetch(API_URL + "/departments", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': funcionarioToken.token
            }
        })
            .then((response) => response.json())
            .then((data) => setDepartments(data))
            .catch((error) => alert("Erro ao carregar dados dos departamentos. " + error));

        fetch(API_URL + "/employees", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': funcionarioToken.token
            }
        })
            .then((response) => response.json())
            .then((data) => setEmployees(data))
            .catch((error) => alert("Erro ao carregar dados dos departamentos. " + error));
    }, []);

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

    const salvar = async () => {
         console.log(documentData);
        await fetch(API_URL + '/documents', {
            method: 'POST',
            body: JSON.stringify(documentData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': funcionarioToken.token
            }
        }).then(response => response.json())
            .then(response => {
                timer('success', 'Departamento cadastrado com sucesso!');
                window.location.reload();
            });
    };

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>NOVO PROCESSO</Button>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Processo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <FormModalDocument /> */}
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formProtocolo">
                                        <Form.Label>Número do Protocolo</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setNumeroProtocolo(e.target.value) }} placeholder="Digite o número do protocolo" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formRequisicao">
                                        <Form.Label>Número da requisição</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setNumeroRequisicao(e.target.value) }} placeholder="Digite o número da requisição" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formModalidade">
                                        <Form.Label>Modalidade da Compra</Form.Label>
                                        <Form.Select onChange={(e) => { setModalidade(e.target.value) }}>
                                            <option defaultValue="0">-- Selecione --</option>
                                            <option value="1">ATA</option>
                                            <option value="2">Compra Direta</option>
                                            <option value="3">Licitação</option>
                                            <option value="4">Anulação</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formOrigem">
                                        <Form.Label>Departamento de Origem</Form.Label>
                                        <Form.Select onChange={(e) => { setDepartamentoOrigem(e.target.value) }}>
                                            <option defaultValue="">-- Selecione --</option>
                                            {
                                                departments.map((department) => <option value={department} key={department.id}>{department.nome}</option>)
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formComprador">
                                        <Form.Label>Comprador</Form.Label>
                                        <Form.Select onChange={(e) => { setComprador(e.target.value) }}>
                                            <option defaultValue="0">-- Selecione --</option>
                                            {
                                                employees.map((employee) => <option value={employee} key={employee.id}>{employee.nome}</option>)
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formDescricao">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control as="textarea" rows="5" onChange={(e) => { setDescricao(e.target.value) }} placeholder="Digite a descrição aqui!" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="outline-dark">Cancelar</Button>
                    <Button variant="dark" onClick={salvar}>Salvar</Button>
                </Modal.Footer>
                {visible ? <div className={styles.alert}><SuccessAlert tipo={type} msg={message} /></div> : ''}
            </Modal>
        </>
    );
}

export default ModalDocument;