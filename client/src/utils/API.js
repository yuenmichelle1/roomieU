import axios from "axios";

export default {
    createUser: (userData) => axios.post("/auth/register", userData),
    updateUser: (id,userData) => axios.put(`/api/user/${id}`, userData),
    loginUser: (userData) => axios.post("/auth/login", userData),
    logoutUser: ()=>axios.get("/auth/logout"),
    getUserInfo: ()=>axios.get("/auth/"),
    filterUser: (user)=>axios.post(
        "/api/user", {
            school: user.school,
            radius: user.radius,
            budget: user.budget,
            _id: { $ne: user._id }
          }
    ),
    getMatch: (id) => axios.get(`/api/user/${id}`),
    getUserLikes: (id) => axios.post(`api/user/requested`, id)
}