export const setSessionService = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionServices = () => {
  const auth = localStorage.getItem("authToken");
  if (auth && auth !== "") {
    return true;
  } else {
    return false;
  }
};
export const getSessionBusiness = () => {
  const authBusiness = localStorage.getItem("business");
  if (authBusiness && authBusiness !== "") {
    return true;
  } else {
    return false;
  }
};
