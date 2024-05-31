const apiConfig = {
    baseUrl: "http://192.168.1.5:8000/api/",
    // registration
    register: "register",

    // authentication / authorization
    login: "/login",
    
    // users
    getUser: "user",
    deleteUser: "user/delete",

    // surveys
    getSurvey: "survey/show",
    createSurvey: "survey/create",
    deleteSurvey: "survey/delete",
    getParticipatedSurveys: "survey/participated",
    isVoted: "survey/isVoted",

    // decisions
    createVote: "survey/decision/vote",

    //votes
    resetVotes: "survey/decision/votes/reset"
}

export default apiConfig;