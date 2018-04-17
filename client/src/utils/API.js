import axios from "axios";

export default {
    createUser: (userData) => axios.post("/api/user/new", userData)
    // updateUser: (userData) => axios.put("/api/userData", userData)
}