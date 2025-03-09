const API_URL = "http://localhost:5000/api";

export const loginUser = async (email, password) => {
  try {
    console.log("Making login request to:", `${API_URL}/auth/login`);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error in API service:", error);
    throw error;
  }
};

export const registerUser = async (email, password, studentId, courseName) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, studentId, courseName }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const getUserData = async (token) => {
  const response = await fetch(`${API_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to get user data");
  return data;
};
