import EditModalDepartment from "../EditModalDepartment";
import styles from './TBodyDataDepartment.module.css';

function TBodyDataDepartment( { department } ) {
    return (
        <tr>
            <td>{ department.tramite }</td>
            <td>{ department.nome }</td>
            <td className={styles.acoes}>{ <EditModalDepartment department={ department } key={ department.id } /> }</td>
        </tr>
    );
}

export default TBodyDataDepartment;