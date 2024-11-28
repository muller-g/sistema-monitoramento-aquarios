'use client';
import { get, postForm, put, putForm } from '@/hooks/useApi';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from "./device.module.css";

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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function DeviceModal({open, handleClose, setUpdate}: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [device, setDevice] = useState<any>();
    const [specie, setSpecie] = useState('');
    const [img, setImg] = useState<any>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<any>(null);

    const handleFileChange = (event: any) => {
        setImg(event.target.files[0]);

        const reader: any = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    async function create(){
        setLoading(true)
        let formData: any = new FormData();
        formData.append('name', name)
        formData.append('image_file', img)
        formData.append('specie', specie)

        await postForm('/devices', formData).then(res => {
            setLoading(false) 
            setUpdate(Math.random())
            handleClose()
        }).catch(res => setLoading(false))
    }

    async function update(){
        setLoading(true)
        let formData: any = new FormData();

        if(name) formData.append('name', name)
        if(img) formData.append('image_file', img)
        if(specie) formData.append('specie', specie)
        
        await putForm('/devices/' + open.id, formData).then(res => {
            setLoading(false) 
            setUpdate(Math.random())
            handleClose()
        }).catch(res => setLoading(false))
    }

    useEffect(() => {
        if(open.id !== ''){
            const getDevices = async () => {
                let data: any = await get('/devices/' + open.id);
                setName(data.name)
                setSpecie(data.specie)
            }
          
            getDevices()
        } else {
            setName('')
            setSpecie('')
            setImg('')
        }
    }, [open])

    const handleChangeName = (e: any) => {
        setName(e.target.value)
    }

    const handleChangeSpecie = (e: any) => {
        setSpecie(e.target.value)
    }

    return (
        <Modal
            open={open.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className={styles.modal_content}>
            { open.id === '' ? <Typography variant="h5" gutterBottom>Cadastrar dispositivo</Typography> : <Typography variant="h5" gutterBottom>Atualizar dispositivo</Typography> }
            <TextField id="username" onChange={handleChangeName} value={name} fullWidth label="Nome do aquário" variant="outlined" />
            <TextField id="specie" onChange={handleChangeSpecie} value={specie} fullWidth label="Espécie" variant="outlined" />
            {
                img ?
                    <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                :
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    >
                    Upload file
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>
            }
            <div className={styles.wrapper}>
                {
                    open.id === '' ?
                        <LoadingButton style={{backgroundColor: "var(--green)"}} loading={loading} variant="contained" onClick={create}>Cadastrar</LoadingButton>
                    :
                        <LoadingButton style={{backgroundColor: "var(--green)"}} loading={loading} variant="contained" onClick={update}>Atualizar</LoadingButton>
                }
                <Button onClick={handleClose} style={{ color: "#212121" }} variant="text">Cancelar</Button>
            </div>
            </Box>
        </Modal>
    );
}
