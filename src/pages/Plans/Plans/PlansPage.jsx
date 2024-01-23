import MyDataTable, {
  MyColBool,
  MyColDate,
} from "../../../components/MyDataTable";
import AppScaffold from "../../../layouts/AppScaffold";
import usePlansModel, { PlansModel } from "./PlansModel";
import { GridActionsCellItem } from "@mui/x-data-grid";
import {
  AddTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  VisibilityTwoTone,
} from "@mui/icons-material";

import useMyForm, { MyFormDialog, MyForm } from "../../../components/MyForm";
import { eUseTranslation } from "react-e-utils";

const PlansPage = () => {
  return <PlansModel.Provider children={<Plans />} />;
};
export default PlansPage;

const Plans = () => {
  const { t } = eUseTranslation();
  const { modal, openAdd, openEdit, openView, closeForm } = useMyForm();
  const { data, read, edit, add, dele } = usePlansModel();

  return (
    <AppScaffold loading={read.waiting}>
      <MyDataTable
        rows={data ?? []}
        columns={[
          { field: "id", headerName: t("id"), width: 75 },
          { field: "name", headerName: t("name"), width: 150 },
          { field: "code", headerName: t("code"), width: 150 },
          { field: "description", headerName: t("description"), width: 150 },
          { field: "banner", headerName: t("banner"), width: 150 },
          { field: "rooms_count", headerName: t("rooms_count"), width: 150 },
          {
            field: "permanent_rooms",
            headerName: t("permanent_rooms"),
            width: 150,
          },
          {
            field: "monthly_price",
            headerName: t("monthly_price"),
            width: 150,
          },
          {
            field: "monthly_discount",
            headerName: t("monthly_discount"),
            width: 150,
          },
          {
            field: "annually_price",
            headerName: t("annually_price"),
            width: 150,
          },
          {
            field: "annually_discount",
            headerName: t("annually_discount"),
            width: 150,
          },
          MyColBool({
            field: "type",
            headerName: t("type"),
            width: 125,
            valueProps: {
              1: { label: t("main") },
              0: { label: t("extra") },
            },
          }),
          MyColBool({
            field: "active",
            headerName: t("active"),
            width: 125,
            valueProps: {
              1: { label: t("in_active"), color: "error" },
              0: { label: t("active"), color: "success" },
            },
          }),
          MyColBool({
            field: "price_active",
            headerName: t("price_active"),
            width: 125,
            valueProps: {
              1: { label: t("price_in_active"), color: "error" },
              0: { label: t("price_active"), color: "success" },
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
        headerTitle={t("plans")}
        headerActions={[
          {
            icon: <AddTwoTone />,
            label: t("add_plan"),
            variant: "outlined",
            onClick: () => {
              openAdd();
            },
          },
        ]}
      />

      <MyFormDialog
        modal={modal}
        title={t("plans")}
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
              { value: "main", label: t("main") },
              { value: "extra", label: t("extra") },
            ],
          }),
          MyForm.input.text({
            name: "name",
            label: t("name"),
            required: true,
          }),
          MyForm.input.number({
            name: "code",
            label: t("code"),
            required: true,
          }),
          MyForm.input.text({
            name: "description",
            label: t("description"),
            required: true,
          }),
          MyForm.input.text({
            name: "banner",
            label: t("banner"),
            required: true,
          }),
          MyForm.input.number({
            name: "rooms_count",
            label: t("rooms_count"),
            required: true,
          }),
          MyForm.input.text({
            name: "permanent_rooms",
            label: t("permanent_rooms"),
            required: true,
          }),
          MyForm.input.amount({
            name: "monthly_price",
            label: t("monthly_price"),
            required: true,
          }),
          MyForm.input.number({
            name: "monthly_discount",
            label: t("monthly_discount"),
            required: true,
          }),
          MyForm.input.amount({
            name: "annually_price",
            label: t("annually_price"),
            required: true,
          }),
          MyForm.input.amount({
            name: "annually_discount",
            label: t("annually_discount"),
            required: true,
          }),
          MyForm.select({
            name: "active",
            label: t("active"),
            required: true,
            options: [
              { value: "1", label: t("active") },
              { value: "0", label: t("in_active") },
            ],
          }),
          MyForm.select({
            name: "price_active",
            label: t("price_active"),
            required: true,
            options: [
              { value: "1", label: t("price_active") },
              { value: "0", label: t("price_in_active") },
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
