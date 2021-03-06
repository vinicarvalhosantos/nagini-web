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

        return await axios.post(path, UserEntity)

    }

    loginUser = async (Password: string, Username?: string, Email?: string) => {

        const LoginEntity = {
            Username: Username,
            Email: Email,
            Password: Password
        }

        const path = `${process.env.REACT_APP_BASE_URL}/v1/user/login`;

        return await axios.post(path, LoginEntity)

    }


}