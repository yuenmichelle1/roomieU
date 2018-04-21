import axios from "axios";

export default {
    // createUser: (userData) => axios.post("/api/user/new", userData),
    createUser: (userData) => axios.post("/auth/register", userData),
    updateUser: (userData) => axios.put("/api/user/update", userData),
    loginUser: (userData) => axios.put("/auth/login", userData),
}