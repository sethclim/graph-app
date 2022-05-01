const baseUrl = `https://localhost:5001`;

export const EndPoints = {
    insertGraph: `${baseUrl}/graph`,
    getGraphs: `${baseUrl}/graph`,
    getUser: `${baseUrl}/user`,
    login: `${baseUrl}/user/authenticate`,
    signup: `${baseUrl}/user/`,
}