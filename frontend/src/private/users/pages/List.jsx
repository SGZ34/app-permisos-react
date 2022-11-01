import { Link as RouterLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { useUsers } from "../../../contexts";

const columns = [
  {
    name: "#",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Rol",
    selector: (row) => row.rol,
    sortable: true,
  },
];

export const List = () => {
  const { users } = useUsers();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <DataTable
          title="Users"
          pagination
          columns={columns}
          data={users}
          sortIcon={<ArrowDownward />}
          dense
        />
      </CardContent>
      <CardActions>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="/app/users/create"
            sx={{ marginBottom: 4 }}
          >
            Create user
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};
