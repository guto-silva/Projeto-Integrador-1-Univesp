import EditModalDocument from "../EditModalDocument";
import styles from './TBodyDataDocument.module.css';

function TBodyDataDocument({ document }) {
    return (
        <tr>
            <td>{document.protocolo}</td>
            <td>{document.requisicao}</td>
            <td>{document.modalidade}</td>
            <td>{document.origem.nome}</td>
            <td>{document.descricao}</td>
            <td>{document.comprador.nome} </td>
            <td className={styles.acoes}>
                <EditModalDocument document={document} key={document.id}/>
            </td>
        </tr>
    );
}

export default TBodyDataDocument;