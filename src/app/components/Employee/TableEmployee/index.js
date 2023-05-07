import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
//import employees from '../../../../json/employees.json';
import TBodyDataEmployee from '../TBodyDataEmployee';
import styles from './TableEmployee.module.css';
import ModalEmployee from '../ModalEmployee';

function Employee() {
    const [employees, setEmployees] = useState([]);
    
    useEffect(() => {
        const funcionarioToken = JSON.parse(window.localStorage.getItem("FuncionarioToken"));
        //http://localhost:8080/employees
        fetch("https://guto.dev.br:8443/employees", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  funcionarioToken.token
           }})
                .then((response) => response.json())
                .then((data) => setEmployees(data))
                .catch((error) => alert("Erro ao carregar dados dos funcionários. " + error));
    }, []);

    return (
        <>

            <Container fluid className={styles.container}>
                <section className={styles.modal}>
                    <ModalEmployee />
                </section>
                <Table bordered hover className={styles.tabela}>
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>Função</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees?.map((employee) => <TBodyDataEmployee employee={employee} key={employee.id} />)
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default Employee;