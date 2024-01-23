import { eCreateContext, eUseAsyncState, eUseCookieState } from "react-e-utils";
import ApisEB from "../configs/apis";

export const UserModel = eCreateContext(() => {
  const UID = eUseCookieState("UID", { expireHours: 1 });
  const UserData = eUseCookieState("UserData", { expireHours: 1 });

  const loginCall = eUseAsyncState(async (bodyData) => {
    let r = await ApisEB.call("admin/organization/users/access/login", {
      method: "POST",
      bodyData: bodyData,
    });
    if (r.success !== true) {
      console.log("error");
      alert(r.message);
      return false;
    } else {
      UID.value = r.data.UID;
      UserData.value = r.data.user;
      return true;
    }
  });

  const resetCall = eUseAsyncState(async (bodyData) => {
    let r = await ApisEB.call("admin/organization/users/access/rest-password", {
      method: "POST",
      bodyData: bodyData,
    });
    if (r.success !== true) {
      console.log("error");
      alert(r.message);
      return false;
    } else {
      return true;
    }
  });

  return {
    get UID() {
      return UID.value;
    },
    get UserData() {
      return UserData.value;
    },
    get loggedIn() {
      return !!UID.value;
    },

    loginCall: loginCall.run,
    get loginWaiting() {
      return loginCall.waiting;
    },
    
    resetCall: resetCall.run,
    get resetWaiting() {
      return resetCall.waiting;
    },
  };
});
const useUserModel = UserModel.Use;
export default useUserModel;
