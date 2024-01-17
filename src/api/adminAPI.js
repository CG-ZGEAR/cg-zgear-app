import axios from "axios";

const ADMIN_MANAGEMENT_API = "http://localhost:8080/api/admin";

export const getUserDetails = async (userId) =>{
    const token = localStorage.getItem("accessToken");
    let response = null;
    try {
         response = await axios.get(
            `${ADMIN_MANAGEMENT_API}/user-list/user/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error("Get deleted users API error:", error);
        throw error;
    }
    return response.data;

}