import MyDataTable, {
    MyColDate,
  } from "../../../components/MyDataTable";
  import AppScaffold from "../../../layouts/AppScaffold";
  import useCmsLocalesModel, { CmsLocalesModel } from "./CmsLocalesModel";
  import { GridActionsCellItem } from "@mui/x-data-grid";
  import {
    EditTwoTone,
    VisibilityTwoTone,
  } from "@mui/icons-material";
  
  import useMyForm, { MyFormDialog, MyForm } from "../../../components/MyForm";
  import { eUseTranslation } from "react-e-utils";
  
  const LocalesPage = () => {
    return <CmsLocalesModel.Provider children={<CmsLocales />} />;
  };
  export default LocalesPage;
  
  const CmsLocales = () => {
    const { t } = eUseTranslation();
    const { modal, openEdit, openView, closeForm } = useMyForm();
    const { data, read, edit } = useCmsLocalesModel();
  
    return (
      <AppScaffold loading={read.waiting}>
        <MyDataTable
          rows={data ?? []}
          columns={[
            { field: "id", headerName: t("id"), width: 75 },
            { field: "name", headerName: t("name"), width: 150 },
            { field: "native_name", headerName: t("native_name"), width: 150 },
            { field: "json", headerName: t("json"), width: 200 },
            MyColDate({
              field: "addstamp",
              headerName: t("add_date"),
            }),
            MyColDate({
              field: "updatestamp",
              headerName: t("modified_date"),
            }),
          ]}
          actions={(item) => [
            <GridActionsCellItem
              key={"ta1"}
              icon={<VisibilityTwoTone />}
              label="View"
              color="info"
              onClick={() => {
                openView(item);
              }}
            />,
            <GridActionsCellItem
              key={"ta2"}
              icon={<EditTwoTone />}
              label="Edit"
              color="alert"
              onClick={() => {
                openEdit(item);
              }}
            />,
          ]}
          actionsWidth={125}
          headerTitle={t("locales")}
        />
  
        <MyFormDialog
          modal={modal}
          title={t("locales")}
          onEditSubmit={async ({ data, formData }) => {
            let r = await edit.call({ item: data, formData });
            if (r === true) closeForm();
          }}
          inputs={[
            MyForm.input.text({
              name: "name",
              label: t("name"),
              required: false,
            }),
            MyForm.input.text({
              name: "native_name",
              label: t("native_name"),
              required: false,
            }),
            MyForm.input.text({
              name: "json",
              label: t("json"),
              required: false,
            }),
          ]}
          actions={[
            MyForm.action({
              color: "error",
              onClick: closeForm,
              label: t("close"),
              sx: { px: 5 },
            }),
            MyForm.action({
              type: "submit",
              label: t("submit"),
              loading: edit.waiting,
              sx: { px: 5 },
              view: false,
            }),
          ]}
        />
      </AppScaffold>
    );
  };
  