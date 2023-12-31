import axios from "axios";

const USER_MANAGEMENT_API = "http://localhost:8080/api/users";

export const getActiveUsers = async () => {
  let response = null;
  const token = localStorage.getItem("accessToken");
  try {
    response = await axios.get(`${USER_MANAGEMENT_API}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
  } catch (error) {
    console.error("Get active users API error:", error);
    throw error;
  }
  return response;
};

export const getDeletedUsers = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${USER_MANAGEMENT_API}/remove-user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Get deleted users API error:", error);
    throw error;
  }
};

export const lockUserAccount = async (userId) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${USER_MANAGEMENT_API}/${userId}/lock`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Lock user account API error:", error);
    throw error;
  }
};


export const unlockUserAccount = async (userId) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${USER_MANAGEMENT_API}/${userId}/unlock`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Unlock user account API error:", error);
    throw error;
  }
};


export const getDeleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${USER_MANAGEMENT_API}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Delete user API error:", error);
    throw error;
  }
};

export const getRegisterUser = async (userDTO) => {
  try {
    const response = await axios.post(
      `${USER_MANAGEMENT_API}/register`,
      userDTO
    );
    return response.data;
  } catch (error) {
    console.error("Register user API error:", error);
    throw error;
  }
};

export const getLoginUser = async (LoginRequestDTO) => {
  try {
    const response = await axios({
      url: `http://localhost:8080/api/login`,
      method: "POST",
      data: {
        username: LoginRequestDTO.username,
        password: LoginRequestDTO.password,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Register user API error:", error);
    throw error;
  }
};
