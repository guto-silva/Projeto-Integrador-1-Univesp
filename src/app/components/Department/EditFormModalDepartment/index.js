import Form from 'react-bootstrap/Form';

function EditFormModalDepartment( { department, edit } ) {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formTramite">
                <Form.Label>Número do Trâmite</Form.Label>
                <Form.Control type="text" value={department.numeroTramite} disabled={edit} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNomeDepartamento">
                <Form.Label>Nome do Departamento</Form.Label>
                <Form.Control type="text" value={department.nome} disabled={edit}/>
            </Form.Group>
        </Form>
    );
}

export default EditFormModalDepartment;