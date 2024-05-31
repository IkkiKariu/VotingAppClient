import SurveyRepository from "../api/repositories/surveyRepository";
import userData from "../userData";
import VoteDTO from "../dto/voteDto";
import {SurveyAnalyticsDTO} from "../dto/surveyAnalyticsDto";
import axios, { AxiosResponse } from 'axios';

class SurveyService
{
    private surveyRepository: SurveyRepository;

    public constructor(surveyRepository: SurveyRepository)
    {
        this.surveyRepository = surveyRepository;
    }

    public vote(vote: VoteDTO): Promise<AxiosResponse>
    {
        return this.surveyRepository.createVote(userData.apiToken, vote);
    }

    public explore(surveyData: any): SurveyAnalyticsDTO
    {
        const decisions: Array<any> = surveyData.decisions;

        let voteCounter: number = 0;
        const participants: Array<string> = [];
        const decisionsDto: Array<any> = [];

        decisions.forEach(decision => {
            const dec: any = {};

            dec.content = decision.content;
            dec.voteCount = decision.vote_count;

            decisionsDto.push(dec);
            
            const votes: Array<any> = decision.votes;

            votes.forEach(vote => {
                voteCounter += 1;

                participants.push(vote.user.name);
            })
        });
        console.log(decisions)


        decisionsDto.map(decision => {
            if(voteCounter != 0) {
                decision.precentage = decision.voteCount / voteCounter * 100;
            }
            else {
                decision.precentage = 0;
            }
        });

        const surveyAnalyticsDto: SurveyAnalyticsDTO = {
            isActive: true,
            publicUid: surveyData.public_uid,
            creator: {username: surveyData.creator.name, bio: surveyData.creator.bio},
            createdAt: surveyData.created_at,
            decisions: decisionsDto,
            participants: participants,
            voteCount: voteCounter
        }

        return surveyAnalyticsDto;
    }
}

export default SurveyService;