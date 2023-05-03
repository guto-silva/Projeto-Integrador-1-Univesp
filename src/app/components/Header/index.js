import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import styles from './Header.module.css';

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container fluid className="justify-content-around">
                    <Navbar.Brand className={styles.brand}>
                        <span>Sistema de Controle de Entrada</span>
                        <span>e Saída de Processos</span>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/documents">Processos</Nav.Link>
                        <Nav.Link href="/employees">Funcionários</Nav.Link>
                        <Nav.Link href="/departments">Departamentos</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;