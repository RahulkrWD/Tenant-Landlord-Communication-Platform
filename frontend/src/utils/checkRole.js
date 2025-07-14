import { jwtDecode } from "jwt-decode";

const getRole = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error("Invalid Token: ", error);
    return null;
  }
};

export default getRole;
