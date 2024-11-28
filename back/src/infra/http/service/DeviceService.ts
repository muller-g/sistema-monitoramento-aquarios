import Device from "src/entity/Device";
import { prisma } from "../../database/client";

export default class DeviceService {
    static async create(device: Device | any){
        try {
            return await prisma.device.create({
                data: device
            });
        } catch (e: any){
            return e.message;
        }
    }

    static async createLog(device_id: string, deviceLog: any){
        try {
            return await prisma.device_Log.create({
                data: {
                    device_id: device_id,
                    ammonia: deviceLog.ammonia,
                    nitrite: deviceLog.nitrite,
                    ph: deviceLog.ph,
                    temperature: deviceLog.temperature
                }
            });
        } catch (e: any){
            return e.message;
        }
    }

    static async uploadImage(imageData: any, device_id: string | undefined){
        try {
            return await prisma.device_Image.create({
                data: {
                    filename: imageData.filename,
                    mimetype: imageData.mimetype,
                    originalname: imageData.originalname,
                    path: imageData.path,
                    device_id: device_id
                }
            });
        } catch (e: any){
            return e.message;
        }
    }

    static async update(device: Device | any, device_id: string){
        try {
            const deviceUpdated: Device | any = await prisma.device.update({
                where: {
                    id: device_id
                },
                data: device
            });

            return deviceUpdated
        } catch (e: any){
            return e.message;
        }
    }

    static async get(filter?: any){
        try {
            return await prisma.device.findMany(filter);
        } catch (e: any){
            return e.message;
        }
    }

    static async getLog(filter?: any){
        try {
            let totalItems = await prisma.device_Log.count({
                where: {
                    device_id: filter.device_id
                }
            });

            let obj = {
                total: totalItems,
                data: await prisma.device_Log.findMany(filter)
            }

            return obj;
        } catch (e: any){
            return e.message;
        }
    }

    static async getById(id: string){
        try {
            const device: Device | any = await prisma.device.findUnique({
                where: {
                    id: id
                },
                include: {
                    Device_Log: {
                        orderBy: {
                            created_at: 'desc'
                        }
                    },
                    Device_Image: true
                }
            });

            if(!device){
                throw new Error('Dispositivo não existe');
            }

            return device
        } catch (e: any){
            return e.message;
        }
    }

    static async delete(id: string){
        try {
            await prisma.device.delete({
                where: {
                    id: id
                }
            });

            return "Success"
        } catch (e: any){
            return e.message;
        }
    }
}