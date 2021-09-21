export class Product{
    public id: number;
    public timestamp: Date;
    public name: string;
    public description: string;
    public code: string;
    public thumbnail: string;
    public price: number;

    constructor(
        id: number,
        timestamp: Date,
        name: string,
        description: string,
        code: string,
        thumbnail: string,
        price: number
    ) {
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price; 
    }
}