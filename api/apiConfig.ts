const apiConfig = {
    baseUrl: "192.168.1.3/api/",
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
    getParticipatedSyrveys: "survey/participated",

    // decisions
    getDecisionVote: "survey/decision/vote",
}

export default apiConfig;