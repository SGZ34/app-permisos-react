import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { createRol } from "../../../schemas";

import { useRoles } from "../../../contexts";
import { api } from "../../../api";

export const Create = () => {
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/roles/permissions");

      setPermissions(data);
    })();
  }, []);

  const navigate = useNavigate();
  const { create } = useRoles();
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
            Create rol
          </Typography>
          <Formik
            initialValues={{
              name: "",
              permissions: undefined,
            }}
            validationSchema={createRol}
            onSubmit={(values) => {
              create(values);
              navigate("/app/roles");
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

                <FormControl
                  error={!!touched.permissions && !!errors.permissions}
                  component="fieldset"
                  sx={{ m: 3 }}
                  variant="standard"
                >
                  <FormLabel component="legend">
                    Select the permissions
                  </FormLabel>
                  <FormGroup>
                    {permissions.map((p) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="permissions"
                            value={p.id}
                            onChange={handleChange}
                          />
                        }
                        label={p.description}
                        key={p.id}
                      />
                    ))}
                  </FormGroup>
                  {!!errors.permissions && (
                    <FormHelperText>{errors.permissions}</FormHelperText>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create rol
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Card>
    </Container>
  );
};
