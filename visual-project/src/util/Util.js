const commonUrl = "http://118.178.19.149:8099/ecm";

const getUrl = (url) => {
  let uri = commonUrl + url;
  return uri;
};

const asyncHttpPost = (url, param, succ, err, contentType) => {
  if (!contentType) contentType = "application/json";

  const headers = {};
  headers["content-type"] = contentType;
  headers["charset"] = "UTF-8";

  const params = {
    method: "post",
    headers,
    body: param,
  };

  fetch(getUrl(url), params)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log("succeed");
      return response.json();
    })
    .catch((error) => console.error("Error:", error))
    .then(succ);
};

const asyncHttpGet = (url, succ, err, contentType) => {
  if (!contentType) contentType = "application/x-www-form-urlencoded";

  const params = {
    method: "get",
    headers: {
      "content-type": contentType,
      charset: "UTF-8",
    },
  };

  fetch(getUrl(url), params)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(succ)
    .catch(err);
};

export { getUrl, asyncHttpGet, asyncHttpPost };
