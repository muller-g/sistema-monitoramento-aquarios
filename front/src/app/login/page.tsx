'use client';
import { TextField } from "@mui/material";
import styles from "./page.module.css";
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/hooks/useApi"; 

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    document.querySelector<any>('header').style.display = 'none';
  }, [router])

  async function login(){
    setLoading(true)
    await post('/login', {
      email: user,
      password: pass
    }).then((res: any) => {
      localStorage.setItem('user', JSON.stringify(res.user))
      localStorage.setItem('token', res.token)
      window.location.href = '/'
      setLoading(false)
    }).catch((res: any) => {
      setLoading(false)
      alert("Erro de login")
    })
  }

  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <TextField id="username" fullWidth onChange={(e) => setUser(e.target.value)} label="E-mail" variant="outlined" />
        <TextField id="password" type="password" fullWidth onChange={(e) => setPass(e.target.value)} label="Senha" variant="outlined" />
        <LoadingButton loading={loading} fullWidth variant="contained" onClick={login}>Entrar</LoadingButton>
      </div>
    </div>
  );
}
