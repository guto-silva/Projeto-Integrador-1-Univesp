import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import styles from './TableDepartment.module.css';
//import departments from '../../../../json/departments.json';
import TBodyDataDepartment from '../TBodyDataDepartment';
import ModalDepartment from '../ModalDepartment';
import { useState, useEffect } from 'react';

function TableDepartment() {
    
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const funcionarioToken = JSON.parse(window.localStorage.getItem("FuncionarioToken"));
        fetch("http://localhost:8080/departments", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  funcionarioToken.token
           }})
                .then((response) => response.json())
                .then((data) => setDepartments(data))
                .catch((error) => alert("Erro ao carregar dados dos departamentos. " + error));
    }, []);

    return (
        <>
            <Container fluid className={styles.container}>
                <section className={styles.modal}>
                    <ModalDepartment />
                </section>
                <Table bordered hover className={styles.tabela}>
                    <thead>
                        <tr>
                            <th>Número Trâmite</th>
                            <th>Nome do Departamento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            departments?.map((department) => <TBodyDataDepartment department={department} key={department.id} />)
                       }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default TableDepartment;