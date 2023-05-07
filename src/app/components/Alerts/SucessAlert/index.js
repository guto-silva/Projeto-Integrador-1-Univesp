import Alert from 'react-bootstrap/Alert';
import styles from './SuccessAlert.module.css';

function SuccessAlert({tipo, msg}) {
    
    return (
        <section className={styles.alert}>
            <Alert variant={tipo}>
                <span className={styles.alertMessage}>
                    {msg}
                </span>
            </Alert>
        </section>
    );
}

export default SuccessAlert;