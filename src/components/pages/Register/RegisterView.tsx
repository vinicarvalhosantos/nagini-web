import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import "../Main.css"
import cpfCnpjMask from "../../utils/CpfCnpjMask";
import phoneNumberMask from "../../utils/PhoneNumberMask";
import formatDate from "../../utils/DateMask";
import {UserService} from "../../services/UserService";

export function RegisterView() {

    const [state, setState] = useState({
        FullName: "",
        Username: "",
        Email: "",
        CpfCnpj: "",
        Birthday: "",
        PhoneNumber: "",
        Password: "",
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

    const handleRegister = async (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const {Password, CpfCnpj, PhoneNumber, FullName, Email, Username, Birthday} = state

        if (Password !== "" && CpfCnpj !== "" && PhoneNumber !== "" && FullName !== "" && Email !== "" && Username !== "") {
            const registerService = new UserService();
            await registerService.registerUser(Password, CpfCnpj, PhoneNumber, FullName, Email, Username, Birthday)
                .then(response => {
                    if (response.status > 200 && response.status < 300) {
                        state.responseTitle = `Nicee!`
                        state.responseMessage = `Aww yeah, you successfully registered in our site! Be very welcome :)`
                        state.success = true
                        handleModal()
                    }
                }).catch(response => {
                    if (response.response !== undefined && response.response.status >= 400) {
                        state.responseTitle = `Ooops! We got an error.`
                        state.responseMessage = `${response.response.data.message}\nIf you think that it is not an error, please contact an administrator!`
                        handleModal()
                    }else{
                        state.responseTitle = `Ooops! We got an error.`
                        state.responseMessage = `Apparently we can't contact our services! Please contact an administrator!`
                        handleModal()
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
                        if (state.success) window.location.href = "/login";
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>

            <h4 className="text-lg-center align-title">User Registration</h4>

            <Row>

                <Col lg="6" className="offset-lg-3">

                    <Card className="align-card">

                        <Form noValidate validated={validated}>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formFullName">
                                    <Form.Label>Full Name:</Form.Label>
                                    <Form.Control name="FullName" required onChange={e => handleChange(e)}
                                                  placeholder="Full Name"/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid full name.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control name="Username" required onChange={e => handleChange(e)}
                                                  placeholder="Username"/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid username.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control name="Email" required type="email" onChange={e => handleChange(e)}
                                                  placeholder="Email"/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email.
                                    </Form.Control.Feedback>
                                </Form.Group>

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

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formBirthday">
                                    <Form.Label>Birth Date:</Form.Label>
                                    <Form.Control name="Birthday" maxLength={10}
                                                  value={formatDate(state.Birthday)}
                                                  onChange={e => handleChange(e)}
                                                  placeholder="Birth Date (dd/mm/yyyy)"
                                                  isInvalid={state.Birthday !== "" && state.Birthday.length < 10}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid birth date.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formPhoneNumber">
                                    <Form.Label>Phone Number:</Form.Label>
                                    <Form.Control name="PhoneNumber" required value={phoneNumberMask(state.PhoneNumber)}
                                                  onChange={e => handleChange(e)}
                                                  placeholder="Phone Number"
                                                  isInvalid={state.PhoneNumber !== "" && state.PhoneNumber.length < 14}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid phone number.
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
                            </Form.Group>

                            <Button variant="dark" onClick={handleRegister}>
                                Register
                            </Button>

                        </Form>

                    </Card>

                </Col>

            </Row>

        </Container>
    );


}

export default RegisterView;
