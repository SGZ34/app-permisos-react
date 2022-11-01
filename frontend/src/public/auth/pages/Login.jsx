import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { Formik } from "formik";

import { Link as LinkRouter } from "react-router-dom";
import { loginSchema } from "../../../schemas";
import { useAuth } from "../../../hooks";

function Copyright() {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      align="center"
      sx={{ fontSize: 12 }}
    >
      Sistema de auntenticación, roles y permisos con React, express, jwt y
      mysql
      <Button
        component={LinkRouter}
        to="/auth/register"
        sx={{
          display: "block",
          textDecoration: "none",

          color: "#000",
          marginTop: "10px",
          fontSize: 10,
        }}
        variant="text"
      >
        ¿No tienes una cuenta? Aqui puedes crearla
      </Button>
    </Typography>
  );
}

export const Login = () => {
  const { startLogin } = useAuth();

  const submit = (values) => {
    startLogin(values);
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="animate__animated animate__fadeIn"
    >
      <Card variant="outlined" sx={{ padding: 2, marginTop: 20 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={submit}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Correo electrónico"
                  type="text"
                  autoComplete="email"
                  color="secondary"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Contraseña"
                  type="password"
                  color="secondary"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesión
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Card>
    </Container>
  );
};
