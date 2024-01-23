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
import {
  EmailTwoTone,
  LoginTwoTone,
  PasswordTwoTone,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import useUserModel from "../../models/UserModel";

const LoginPage = () => {
  const { device, forDevice } = eUseBreakpoints();
  const { loginCall, loginWaiting } = useUserModel();

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
            await loginCall(fd);
          })}
        >
          <LoginCard loading={loginWaiting} />
        </form>
      </Container>
    </AppScaffold>
  );
};
export default LoginPage;

const LoginCard = ({ loading }) => {
  const { t } = eUseTranslation();

  return (
    <Card variant={"outlined"}>
      <CardContent>
        <Stack spacing={3} alignItems={"center"}>
          <Typography variant="h3" children={t("login")} />
          <>
            <Box sx={{ width: "100%", textAlign: "start" }}>
              <Typography
                variant="h6"
                children={t("login_desc")}
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

            <TextField
              label={t("password")}
              size="normal"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    children={<PasswordTwoTone />}
                  />
                ),
                sx: { py: 1 },
              }}
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<LoginTwoTone />}
              variant="contained"
              type="submit"
              children={t("login")}
              fullWidth
            />

            <Button
              component={Link}
              to={`/reset`}
              replace={true}
              variant={"text"}
              color="secondary40"
              // startIcon={<PersonAddAltTwoTone />}
              children={t("forgot_password")}
            />
          </>
        </Stack>
      </CardContent>
    </Card>
  );
};
