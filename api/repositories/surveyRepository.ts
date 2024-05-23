import axios, { AxiosResponse } from 'axios';
import apiConfig from '../apiConfig';
import VoteDTO from '../../dto/voteDto';

class SurveyRepository
{
    public getSurvey(bearerToken: string, surveyPublicUid: string): Promise<AxiosResponse>
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

    public createVote(bearerToken: string, vote: VoteDTO ): Promise<AxiosResponse>
    {
        return axios({
            method: 'post',
            baseURL: apiConfig.baseUrl,
            url: apiConfig.createVote,
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            data: {survey_public_uid: vote.surveyPublicUid, decision_id: vote.decisionId}
        });
    }

    public isVoted(bearerToken: string, surveyPublicUid: string): Promise<AxiosResponse>
    {
        return axios({
            method: 'post',
            baseURL: apiConfig.baseUrl,
            url: apiConfig.isVoted,
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            data: {survey_public_uid: surveyPublicUid}
        });
    }
}




export default SurveyRepository;