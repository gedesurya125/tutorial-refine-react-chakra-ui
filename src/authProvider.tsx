import axios from "axios";
export const axiosInstance = axios.create();
// ? This example using local storage

const mockUsers = [
  {
    email: "john@mail.com",
    roles: ["admin"],
    name: "John",
    avatar: "https://i.pravatar.cc/300",
    token: undefined,
  },
  {
    email: "jane@mail.com",
    roles: ["editor"],
    name: "Jane",
    avatar: "https://i.pravatar.cc/300",
    token: "",
  },
  {
    email: "gedesurya125@gmail.com",
    roles: ["admin"],
    name: "surya",
    avatar: "https://i.pravatar.cc/300",
    token: "",
  },
];

export const authProvider: any = {
  login: async ({
    email,
    password,
    remember,
  }: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.email === email);

    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));

      // This sets the authorization headers on Axios instance
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${user?.token}`,
      };

      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login Error",
        name: "Invalid email or password",
      },
    };
  },

  check: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error: any) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
  getPermissions: () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { roles } = JSON.parse(user);

      return roles;
    }

    return null;
  },
  getIdentity: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { email, roles, name, avatar } = JSON.parse(user);

      return { email, roles, name, avatar };
    }

    return null;
  },
  register: async ({
    email,
    name,
    avatar,
    roles,
  }: {
    email: string;
    name: string;
    avatar: string;
    roles: string[];
  }) => {
    const user = mockUsers.find((user) => user.email === email);

    if (user) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "User already exists",
        },
      };
    }

    mockUsers.push({
      email,
      name,
      avatar,
      roles: roles || ["editor"],
      token: undefined,
    });

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  forgotPassword: async ({ email }: { email: string }) => {
    // send password reset link to the user's email address here

    // if request is successful
    return {
      success: true,
      redirectTo: "/login",
    };

    // if request is not successful
    return {
      success: false,
      error: {
        name: "Forgot Password Error",
        message: "Email address does not exist",
      },
    };
  },
  updatePassword: async ({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }) => {
    // update the user's password here

    // if request is successful
    return {
      success: true,
      redirectTo: "/login",
    };

    // if request is not successful
    return {
      success: false,
      error: {
        name: "Forgot Password Error",
        message: "Email address does not exist",
      },
    };
  },
};
