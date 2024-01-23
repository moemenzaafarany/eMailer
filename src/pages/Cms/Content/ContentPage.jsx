import MyDataTable, {
    MyColBool,
    MyColDate,
  } from "../../../components/MyDataTable";
  import AppScaffold from "../../../layouts/AppScaffold";
  import useCmsContentModel, { CmsContentModel } from "./CmsContentModel";
  import { GridActionsCellItem } from "@mui/x-data-grid";
  import {
    AddTwoTone,
    DeleteTwoTone,
    EditTwoTone,
    VisibilityTwoTone,
  } from "@mui/icons-material";
  
  import useMyForm, { MyFormDialog, MyForm } from "../../../components/MyForm";
  import { eUseTranslation } from "react-e-utils";
  import useMyDialog from "../../../components/MyDialog";
  
  const ContentPage = () => {
    return <CmsContentModel.Provider children={<CmsContent />} />;
  };
  export default ContentPage;
  
  const CmsContent = () => {
    const { t } = eUseTranslation();
    const { modal, openAdd, openEdit, openView, closeForm } = useMyForm();
    const { data, read, edit, add, dele } = useCmsContentModel();
  
    return (
      <AppScaffold loading={read.waiting}>
        <MyDataTable
          rows={data ?? []}
          columns={[
            { field: "id", headerName: t("id"), width: 75 },
            { field: "parent_id", headerName: t("parent_id"), width: 150 },
            { field: "page", headerName: t("page"), width: 150 },
            { field: "group", headerName: t("group"), width: 200 },
            { field: "sub_group", headerName: t("sub_group"), width: 125 },
            MyColBool({
              field: "type",
              headerName: t("type"),
              width: 125,
              valueProps: {
                "text": { label: t("text")},
                "image": { label: t("image")},
                "file": { label: t("file")},
              },
            }),
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
            <GridActionsCellItem
              key={"ta3"}
              icon={<DeleteTwoTone />}
              label="Delete"
              color="error"
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm(t("delete_confirm")) === true) {
                  dele.call({ item });
                }
              }}
            />,
          ]}
          actionsWidth={125}
          headerTitle={t("content")}
          headerActions={[
            {
              icon: <AddTwoTone />,
              label: t("add_content"),
              variant: "outlined",
              onClick: () => {
                openAdd();
              },
            },
          ]}
        />
  
        <MyFormDialog
          modal={modal}
          title={t("content")}
          onAddSubmit={async ({ formData }) => {
            let r = await add.call({ formData });
            if (r === true) closeForm();
          }}
          onEditSubmit={async ({ data, formData }) => {
            let r = await edit.call({ item: data, formData });
            if (r === true) closeForm();
          }}
          inputs={[
            MyForm.select({
              name: "type",
              label: t("type"),
              required: true,
              options: [
                { value: "text", label: t("text") },
                { value: "image", label: t("image") },
                { value: "file", label: t("file") },
              ],
            }),
            MyForm.input.text({
              name: "parent_id",
              label: t("parent_id"),
              required: true,
            }),
            MyForm.input.text({
              name: "page",
              label: t("page"),
              required: true,
            }),
            MyForm.input.text({
              name: "group",
              label: t("group"),
              required: true,
            }),
            MyForm.input.text({
              name: "sub_group",
              label: t("sub_group"),
              required: true,
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
              loading: edit.waiting || add.waiting,
              sx: { px: 5 },
              view: false,
            }),
          ]}
        />
      </AppScaffold>
    );
  };
  