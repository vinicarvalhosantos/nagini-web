import {Container, Spinner} from "react-bootstrap";
import "../Main.css"
import {UserService} from "../../services/UserService";
import React, {useEffect} from "react";

export function LoginView() {

    useEffect( () =>{
        handleConfirmAccount().then()
    })

    const handleConfirmAccount = async () => {

        const userService = new UserService()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const history = window.location;
        const token = history.pathname.split("/")[2]
        await userService.confirmAccount(token)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    alert("Email confirmado com sucesso!")
                    window.location.href = "/"
                }
            }).catch(response => {
                if (response.response !== undefined && response.response.status >= 400) {
                    alert(`${response.response.data.message}`)
                } else {
                    alert("Apparently we can't contact our services! Please contact an administrator!")
                }
            })
    }


    return (
        <Container>

            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

        </Container>
    );


}

export default LoginView;