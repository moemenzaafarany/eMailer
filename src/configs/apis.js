import { eApiCaller, eDate, eError, eSuccess } from "react-e-utils";

//==============================< eapi state
const ApisEB = new eApiCaller("https://development.exabytellc.com/QChat/API/", {
  defaultHeaders: {
    "User-Timezone": eDate.now.timezoneOffset,
  },
  defaultBodyData: {},
  bodyDataType: "formdata",
  responseType: "json",
  responseHandler: (request) => {
    // request error
    if (request.httpCode !== 200) {
      return eError("server_error");
    }
    // api error
    let response = request.response;
    if (response.status !== 200) {
      // any error
      return eError(
        `${response.status}:${response.statusText}:${response.error}`,
        response.data
      );
    }
    // success
    return eSuccess(response.message, response.data);
  },
});
export default ApisEB;
ApisEB.getMedia = function (url) {
  if (url) return this.baseUrl + "_media/" + url;
  return null;
};
