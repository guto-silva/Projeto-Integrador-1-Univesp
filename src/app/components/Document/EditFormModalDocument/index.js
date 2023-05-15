import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import employees from '../../../../json/employees.json';
import departments from '../../../../json/departments.json';

function EditFormModalDocument( { document, edit } ) {
    return (
        <Form>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formProtocolo">
                            <Form.Label>Número do Protocolo</Form.Label>
                            <Form.Control type="text" defaultValue={document.numeroProtocolo} disabled={edit}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formRequisicao">
                            <Form.Label>Número da requisição</Form.Label>
                            <Form.Control type="text" defaultValue={document.numeroRequisicao} disabled={edit}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formModalidade">
                            <Form.Label>Modalidade da Compra</Form.Label>
                            <Form.Select disabled={edit}>
                                <option defaultValue={document.modalidade}>{ document.modalidade }</option>
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
                            <Form.Select disabled={edit}>
                                <option defaultValue={document.departamentoOrigem.id}>{document.departamentoOrigem.nome}</option>
                                {                                   
                                    departments.map((department) => <option value={department.id} key={department.id}>{department.nome}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formComprador">
                            <Form.Label>Comprador</Form.Label>
                            <Form.Select disabled={edit}>
                                <option defaultValue={document.comprador.id}>{document.comprador.nome}</option>
                                {
                                    employees.map((employee) => <option value={employee.id} key={employee.id}>{employee.nome}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formDescricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows="5" value={document.descricao} disabled={edit} />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}

export default EditFormModalDocument;