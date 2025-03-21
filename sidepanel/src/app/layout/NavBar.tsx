import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

function NavBar() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container fluid>
                <Nav>
                    <Nav.Link as={Link} to="/current">진행도</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/settings">설정</Nav.Link>
                    <Nav.Link as={Link} to="/updates">업데이트</Nav.Link>
                    <Nav.Link href="https://github.com/CcRr0/ecx" target="_blank">GitHub</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
