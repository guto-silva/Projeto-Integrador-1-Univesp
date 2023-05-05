import Form from 'react-bootstrap/Form';

function FormModalDepartment() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formNumeroTramite">
                <Form.Label>Número do Trâmite</Form.Label>
                <Form.Control type="text" placeholder="Digite o número de matrícula" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNomeDepartamento">
                <Form.Label>Nome do Departamento</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome" />
            </Form.Group>
        </Form>
    );
}

export default FormModalDepartment;