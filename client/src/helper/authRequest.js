module.exports = ({ method, body }) => {
  var data = body;
  let headers = new Headers();
  const token = localStorage.getItem("social-app-user");
  headers.append("Authorization", `Bearer ${token}`);
  if (method.toLowerCase() === "post") {
    headers.append("Content-Type", "application/json");
  }
  if (method.toLowerCase() === "get") {
    data = null;
  }
  var requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
  console.log(requestOptions);
  return requestOptions;
};
