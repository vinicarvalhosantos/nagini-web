import axios from "axios";

export class UserService {


    registerUser = async (Password: string, CpfCnpj: string, PhoneNumber: string, FullName: string, Email: string, Username: string, BirthDate: string) => {

        const UserEntity = {
            username: Username,
            userfullname: FullName,
            Email: Email,
            CpfCNPJ: CpfCnpj,
            Birthdate: BirthDate,
            PhoneNumber: PhoneNumber,
            Role: "user",
            Password: Password
        }

        const path = `${process.env.REACT_APP_BASE_URL}/v1/user/register`;

        return axios.post(path, UserEntity);

    }

    loginUser = async (Password: string, Username?: string, Email?: string) => {

        const LoginEntity = {
            Username: Username,
            Email: Email,
            Password: Password
        }

        const path = `${process.env.REACT_APP_BASE_URL}/v1/user/login`;

        return axios.post(path, LoginEntity);

    }

    confirmAccount = async (token: string | undefined) => {

        const path = `${process.env.REACT_APP_BASE_URL}/v1/user/confirm/${token}`;

        return axios.patch(path);

    }

    recoverPassword = async (cpfCnpj: string) =>{

        const path = `${process.env.REACT_APP_BASE_URL}/v1/user/recovery-password`;

        return axios.patch(path, {cpfCnpj: cpfCnpj});

    }

    changePassword = async (token: string | undefined, newPassword: string | undefined) => {

        const path = `${process.env.REACT_APP_BASE_URL}/v1/user/change-password/${token}`;

        return axios.patch(path, {NewPassword: newPassword});

    }


}