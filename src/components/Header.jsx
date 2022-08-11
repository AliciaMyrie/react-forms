// import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Header = () => (
  <Nav activeKey="/home">
    <Nav.Item>
      <Nav.Link as={Link} to="/">
        Home
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/about">
        About
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/contact">
        Contact
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

export default Header;
