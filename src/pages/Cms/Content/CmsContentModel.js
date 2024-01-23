import {
    eCreateContext,
    eList,
    eUseAsyncState,
    eUseState,
  } from "react-e-utils";
  import ApisEB from "../../../configs/apis";
  import useUserModel from "../../../models/UserModel";
  
  export const CmsContentModel = eCreateContext(() => {
    const { UID } = useUserModel();
    const data = eUseState(null);
  
    const getCall = eUseAsyncState(async () => {
      let r = await ApisEB.call("admin/cms/content/get", {
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
  
      formData.set("content_id", item?.id);
      formData.set("UID", UID);
      let r = await ApisEB.call("admin/cms/content/update", {
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
  
    const addCall = eUseAsyncState(async ({ formData }) => {
      if (!formData) return false;
      formData.set("UID", UID);
      let r = await ApisEB.call("admin/cms/content/add", {
        method: "POST",
        bodyData: formData,
      });
      if (r.success !== true) {
        console.log("error", r);
        alert(r.message);
        return false;
      } else {
        getCall.run();
        return true;
      }
    }, false);
    const deleteCall = eUseAsyncState(async ({ item }) => {
      let formData = new FormData();
      formData.set("content_id", item?.id);
      formData.set("UID", UID);
      let r = await ApisEB.call("admin/cms/content/delete", {
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
        data.value = eList.removeIndexFromArr(arr, i);
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
  
      get add() {
        return {
          get call() {
            return addCall.run;
          },
          get waiting() {
            return addCall.waiting;
          },
        };
      },
      get dele() {
        return {
          get call() {
            return deleteCall.run;
          },
          get waiting() {
            return deleteCall.waiting;
          },
        };
      },
    };
  });
  const useCmsContentModel = CmsContentModel.Use;
  export default useCmsContentModel;
  