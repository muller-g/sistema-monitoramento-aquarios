'use client';
import ActionButtons from "@/components/actionButtons/actionButtons";
import Container from "@/components/container/container";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import { useEffect } from "react";
import styles from "./page.module.css";
import useAuth from "@/hooks/useAuth"; 

export default function Home() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) return null;

  const btns = [
    {
      icon: <ImportantDevicesIcon/>,
      title: 'Dispositivos',
      link: '/dispositivos'
    },
    {
      icon: <GroupAddIcon/>,
      title: 'Usuários',
      link: '/usuarios'
    },
  ];

  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.main_grid}>
          {
            btns.map((btn: any, i: number) => (
              <ActionButtons title={btn.title} icon={btn.icon} link={btn.link} key={i}/>
            ))
          }
        </div>
      </Container>
    </main>
  );
}
