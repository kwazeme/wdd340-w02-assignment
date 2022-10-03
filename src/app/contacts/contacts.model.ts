export class Contact {
    public id: number;
    public name: string;
    public phone: string;
    public imageUrl: string;
    public email: string;

    constructor(id: number, name: string, phone: string, imageUrl: string, email: string) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.email = email;
    }
}