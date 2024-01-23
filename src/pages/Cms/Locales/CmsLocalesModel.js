import {
    eCreateContext,
    eList,
    eUseAsyncState,
    eUseState,
  } from "react-e-utils";
  import ApisEB from "../../../configs/apis";
  import useUserModel from "../../../models/UserModel";
  
  export const CmsLocalesModel = eCreateContext(() => {
    const { UID } = useUserModel();
    const data = eUseState(null);
  
    const getCall = eUseAsyncState(async () => {
      let r = await ApisEB.call("admin/cms/locales/get", {
        method: "POST",
        bodyData: {
          UID: UID,
        },
      });
      console.log(r.data.users);
      if (r.success !== true) {
        console.log("error", r);
        alert(r.message);
        return false;
      } else {
        data.value = r.data.users;
        return true;
      }
    }, true);
  
    const editCall = eUseAsyncState(async ({ item, formData }) => {
      if (!item || !formData) return false;
  
      formData.set("locale_id", item?.id);
      formData.set("UID", UID);
      let r = await ApisEB.call("admin/cms/locales/update", {
        method: "POST",
        bodyData: formData,
      });
      if (r.success !== true) {
        console.log("error", r);
        alert(r.message);
        return false;
      } else {
        let arr = [...data.value];
        let i = eList.findIndex(arr, (i, o) => o.id === item?.id);
        for (let pair of formData) {
          arr[i][pair[0]] = pair[1];
        }
        data.value = arr;
        return true;
      }
    }, false);
  
  
    return {
      get data() {
        return data.value;
      },
  
      get read() {
        return {
          get call() {
            return getCall.run;
          },
          get waiting() {
            return getCall.waiting;
          },
        };
      },
  
      get edit() {
        return {
          get call() {
            return editCall.run;
          },
          get waiting() {
            return editCall.waiting;
          },
        };
      },
    };
  });
  const useCmsLocalesModel = CmsLocalesModel.Use;
  export default useCmsLocalesModel;
  