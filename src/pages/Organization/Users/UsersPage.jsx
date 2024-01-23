import MyDataTable, {
  MyColBool,
  MyColDate,
} from "../../../components/MyDataTable";
import AppScaffold from "../../../layouts/AppScaffold";
import useOrgUsersModel, { OrgUsersModel } from "./OrgUsersModel";
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

const UsersPage = () => {
  return <OrgUsersModel.Provider children={<UsersUsers />} />;
};
export default UsersPage;

const UsersUsers = () => {
  const { t } = eUseTranslation();
  const { modal, openAdd, openEdit, openView, closeForm } = useMyForm();
  const { data, read, edit, add, dele } = useOrgUsersModel();

  return (
    <AppScaffold loading={read.waiting}>
      <MyDataTable
        rows={data ?? []}
        columns={[
          { field: "id", headerName: t("id"), width: 75 },
          { field: "role", headerName: t("role"), width: 100 },
          { field: "name", headerName: t("name"), width: 150 },
          { field: "email", headerName: t("email"), width: 200 },
          { field: "mobile", headerName: t("mobile"), width: 125 },
          MyColBool({
            field: "banned",
            headerName: t("status"),
            width: 125,
            valueProps: {
              1: { label: t("banned"), color: "error" },
              0: { label: t("active"), color: "success" },
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
        headerTitle={t("users")}
        headerActions={[
          {
            icon: <AddTwoTone />,
            label: t("add_user"),
            variant: "outlined",
            onClick: () => {
              openAdd();
            },
          },
        ]}
      />

      <MyFormDialog
        modal={modal}
        title={t("users")}
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
            name: "role",
            label: t("role"),
            required: true,
            options: [
              { value: "admin", label: t("admin") },
              { value: "data", label: t("data") },
              { value: "support", label: t("support") },
            ],
          }),
          MyForm.input.text({
            name: "name",
            label: t("name"),
            required: true,
          }),
          MyForm.input.email({
            name: "email",
            label: t("email"),
            required: true,
          }),
          MyForm.input.mobile({
            name: "mobile",
            label: t("phone_number"),
            required: true,
          }),
          MyForm.select({
            name: "banned",
            label: t("status"),
            required: true,
            options: [
              { value: "0", label: t("active") },
              { value: "1", label: t("banned") },
            ],
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
