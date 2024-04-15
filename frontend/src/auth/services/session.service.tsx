

export const setSessionService = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionServices = (key: string) => {
  try {

    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem(key);

      if (auth && auth !== "") {
        const parsedAuth = auth;
        return parsedAuth;
      } else {
        return "";
      }
    }

    return "no windows";
  } catch (error) {
    localStorage.removeItem("authToken");
    console.error("Ocurrió un error:", error);
    return "";
  }
};
