import {Button, Card, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import "../Main.css"
import {UserService} from "../../services/UserService";
import React, {useState} from "react";

export function ChangePasswordView() {

    const [state, setState] = useState({
        Password: "",
        PasswordConfirmation: "",
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

    const handleChangePassword = async () => {

        const {Password} = state

        const userService = new UserService()
        const history = window.location;
        const token = history.pathname.split("/")[2]
        await userService.changePassword(token, Password)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    state.responseTitle = "Yaay!";
                    state.responseMessage = response.data.message;
                    state.success = true;
                    handleModal();
                }
            }).catch(response => {
                if (response.response !== undefined && response.response.status >= 400) {
                    state.responseTitle = "Ooh no!";
                    state.responseMessage = response.response.data.message;
                    state.success = false;
                    handleModal();
                } else {
                    alert("Apparently we can't contact our services! Please contact an administrator!")

                }
            })
        setValidated(true)
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
                        if (state.success) window.location.href = "/Login";
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>

            <h4 className="text-lg-center align-title">Password Reset</h4>

            <Row>

                <Col lg="6" className="offset-lg-3">

                    <Card className="align-card">

                        <Form noValidate validated={validated}>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="Password" required type="password" onChange={e => handleChange(e)}
                                              placeholder="Password"
                                              isInvalid={state.Password !== "" && state.Password.length < 8}/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPasswordConfirmation">
                                <Form.Label>Confirm your Password</Form.Label>
                                <Form.Control name="PasswordConfirmation" required type="password"
                                              onChange={e => handleChange(e)}
                                              placeholder="Confirm your Password"
                                              isInvalid={state.PasswordConfirmation !== "" && state.Password !== ""
                                              && state.Password !== state.PasswordConfirmation}/>
                                <Form.Control.Feedback type="invalid">
                                    The Password does not match.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="dark" onClick={handleChangePassword}>
                                Reset
                            </Button>

                        </Form>

                    </Card>

                </Col>

            </Row>

        </Container>
    );


}

export default ChangePasswordView;
