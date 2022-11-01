import { Link as RouterLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { useRoles } from "../../../contexts";

const columns = [
  {
    name: "#",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.nombre,
    sortable: true,
  },
];

export const List = () => {
  const { roles } = useRoles();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <DataTable
          title="Roles"
          pagination
          columns={columns}
          data={roles}
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
            to="/app/roles/create"
            sx={{ marginBottom: 4 }}
          >
            Create rol
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};
