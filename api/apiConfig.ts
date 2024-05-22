const apiConfig = {
    baseUrl: "http://192.168.1.3:8000/api/",
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
    createVote: "survey/decision/vote",
}

export default apiConfig;