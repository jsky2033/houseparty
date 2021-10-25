//helpers
export const validateInput = (inputData) => {
  let empty_message = null;
  for (let input in inputData) {
    if (!inputData[input]) {
      empty_message = `${input.toUpperCase()[0] + input.slice(1)} is missing!`;
    }
  }
  return empty_message;
};

//login-test
export const loginApi = () => {
  localStorage.setItem("jwt-simulation", "234215");
};
export const logoutApi = () => {
  localStorage.removeItem("jwt-simulation");
  window.location = "/";
};
