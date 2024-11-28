'use client';
import Container from "@/components/container/container";
import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { get, put } from '@/hooks/useApi';
import useAuth from "@/hooks/useAuth";

export default function User({ params }: { params: { id: string } }) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) return null;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [permission, setPermission] = useState('ADMINISTRADOR');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userClass, setUserClass] = useState('');
  const [course, setCourse] = useState('');
  const { id } = params;

  useEffect(() => {
    async function getUserData(){
      let user: any = await get(`/users/${id}`);

      setName(user.name)
      setEmail(user.email)
      setPermission(user.role)
      setUserClass(user.user_class)
      setCourse(user.course)
    }

    getUserData();
  }, [id])

  async function updateUser() {
    await put(`/users/${id}`, {
      name: name,  
      role: permission
    })
  }

  const handleChangeRole = (event: SelectChangeEvent) => {
    setPermission(event.target.value as string);
  };

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleChangeClass = (event: any) => {
    setUserClass(event.target.value);
  };
  
  const handleChangeCourse = (event: any) => {
    setCourse(event.target.value);
  };

  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.main_content}>
          <TextField id="outlined-basic" value={name} onChange={handleChangeName} fullWidth label="Nome" variant="outlined" />
          <TextField id="outlined-basic" value={email} fullWidth onChange={handleChangeEmail} label="Email" variant="outlined" disabled />
          <TextField id="outlined-basic" value={userClass} fullWidth onChange={handleChangeClass} label="Turma" variant="outlined" disabled />
          <TextField id="outlined-basic" value={course} fullWidth onChange={handleChangeCourse} label="Curso" variant="outlined" disabled />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={permission}
              label="Permissão"
              onChange={handleChangeRole}
            >
              <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
              <MenuItem value="USUARIO">Usuário</MenuItem>
            </Select>
          </FormControl>
          <div className={styles.hero_content}>
            <LoadingButton loading={loading} style={{whiteSpace: 'nowrap', backgroundColor: "var(--green)"}} onClick={updateUser} variant="contained">Salvar</LoadingButton>
            <Button variant="text" onClick={() => router.push('/usuarios')} style={{color: "rgb(33, 33, 33)"}}>Voltar</Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
