import * as React from "react";
import "./miniStatement.css";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import LoginContext from "../Login/LoginContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function MiniStatement() {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const logincontext = useContext(LoginContext);
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  const columns = [
    { id: "_id", label: "Transaction Id", minWidth: 170 },
    { id: "transactionType", label: "Type", minWidth: 100 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 100,
      format: (value) => {
        return `₹${value} /-`;
      },
    },
    {
      id: "timestamp",
      label: "Timestamp",
      minWidth: 170,
      align: "right",
      format: (value) => {
        let dt = new Date(value);
        return `${dt
          .getDate()
          .toLocaleString("en-Us", { minimumIntegerDigits: 2 })}/${dt
          .getMonth()
          .toLocaleString("en-Us", {
            minimumIntegerDigits: 2,
          })}/${dt.getFullYear()} ${dt
          .getHours()
          .toLocaleString("en-Us", { minimumIntegerDigits: 2 })}:${dt
          .getMinutes()
          .toLocaleString("en-Us", { minimumIntegerDigits: 2 })}:${dt
          .getSeconds()
          .toLocaleString("en-Us", { minimumIntegerDigits: 2 })}`;
      },
    },
    {
      id: "sender",
      label: "Sender",
      minWidth: 170,
      format: (value) => {
        if (!value) {
          return "_";
        }
        if (value.AccountNumber == user.AccountNumber) {
          return "You";
        } else {
          return value.AccountHolderName;
        }
      },
    },
    {
      id: "receiver",
      label: "Receiver",
      minWidth: 170,
      format: (value) => {
        if (!value) {
          return "_";
        }
        if (value.AccountNumber == user.AccountNumber) {
          return "You";
        } else {
          return value.AccountHolderName;
        }
      },
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    if (!logincontext.user) {
      navigate("/login", { replace: true });
    } else {
      setUser(logincontext.user);
    }
    axios.get("/api/v1/miniStatement").then((res)=>{
      setRows(res.data.transactions);
    });
  }, []);
  return (
    <div className="mini-container" style={{ backgroundColor: "#fff" }}>
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        style={{ backgroundColor: "#fff",paddingTop:"3vmax" }}
      >
        <Typography variant="h3" component="div" id="miniheading" gutterBottom>
          <div className="mini-left">
            <Link to="/transaction">
              <button id="btn1" className="noPrint">Back</button>
            </Link>
          </div>
          <h1>MiniStatement</h1>
          <div className="mini-right">
            <button id="btn2" className="noPrint" onClick={window.print}>Print</button>
          </div>
        </Typography>
        <TableContainer sx={{ maxHeight: "100vh", minWidth: "300px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ background: "#00e6e6", color: "#fff" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      color: "#000",
                      fontWeight:"500",
                      background: "#00e6e6",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      style={{
                        color: "#000",
                        background:
                          row["sender"]["AccountNumber"] == user.AccountNumber
                            ? "#ff8080"
                            : "#5dc431",
                            
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ color: "#fff" }}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination className="noPrint"
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={rows.length}
          style={{ background: "#00e6e6", color: "#000" }}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
