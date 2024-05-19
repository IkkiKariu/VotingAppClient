import axios from 'axios';
import apiConfig from '../apiConfig';

class SurveyRepository
{
    public getSurvey()
    {
        return axios({
            method: 'get',
            baseURL: apiConfig.baseUrl,
            url: apiConfig.getSurvey,
            headers: {Authorization: 'Bearer ${bearerToken}'}
        });
    }
}

export default SurveyRepository;