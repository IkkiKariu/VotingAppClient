import axios, { AxiosResponse } from "axios";
import apiConfig from "../apiConfig";
import CreateUserDTO from "../../dto/createUserDto";




class UserRepository
{
    public getUser(bearerToken: string)
    {
        return axios({
            method: 'get',
            baseURL: apiConfig.baseUrl,
            url: apiConfig.getUser,
            headers: {Authorization: 'Bearer ${bearerToken}'}
        });
    }

    public createUser(createUserDto: CreateUserDTO)
    {
        return axios({
            method: 'post',
            baseURL: apiConfig.baseUrl,
            url: apiConfig.register,
            headers: {"Content-type": "application/json; charset=UTF-8"},
            data: createUserDto
        });
    }
}


export default UserRepository;

