import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styles from './Header.module.css';


function Header() {

    const sair = () => {
        window.localStorage.removeItem("FuncionarioToken");
        window.location.href = "/";
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container fluid className="justify-content-around">
                    <Navbar.Brand className={styles.brand}>
                        <span>Sistema de Controle de Entrada</span>
                        <span>e Saída de Processos</span>
                    </Navbar.Brand>
                    {window.localStorage.length > 0 ?
                        <Nav className={styles.menu}>
                            <Nav.Link href="#/documents">Processos</Nav.Link>
                            <Nav.Link href="#/employees">Funcionários</Nav.Link>
                            <Nav.Link href="#/departments">Departamentos</Nav.Link>
                            <Button className={styles.botaoSair} variant="outline-light" onClick={sair}>Sair</Button>
                        </Nav> :
                        <Nav></Nav>
                    }
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;