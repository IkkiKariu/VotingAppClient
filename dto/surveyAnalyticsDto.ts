type SurveyCreatorDTO = {
    username: string,
    bio: string
}

type DecisionDTO = {
    content: string,
    voteCount: number,
    precentage: number
}

type SurveyAnalyticsDTO = {
    isActive: boolean,
    publicUid: string,
    creator: SurveyCreatorDTO,
    createdAt: string,
    decisions: DecisionDTO[],
    participants: string[],
    voteCount: number
}

export {SurveyAnalyticsDTO, DecisionDTO};