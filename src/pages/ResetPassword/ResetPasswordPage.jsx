import React from "react";
import AppScaffold from "../../layouts/AppScaffold";
import { Box, Container } from "@mui/system";
import { eDom, eUseBreakpoints, eUseTranslation } from "react-e-utils";
import {
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { EmailTwoTone, LoginTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUserModel from "../../models/UserModel";

const ResetPasswordPage = () => {
  const { device, forDevice } = eUseBreakpoints();
  const { resetCall, resetWaiting } = useUserModel();
  const navigate = useNavigate();

  return (
    <AppScaffold access={true}>
      <Container
        fixed={device === "mobile"}
        maxWidth={device === "mobile" ? "desktop" : "tablet"}
        sx={{ my: forDevice(2, null, 4) }}
      >
        <form
          onSubmit={eDom.eventPreventDefault(async (event, target) => {
            let fd = new FormData(target);
            await resetCall(fd);

            alert("Password Reset!");
            navigate("/login");
          })}
        >
          <ResetPasswordCard loading={resetWaiting} />
        </form>
      </Container>
    </AppScaffold>
  );
};
export default ResetPasswordPage;

const ResetPasswordCard = ({ loading }) => {
  const { t } = eUseTranslation();

  return (
    <Card variant={"outlined"}>
      <CardContent>
        <Stack spacing={3} alignItems={"center"}>
          <Typography variant="h3" children={t("reset_password")} />
          <>
            <Box sx={{ width: "100%", textAlign: "start" }}>
              <Typography
                variant="h6"
                children={t("reset_password_desc")}
                sx={{ color: "dark.main" }}
              />
            </Box>

            <TextField
              label={t("email")}
              size="normal"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    children={<EmailTwoTone />}
                  />
                ),
                sx: { py: 1 },
              }}
              name="email"
              type="email"
              required
            />
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<LoginTwoTone />}
              variant="contained"
              type="submit"
              children={t("submit")}
              fullWidth
            />

            <Button
              component={Link}
              to={`/login`}
              replace={true}
              variant={"text"}
              color="secondary40"
              // startIcon={<PersonAddAltTwoTone />}
              children={t("back")}
            />
          </>
        </Stack>
      </CardContent>
    </Card>
  );
};
