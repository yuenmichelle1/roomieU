import axios from "axios";

export default {
    // createUser: (userData) => axios.post("/api/user/new", userData),
    createUser: (userData) => axios.post("/auth/register", userData),
    updateUser: (id,userData) => axios.put(`/api/user/${id}`, userData),
    loginUser: (userData) => axios.post("/auth/login", userData),
    logoutUser: ()=>axios.get("/auth/logout"),
    getUserInfo: ()=>axios.get("/auth/"),
    getAllUsers: () => axios.get("/api/user/"),
}