'use client';
import Container from "@/components/container/container";
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./header.module.css";

export default function Header() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function logout(){
        localStorage.clear()
        window.location.reload()
    }

    return (
    <header className={styles.header}>
        <Container>
            <div className={styles.header_content}>
                <a href="#" onClick={() => router.push('/')} className={styles.header_title}>Sistema de Monitoramento</a>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon color="action" style={{color: "#fff"}} fontSize="large"/>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => router.push(`/usuarios/${JSON.parse(localStorage.getItem('user')).id}`)}>Profile</MenuItem>
                    <MenuItem onClick={logout}>Sair</MenuItem>
                </Menu>
            </div>
        </Container>
    </header>
  );
}
