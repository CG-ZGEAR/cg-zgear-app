import axios from "axios";
import async from "async";

const CART_MANAGEMENT_API = "http://localhost:8080/api/carts";

export const addToCartAPI = async (productId) => {
        const token = localStorage.getItem("accessToken");
        let response = null;
        try {
            response = await axios.get(
                `${CART_MANAGEMENT_API}/add/${productId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error("error:", error);
            throw error;
        }
    console.log(response);
        return response.data;

    }

export const getCartAPI = async () => {
    const token = localStorage.getItem("accessToken");
    let response = null;
    try {
        response = await axios.get(
            `${CART_MANAGEMENT_API}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
    return response.data;
}