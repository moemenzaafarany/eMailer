import { Button, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useCallback } from "react";
import { eDate, eList } from "react-e-utils";

const MyDataTable = ({
  rows,
  columns,
  actions,
  actionsWidth = 100,
  actionsEnd = false,
  loading,
  columnVisibilityModel,
  headerTitle,
  headerActions,
}) => {
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer sx={{ alignItems: "flex-end" }}>
        {headerTitle && (
          <GridToolbarContainer>
            <Typography variant="h3" children={headerTitle} />
          </GridToolbarContainer>
        )}

        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarQuickFilter />
        <GridToolbarFilterButton />

        {headerActions && (
          <GridToolbarContainer>
            {eList.toArray(headerActions, (i, item) => {
              return (
                <Button
                  key={`dtha-${i}`}
                  type="button"
                  size="small"
                  variant={item?.variant ?? "text"}
                  color={item?.color ?? "primary"}
                  onClick={item?.onClick}
                  children={item?.label}
                  startIcon={item?.icon}
                />
              );
            })}
          </GridToolbarContainer>
        )}

        <GridToolbarDensitySelector />
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const getColumns = useCallback(() => {
    var cols = columns;
    if (actions) {
      let ac = {
        field: "actions",
        type: "actions",
        width: actionsWidth,
        getActions: (props) => actions(props.row),
      };
      if (actionsEnd) {
        cols.push(ac);
      } else {
        cols = [ac, ...cols];
      }
    }
    return cols;
  }, [columns, actions, actionsWidth, actionsEnd]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        autoPageSize
        loading={loading}
        rows={rows}
        columns={getColumns()}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableExportButton: true },
          },
          filterPanel: {
            // Display columns by ascending alphabetical order
            filterFormProps: {
              // Customize inputs by passing props
              sx: {
                "& .MuiInput-input": {
                  height: "auto",
                },
              },
              deleteIconProps: {
                sx: {
                  "& .MuiSvgIcon-root": { color: "palette.error" },
                },
              },
            },
          },
        }}
        checkboxSelection
        columnVisibilityModel={columnVisibilityModel}
      />
    </Box>
  );
};

export default MyDataTable;

export const MyColDate = ({ field, headerName, width = 200 }) => {
  return {
    field: field,
    headerName: headerName,
    width: width,
    valueFormatter: ({ value }) => new eDate(value).readableDatetimeFormat,
  };
};

export const MyColBool = ({
  field,
  headerName,
  width = 200,
  valueProps = { true: {}, false: {} },
}) => {
  return {
    field: field,
    headerName: headerName,
    width: width,
    renderCell: (params) => {
      let props = valueProps[params.value] ?? {};
      return <Chip variant="outlined" {...props} />;
    },
  };
};
