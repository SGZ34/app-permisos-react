import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

import { Link as LinkRouter } from "react-router-dom";
import { Formik } from "formik";
import { registerSchema } from "../../../schemas";
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
        to="/auth/login"
        sx={{
          display: "block",
          textDecoration: "none",

          color: "#000",
          marginTop: "10px",
          fontSize: 10,
        }}
        variant="text"
      >
        ¿Tienes una cuenta? Inicia sesión
      </Button>
    </Typography>
  );
}

export const Register = () => {
  const { startRegister } = useAuth();
  const submit = ({ name, email, password, confirmPassword }) => {
    startRegister({ name, email, password, confirmPassword });
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
            Registrarse
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
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
                  label="Nombre"
                  type="text"
                  autoComplete="name"
                  color="secondary"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
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

                <TextField
                  margin="normal"
                  fullWidth
                  label="Confirmar contraseña"
                  type="password"
                  color="secondary"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Registrarse
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
