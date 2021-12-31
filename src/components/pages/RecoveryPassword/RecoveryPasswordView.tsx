import {Button, Card, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import cpfCnpjMask from "../../utils/CpfCnpjMask";
import React, {useState} from "react";
import {UserService} from "../../services/UserService";

export function RecoveryPasswordView() {

    const [state, setState] = useState({
        CpfCnpj: "",
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

    const handleRecoverPassword = async (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const userService = new UserService();
        userService.recoverPassword(state.CpfCnpj)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    state.responseTitle = `Nicee!`
                    state.responseMessage = `${response.data.message}`
                    state.success = true
                    setValidated(true);
                    handleModal()
                }
            }).catch(response => {
            if (response.response !== undefined && response.response.status >= 400) {
                state.responseTitle = `Ooops! We got an error.`
                state.responseMessage = `${response.response.data.message}\nIf you think that it is not an error, please contact an administrator!`
            } else {
                state.responseTitle = `Ooops! We got an error.`
                state.responseMessage = `Apparently we can't contact our services! Please contact an administrator!`
            }
            setValidated(false);
            handleModal()
        });
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
                        if (state.success) window.location.href = "/login";
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>

            <h4 className="text-lg-center align-title">Recover Your Password</h4>

            <Row>

                <Col lg="6" className="offset-lg-3">

                    <Card className="align-card">

                        <Form noValidate validated={validated}>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formCpfCnpj">
                                    <Form.Label>Cpf or Cnpj:</Form.Label>
                                    <Form.Control name="CpfCnpj" required value={cpfCnpjMask(state.CpfCnpj)}
                                                  onChange={e => handleChange(e)}
                                                  placeholder="Cpf or Cnpj"
                                                  isInvalid={state.CpfCnpj !== "" && state.CpfCnpj.length < 14}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid cpf or cnpj.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Button variant="dark" onClick={handleRecoverPassword}>
                                Recover Your Password
                            </Button>

                        </Form>

                    </Card>

                </Col>

            </Row>

        </Container>
    );
}

export default RecoveryPasswordView;