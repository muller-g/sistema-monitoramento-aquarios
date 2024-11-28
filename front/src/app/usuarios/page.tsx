'use client';
import Container from "@/components/container/container";
import { LoadingButton } from "@mui/lab";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserModal from "@/components/modal/userModal/user";
import { del, get } from "../../hooks/useApi";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import useAuth from "@/hooks/useAuth";

export default function Users() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) return null;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState<any>();

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user_class, setUserClass] = useState('');
  const [course, setCourse] = useState('');
  const [role, setRole] = useState<any>('');

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await get('/users'));
    }

    getUsers()
  }, [update])

  async function deleteUser(id: string) {
    await del(`/users/${id}`)
    setUpdate(Math.random())
  }

  async function filter() {
    let url: string = '';

    if(name) url += '&name=' + name
    if(email) url += '&email=' + email
    if(user_class) url += '&class=' + user_class
    if(course) url += '&course=' + course
    if(role) url += '&role=' + role

    setUsers(await get('/users?' + url))
  }

  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.main_content}>
          <div className={styles.wrap_content}>
            <div className={styles.filter}>
              <TextField id="outlined-basic" onChange={(e) => setName(e.target.value)} fullWidth label="Nome" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setEmail(e.target.value)} fullWidth label="Email" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setUserClass(e.target.value)} fullWidth label="Turma" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setCourse(e.target.value)} fullWidth label="Curso" variant="outlined" />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Permissão"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                  <MenuItem value="USUARIO">Usuário</MenuItem>
                </Select>
              </FormControl>
            </div>
            <LoadingButton style={{backgroundColor: "var(--green)"}} loading={loading} onClick={filter} variant="contained">Filtrar</LoadingButton>
            <LoadingButton style={{backgroundColor: "var(--green)"}} loading={loading} onClick={() => setOpen(true)} variant="contained"><PersonAddIcon/></LoadingButton>
          </div>
          <div className={styles.table_content}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Turma</TableCell>
                    <TableCell align="right">Curso</TableCell>
                    <TableCell align="right">Permissão</TableCell>
                    <TableCell align="right">Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((row: any) => (
                    <TableRow
                      key={row.id}
                      className={styles.table_action}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.name}
                      </TableCell>
                      <TableCell align="right">{row?.email}</TableCell>
                      <TableCell align="right">{row?.user_class}</TableCell>
                      <TableCell align="right">{row?.course}</TableCell>
                      <TableCell align="right">{row?.role}</TableCell>
                      <TableCell align="right">
                        <div>
                          <ModeEditIcon onClick={() => router.push('/usuarios/' + row.id)} style={{color: "green"}}/>
                          <DeleteIcon onClick={() => deleteUser(row.id)} style={{color: "red"}}/>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
      <UserModal open={open} handleClose={handleClose} setUpdate={setUpdate} />
    </main>
  );
}
