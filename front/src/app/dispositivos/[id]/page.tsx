'use client';
import Container from "@/components/container/container";
import ExportContent from "@/components/export/export";
import { get } from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Device({ params }: { params: { id: string } }) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) return null;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ammonia, setAmmonia] = useState('');
  const [temperature, setTemperature] = useState('');
  const [nitrite, setNitrite] = useState('');
  const [ph, setPh] = useState('');
  const [transparency, setTransparency] = useState('');
  const [alkalinity, setAlkalinity] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [dateTimeCreated, setDateTimeCreated] = useState(null);
  const [dateTimeFinish, setDateTimeFinish] = useState(null);
  const [deviceLog, setDeviceLog] = useState<any[]>([]);
  const [device, setDevice] = useState<any>();
  const [page, setPage] = useState<any>(0);
  const [totalPages, setTotalPages] = useState<any>(0);
  const [filterUrl, setFilterUrl] = useState<string>('');
  
  const { id } = params;

  useEffect(() => {
    async function getDeviceData(){
      let deviceInfo: any = await get(`/devices/${id}`);
      let log: any = await get(`/devices/log/${id}/?page=${page}`);

      setFilterUrl(`/devices-download/log/${id}/?page=${page}`)
      setDevice(deviceInfo)
      setDeviceLog(log.data)
      setTotalPages(log.total)
    }

    getDeviceData();
  }, [id])

  async function filter() {
    let url: string = '?page=' + page;

    if(ammonia) url += '&ammonia=' + ammonia
    if(temperature) url += '&temperature=' + temperature
    if(nitrite) url += '&nitrite=' + nitrite
    if(ph) url += '&ph=' + ph
    if(transparency) url += '&transparency=' + transparency
    if(alkalinity) url += '&alkalinity=' + alkalinity
    if(oxygen) url += '&oxygen=' + oxygen
    if(dateTimeCreated) url += '&dateTimeCreated=' + dateTimeCreated
    if(dateTimeFinish) url += '&dateTimeFinish=' + dateTimeFinish

    let log = await get(`/devices/log/${id}` + url)
    setFilterUrl(`/devices-download/log/${id}` + url)
    setDeviceLog(log.data)
    setTotalPages(log.total)
  }

  const handleChangePagination = async (page: any) => {
    let log: any = await get(`/devices/log/${id}/?page=` + page);
    setDeviceLog(log.data)
    setPage(page)
    setTotalPages(log.total)
  }

  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.main_content}>
          <div className={styles.wrap_content}>
            <div className={styles.filter}>
              <TextField id="outlined-basic" onChange={(e) => setAmmonia(e.target.value)} fullWidth label="Amônia" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setTemperature(e.target.value)} fullWidth label="Temperatura" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setNitrite(e.target.value)} fullWidth label="Nitrito" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setPh(e.target.value)} fullWidth label="PH" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setAlkalinity(e.target.value)} fullWidth label="Alcalinidade" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setTransparency(e.target.value)} fullWidth label="Transparência" variant="outlined" />
              <TextField id="outlined-basic" onChange={(e) => setOxygen(e.target.value)} fullWidth label="Oxigênio" variant="outlined" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Criado em"
                  value={dateTimeCreated}
                  onChange={(newValue: any) => setDateTimeCreated(newValue)}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Criado até"
                  value={dateTimeFinish}
                  onChange={(newValue: any) => setDateTimeFinish(newValue)}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
              </LocalizationProvider>
            </div>
            <LoadingButton style={{backgroundColor: "var(--green)"}} onClick={filter} loading={loading} variant="contained"><FilterAltIcon/></LoadingButton>
          </div>
          <Divider style={{marginBottom: '40px', marginTop: '20px'}}/>
          <div className={styles.hero_content}>
            <div className={styles.side_content}>
              <div className={styles.hero_image}>
                <img src={`${process.env.NEXT_PUBLIC_API_URL_BASE + device?.Device_Image?.filename}`} alt="" />
              </div>
              <Divider style={{marginBottom: '20px', marginTop: '20px'}}/>
              <div className={styles.hero_device_info}>
                <div className={styles.wrap}>
                  <h3>{device?.name}</h3>
                  <span>último registro</span>
                </div>
                <div className={styles.wrap}>
                  <h4>Data do registro: </h4>
                  <span>{device?.Device_Log[0]?.created_at.slice(0,10).split('-').reverse().join("/")} {device?.Device_Log[0]?.created_at.slice(11, 19)}</span>
                </div>
                <div className={styles.wrap}>
                  <h4>Amônia: </h4>
                  <span>{device?.Device_Log[0]?.ammonia}</span>
                </div>
                <div className={styles.wrap}>
                  <h4>PH: </h4>
                  <span>{device?.Device_Log[0]?.ph}</span>
                </div>
                <div className={styles.wrap}>
                  <h4>Temperatura: </h4>
                  <span>{device?.Device_Log[0]?.temperature}</span>
                </div>
                <div className={styles.wrap}>
                  <h4>Nitrito: </h4>
                  <span>{device?.Device_Log[0]?.nitrite}</span>
                </div>
                <div className={styles.wrap}>
                  <h4>Alcalinidade: </h4>
                  <span>{device?.Device_Log[0]?.alkalinity}</span>
                </div>
                <div className={styles.wrap}>
                  <h4>Transparência: </h4>
                  <span>{device?.Device_Log[0]?.transparency}</span>
                </div>
                <div className={styles.wrap}>
                  <h4>Oxigênio: </h4>
                  <span>{device?.Device_Log[0]?.oxygen}</span>
                </div>
              </div>
            </div>
            <Divider orientation="vertical"/>
            <div className={styles.wrapp_table}>
              <TableContainer>
                <ExportContent name={device?.name} specie={device?.specie} filter={filterUrl} id={id}/>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Amônia</TableCell>
                      <TableCell align="right">PH</TableCell>
                      <TableCell align="right">Temperatura</TableCell>
                      <TableCell align="right">Nitrito</TableCell>
                      <TableCell align="right">Alcalinidade</TableCell>
                      <TableCell align="right">Transparência</TableCell>
                      <TableCell align="right">Oxigênio</TableCell>
                      <TableCell align="right">Data / Hora</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      deviceLog.length > 0 ?
                        deviceLog?.map((row: any) => (
                          <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.ammonia}
                            </TableCell>
                            <TableCell align="right">{row.ph}</TableCell>
                            <TableCell align="right">{row.temperature}</TableCell>
                            <TableCell align="right">{row.nitrite}</TableCell>
                            <TableCell align="right">{row.alkalinity}</TableCell>
                            <TableCell align="right">{row.transparency}</TableCell>
                            <TableCell align="right">{row.oxygen}</TableCell>
                            <TableCell align="right">{row.created_at.slice(0,10).split('-').reverse().join("/")} {row.created_at.slice(11, 19)}</TableCell>
                          </TableRow>
                        ))
                      :
                      ''
                  }
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack spacing={2}>
                <Pagination 
                  count={deviceLog.length > 0 ? Math.ceil(totalPages / 9) : 0} 
                  page={page}
                  shape="rounded" 
                  onChange={(e, value) => handleChangePagination(value)}/>
              </Stack>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
