'use client';
import Container from "@/components/container/container";
import DeviceModal from "@/components/modal/deviceModal/device";
import useAuth from "@/hooks/useAuth";
import DeleteIcon from '@mui/icons-material/Delete';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { del, get } from "../../hooks/useApi";
import styles from "./page.module.css";

export default function Devices() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) return null;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({id: '', open: false});
  const [update, setUpdate] = useState<any>();
  const [devices, setDevices] = useState([]);
  
  const [name, setName] = useState('');
  const [specie, setSpecie] = useState('');
  
  const handleClose = () => setOpen({id: '', open: false});

  useEffect(() => {
    const getDevices = async () => {
      setDevices(await get('/devices'));
    }

    getDevices()
  }, [update])

  async function deleteDevice(id: string){
    await del('/devices/' + id).then((res: any) => setUpdate(Math.random()))
  }

  async function filter() {
    let url: string = '';

    if(name) url += '&name=' + name
    if(specie) url += '&specie=' + specie

    setDevices(await get('/devices?' + url))
  }

  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.main_content}>
          <div className={styles.wrap_content}>
            <div className={styles.filter}>
              <TextField id="outlined-basic" onChange={(e) => setName(e.target.value)} fullWidth label="Nome" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setSpecie(e.target.value)} fullWidth label="Espécie" variant="outlined" />
            </div>
            <LoadingButton style={{backgroundColor: "var(--green)"}} loading={loading} onClick={filter} variant="contained">Filtrar</LoadingButton>
            <LoadingButton style={{whiteSpace: 'nowrap', backgroundColor: "var(--green)"}} onClick={() => setOpen({id: '', open: true})} variant="contained"><MobileFriendlyIcon/></LoadingButton>
          </div>
          <div className={styles.table_content}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {
                devices?.map((dev: any, i: number) => (
                  <div className={styles.item} key={i}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar style={{cursor: 'pointer'}} onClick={() => router.push('/dispositivos/' + dev?.id)}>
                        <Avatar alt="Remy Sharp" sx={{ width: 45, height: 45 }} src={process.env.NEXT_PUBLIC_API_URL_BASE + dev?.Device_Image?.filename} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={dev?.name}
                        secondary={
                          <div className={styles.list_item}>
                            <div>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Espécie
                              </Typography>
                              { " - " + dev?.specie + " - " }
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Data/Hora
                              </Typography>
                              { " - " + dev?.created_at.slice(0,10).split("-").reverse().join("/") + " - " }
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Amônia
                              </Typography>
                              { dev?.Device_Log[0]?.ammonia ? " - " + dev?.Device_Log[0]?.ammonia + " - " : " - " }
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Temperatura
                              </Typography>
                              { dev?.Device_Log[0]?.temperature ? " - " + dev?.Device_Log[0]?.temperature + " - " : " - " }
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Nitrito
                              </Typography>
                              { dev?.Device_Log[0]?.nitrite ? " - " + dev?.Device_Log[0]?.nitrite + " - " : " - " }
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                PH
                              </Typography>
                              { dev?.Device_Log[0]?.ph ? " - " + dev?.Device_Log[0]?.ph + " - " : " - " }
                            </div>
                            <div>
                              <ModeEditIcon onClick={() => setOpen({id: dev?.id, open: true})} style={{color: "green", cursor: "pointer"}}/>
                              <DeleteIcon onClick={() => deleteDevice(dev?.id)} style={{color: "red", cursor: "pointer"}}/>
                            </div>
                          </div>
                        }
                      />
                      </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))
              }
            </List>
          </div>
        </div>
      </Container>
      <DeviceModal open={open} handleClose={handleClose} setUpdate={setUpdate}/>
    </main>
  );
}
