import { Button } from "@mui/material";
import styles from "./export.module.css";
import * as XLSX from 'xlsx';

interface Export {
    data: any,
    name: string,
    specie: string
}

export default function ExportContent({ data, name, specie }: Export) {
    async function convertData(data: any[]){
        let logSheet = [
            ['Nome do dispositivo', name, 'Espécie', specie],
            ['Log ID', 'Ammonia', 'pH', 'Temperature', 'Nitrite', 'Created At'],
        ];

        data.map((item:any) => logSheet.push([item.id, item.ammonia, item.ph, item.temperature, item.nitrite, item.created_at]));
        
        return logSheet;
    };

    async function handleExport(){  
        let arr = await convertData(data);

        const ws = XLSX.utils.aoa_to_sheet(arr);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, name);
    
        XLSX.writeFile(wb, 'Dispositivo - ' + name + '.xlsx');
    };

    return(
        <div className={styles.export_content}>
            <Button onClick={handleExport} variant="contained">Exportar</Button>
        </div>
    );
}