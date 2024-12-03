import { Request, Response } from 'express';
import Device from '../../../entity/Device';
import logger from '../../../service/WinstonLogger';
import app from '../../server';
import DeviceService from '../service/DeviceService';
import multer from 'multer';
import path from 'path';
import EnsureUserToken from '../middleware/EnsureUserToken';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../../public/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, `file-${uniqueSuffix}${extension}`);
    }
});
  
const upload = multer({ storage: storage });

export default class DeviceController {
    constructor() {
        this.initializeRoutes();
    } 

    private initializeRoutes() {
        logger.info("Devices routes start");
        
        app.post("/api/devices", upload.single('image_file'), EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                const { name, specie } = req.body;

                const device: Device = await Device.createDevice(
                    name,
                    specie
                ); 

                const createdDevice: any = await DeviceService.create(device);

                if (req.file) {
                    await DeviceService.uploadImage(req.file, createdDevice.id)
                }
                
                return res.status(200).json(createdDevice);
            } catch(e){
                return res.status(500).json("Error");
            }
        });

        app.get("/api/devices", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                let params: any = req.query;
                let filterParams: any = { 
                    where: {},
                    include: {
                        Device_Image: true,
                        Device_Log: {
                            orderBy: {
                              created_at: 'desc',
                            },
                            take: 1,
                          },
                    },
                    take: 25,
                    skip: 0
                };

                if(params.page) {
                    filterParams.skip = parseInt(params.page) 
                }

                if(params.name) {
                    filterParams.where.name = {
                        contains: params.name,
                        mode: 'insensitive'
                    };
                }
                
                if(params.specie) {
                    filterParams.where.specie = {
                        contains: params.specie,
                        mode: 'insensitive'
                    };
                }            

                return res.status(200).json(await DeviceService.get(filterParams));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });

        app.get("/api/devices/log/:id", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                let page: number = parseInt(req.query.page as string) || 1;
                let params: any = req.query;
                const device_id: string = req.params.id;

                let filterParams: any = { 
                    where: {
                        device_id: device_id
                    },
                    take: 9,
                    skip: (page - 1) * 9
                };

                if(params.page) {
                    filterParams.skip = parseInt(params.page) 
                }

                if(params.ammonia) {
                    filterParams.where.ammonia = {
                        contains: params.ammonia,
                        mode: 'insensitive'
                    };
                }
                
                if(params.temperature) {
                    filterParams.where.temperature = {
                        contains: params.temperature,
                        mode: 'insensitive'
                    };
                }
                
                if(params.nitrite) {
                    filterParams.where.nitrite = {
                        contains: params.nitrite,
                        mode: 'insensitive'
                    };
                }

                if(params.ph) {
                    filterParams.where.ph = {
                        contains: params.ph,
                        mode: 'insensitive'
                    };
                }

                if(params.alkalinity) {
                    filterParams.where.alkalinity = {
                        contains: params.alkalinity,
                        mode: 'insensitive'
                    };
                }

                if(params.transparency) {
                    filterParams.where.transparency = {
                        contains: params.transparency,
                        mode: 'insensitive'
                    };
                }

                if(params.oxygen) {
                    filterParams.where.oxygen = {
                        contains: params.oxygen,
                        mode: 'insensitive'
                    };
                }

                if (params.dateTimeCreated) {
                    let startOfDay;
                    let endOfDay;
                    let dateTimeFinish;
                
                    const dateTimeCreated = new Date(Number(params.dateTimeCreated));
                
                    startOfDay = new Date(Date.UTC(
                        dateTimeCreated.getUTCFullYear(),
                        dateTimeCreated.getUTCMonth(),
                        dateTimeCreated.getUTCDate(),
                        0, 0, 0, 0
                    ));
                
                    endOfDay = new Date(Date.UTC(
                        dateTimeCreated.getUTCFullYear(),
                        dateTimeCreated.getUTCMonth(),
                        dateTimeCreated.getUTCDate(),
                        23, 59, 59, 999
                    ));
                
                    if (params.dateTimeFinish) {
                        dateTimeFinish = new Date(Number(params.dateTimeFinish));
                        endOfDay = new Date(Date.UTC(
                            dateTimeFinish.getUTCFullYear(),
                            dateTimeFinish.getUTCMonth(),
                            dateTimeFinish.getUTCDate(),
                            23, 59, 59, 999
                        ));
                    }

                    filterParams.where.created_at = {
                        gte: startOfDay.toISOString(),
                        lt: endOfDay.toISOString()
                    };
                }

                return res.status(200).json(await DeviceService.getLog(filterParams));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });

        app.get("/api/devices/:id", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                const device_id: string = req.params.id;
                return res.status(200).json(await DeviceService.getById(device_id));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });

        app.post("/api/devices/log/:id", /* EnsureUserToken.validate, */ async (req: Request, res: Response) => {
            try {
                const device_id: string = req.params.id;
                const { ammonia, nitrite, ph, temperature, alkalinity, transparency, oxygen } = req.body;

                const deviceLog: any = {
                    ammonia: ammonia,
                    nitrite: nitrite,
                    ph: ph,
                    temperature: temperature,
                    alkalinity: alkalinity,
                    transparency: transparency,
                    oxygen: oxygen,
                }
                
                return res.status(200).json(await DeviceService.createLog(device_id, deviceLog));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });

        app.delete("/api/devices/:id", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                const device_id: string = req.params.id;
                return res.status(200).json(await DeviceService.delete(device_id));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });

        app.put("/api/devices/:id", upload.single('image_file'), EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                const device_id: string = req.params.id;
                const { name, specie } = req.body;
                let deviceUpdate: any = {};

                if(name) deviceUpdate.name = name
                if(specie) deviceUpdate.specie = specie

                if (req.file) {
                    await DeviceService.uploadImage(req.file, device_id)
                }

                return res.status(200).json(await DeviceService.update(deviceUpdate, device_id));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });
    }
}
