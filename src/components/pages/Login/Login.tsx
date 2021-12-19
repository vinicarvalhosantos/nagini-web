import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import "../Main.css"
import {UserService} from "../../services/UserService";

export function LoginView() {

    const [state, setState] = useState({
        Login: "",
        Password: "",
        Username: "",
        Email: "",
        modal: false,
        responseMessage: "",
        responseTitle: "",
        success: false
    });

    const [validated, setValidated] = useState(false);


    const handleChange = (e: any) => {
        try {
            const {name, value} = e.target;
            setState({
                ...state,
                [name]: value
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleModal = () => {
        try {
            setState({
                ...state,
                modal: !state.modal
            });
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = async (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const {Password, Login} = state

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (Password !== "" && Login !== "") {
            if (emailRegex.test(Login)) {
                state.Email = Login;
            } else {
                state.Username = Login;
            }

            const registerService = new UserService();
            await registerService.loginUser(Password, state.Username, state.Email)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        state.responseTitle = `Nicee!`;
                        state.responseMessage = `Aww yeah, you successfully logged in! Be welcome back :)`;
                        state.success = true;
                        handleModal();
                        window.sessionStorage.setItem("login", response.data.data.login);
                        window.sessionStorage.setItem("username", response.data.data.username);
                        window.sessionStorage.setItem("cpfCnpj", response.data.data.cpfCnpj);
                        window.sessionStorage.setItem("userId", response.data.data.userId);
                        window.sessionStorage.setItem("expirationTime", response.data.data.expirationTime);
                        window.sessionStorage.setItem("token", response.data.data.token);
                    }
                }).catch(response => {
                    if (response.response.status >= 400) {
                        state.responseTitle = `Ooops! We got an error.`;
                        state.responseMessage = `${response.response.data.message}`;
                        handleModal();
                    }
                });
        }

        setValidated(true);

    }

    return (
        <Container>

            <Spinner animation="border" hidden role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={state.modal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {state.responseTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {state.responseMessage}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        handleModal();
                        if (state.success) window.location.href = "/";
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>

            <h4 className="text-lg-center align-title">User Login</h4>

            <Row>

                <Col lg="4" className="offset-lg-4">

                    <Card className="align-card">

                        <Form noValidate validated={validated}>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formLogin">
                                    <Form.Label>Login:</Form.Label>
                                    <Form.Control name="Login" required onChange={e => handleChange(e)}
                                                  placeholder="Username or Email"/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid login.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="Password" required type="password" onChange={e => handleChange(e)}
                                              placeholder="Password"
                                              isInvalid={state.Password !== "" && state.Password.length < 8}/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    <a href="/recovery-password"> Forgot your password?</a>
                                </Form.Text>
                            </Form.Group>

                            <Button variant="dark" onClick={handleLogin}>
                                Login
                            </Button>


                        </Form>

                    </Card>

                </Col>

            </Row>

        </Container>
    );


}

export default LoginView;
