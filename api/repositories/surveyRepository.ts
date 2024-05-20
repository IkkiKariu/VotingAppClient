import axios from 'axios';
import apiConfig from '../apiConfig';

class SurveyRepository
{
    public getSurvey(bearerToken: string, surveyPublicUid: string)
    {
        return axios({
            method: 'post',
            baseURL: apiConfig.baseUrl,
            url: apiConfig.getSurvey,
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            data: {survey_public_uid: surveyPublicUid}
        });
    }
}

export default SurveyRepository;