import { Button, Container, Stack, Typography } from "@mui/material";
import { eUseBreakpoints, eUseTranslation } from "react-e-utils";

import { ArrowBackTwoTone, ArrowForwardTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppScaffold from "../layouts/AppScaffold";
import useUserModel from "../models/UserModel";

const Err404Page = () => {
  const { forDevice } = eUseBreakpoints();
  const { t, forDir } = eUseTranslation();
  const navigate = useNavigate();
  const { loggedIn } = useUserModel();

  return (
    <AppScaffold access={!loggedIn}>
      <Container fixed sx={{ my: forDevice(4, null, 8) }}>
        <Stack spacing={forDevice(2, null, 4)} alignItems={"center"}>
          <Typography textAlign={"center"} variant="h3">
            {t("page_not_found")}
          </Typography>
          <Button
            variant="text"
            onClick={() => {
              navigate(window.history.length > 1 ? -1 : "/");
            }}
            color="secondary20"
            startIcon={forDir(
              <ArrowBackTwoTone fontSize="small" />,
              <ArrowForwardTwoTone fontSize="small" />
            )}
          >
            {t("back")}
          </Button>
        </Stack>
      </Container>
    </AppScaffold>
  );
};
export default Err404Page;

// return (
//   <AppScaffold>
//     <MyDataTable
//       rows={data()}
//       columns={[
//         { field: "id", headerName: "ID" },
//         { field: "name", headerName: "Name", width: 150 },
//         { field: "age", headerName: "Age", type: "number" },
//       ]}
//     />
//   </AppScaffold>
// );
