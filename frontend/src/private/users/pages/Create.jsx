import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../schemas";
import { api } from "../../../api";
import { useUsers } from "../../../contexts";

export const Create = () => {
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  const { create } = useUsers();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/roles");
      setRoles(data);
    })();
  }, []);

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="animate__animated animate__fadeIn"
    >
      <Card variant="outlined" sx={{ padding: 2, marginTop: 10 }}>
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
            Create user
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              rol: "",
            }}
            validationSchema={createUser}
            onSubmit={(values) => {
              create(values);
              navigate("/app/users");
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Name"
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
                  label="Email"
                  type="text"
                  autoComplete="email"
                  color="secondary"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.rol}
                    label="Rol"
                    name="rol"
                    onChange={handleChange}
                    error={touched.rol && !!errors.rol}
                  >
                    {roles.map((rol) => (
                      <MenuItem value={rol.id} key={rol.id}>
                        {rol.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.rol && (
                    <FormHelperText sx={{ color: "#f00" }}>
                      {errors.rol}
                    </FormHelperText>
                  )}
                </FormControl>

                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
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
                  label="Confirm password"
                  type="password"
                  autoComplete="confirmPassword"
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
                  Create user
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Card>
    </Container>
  );
};
