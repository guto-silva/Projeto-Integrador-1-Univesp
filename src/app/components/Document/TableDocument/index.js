import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import TBodyDataDocument from '../TBodyDataDocument';
import styles from './TableDocument.module.css';
import ModalDocument from '../ModalDocument';
import { API_URL } from '../../../../config';

function TableDocument() {
    const funcionarioToken = JSON.parse(window.localStorage.getItem("FuncionarioToken"));
    const [documents, setDocuments] = useState([]);
     useEffect(() => {
        fetch(API_URL+"/documents", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  funcionarioToken.token
            }
        }).then((response) => response.json())
          .then((data) => setDocuments(data))
          .catch((error) => alert('Erro ao carregar dados dos processos.' + error))
    }, []);

    return (
        <Container fluid className={styles.container}>
            <section className={styles.modal}>
                <ModalDocument />
            </section>
            <Table className={styles.tabela} bordered hover>
                <thead>
                    <tr>
                        <th>Protocolo</th>
                        <th>Requisição</th>
                        <th>Modalidade</th>
                        <th>Origem</th>
                        <th>Descrição</th>
                        <th>Comprador</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        documents?.map((document) => <TBodyDataDocument document={document} key={document.id}/>)
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default TableDocument;