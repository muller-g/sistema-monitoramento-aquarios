'use client';
import { post } from '@/hooks/useApi';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import styles from "./user.module.css";
import { useRouter } from 'next/navigation';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function UserModal({open, handleClose, setUpdate}: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [userClass, setUserClass] = useState('');
    const [course, setCourse] = useState('');
    const [permission, setPermission] = useState('adm');
    const [isPassEqual, setIsPassEqual] = useState<any>(null);
    const [isFieldsEmpty, setIsFieldsEmpty] = useState<any>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setPermission(event.target.value as string);
    };

    useEffect(() => {
        if(pass !== confirmPass){
            setIsPassEqual(false)
        } else {
            setIsPassEqual(null)
        }
    }, [pass, confirmPass])
    
    async function createUser(){
        if(!name || !email || !userClass || !pass || !course || !permission){
            setIsFieldsEmpty(false)
            return
        }

        setLoading(true)
        await post('/users', {
            name: name, 
            email: email, 
            user_class: userClass, 
            password: pass, 
            course: course, 
            role: permission
        });

        setLoading(false)
        setUpdate(Math.random())
        handleClose()
        router.push('/usuarios');
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className={styles.modal_content}>
            <Typography variant="h5" gutterBottom>Cadastrar usuário</Typography>
            <TextField id="name" fullWidth label="Nome" onChange={(e) => setName(e.target.value)} variant="outlined" />
            <TextField id="email" fullWidth label="E-mail" onChange={(e) => setEmail(e.target.value)} variant="outlined" />
            <TextField id="password" fullWidth type='password' onChange={(e) => setPass(e.target.value)} label="Senha" variant="outlined" />
            <TextField id="confirm_password" type='password' onChange={(e) => setConfirmPass(e.target.value)} fullWidth label="Confirmar senha" variant="outlined" />
            { isPassEqual === false ? <span style={{color: 'red'}}>As senhas não coincidem</span> : ''}
            <TextField id="class" fullWidth label="Turma" onChange={(e) => setUserClass(e.target.value)} variant="outlined" />
            <TextField id="course" fullWidth label="Curso" onChange={(e) => setCourse(e.target.value)} variant="outlined" />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={permission}
                label="Permissão"
                onChange={handleChange}
                >
                    <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                    <MenuItem value="USUARIO">Usuário</MenuItem>
                </Select>
            </FormControl>
            <div className={styles.wrapper}>
                <LoadingButton style={{backgroundColor: "var(--green)"}} loading={loading} variant="contained" onClick={createUser}>Cadastrar</LoadingButton>
                <Button onClick={handleClose} style={{ color: "#212121" }} variant="text">Cancelar</Button>
                { isFieldsEmpty === false ? <span style={{color: 'red'}}>Preencha todos os campos</span> : ''}
            </div>
            </Box>
        </Modal>
    );
}
