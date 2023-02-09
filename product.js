module.exports = class Product {
    constructor(name, description, price, pic) {
        this._name = name;
        this._description = description;
        this._price = price;
        this._pic = pic
    }

    getName(){
        return this._name;
    }

    getDescription() {
        return this._description;
    }

    getPrice() {
        return this._price;
    }

    getPic() {
        return this._pic;
    }

    setName(name){
        this._name = name;
    }

    setDescription(description){
        this._description = description;
    }

    setPrice(price) {
        this._price = price;
    }

    setPic(pic){
        this._pic = pic
    }
}