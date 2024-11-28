export default class Device {
    id?: string;

    private constructor(
        id: string | undefined,
        readonly name: string,
        readonly specie: string
    ) {
        this.id = id;
    }

    static async createDevice(
        name: string,
        specie: string,
        id?: string
    ): Promise<Device> {

        return new Device(id,
            name,
            specie
        );
    }
}