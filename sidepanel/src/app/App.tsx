import { Outlet } from "react-router-dom";

import { Container } from "react-bootstrap";
import NavBar from "./layout/NavBar";

function App() {
    return (
        <>
            <NavBar />
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
}

export default App;
