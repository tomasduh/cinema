import ConfigServer from "./app";

class Server extends ConfigServer {

    _PORT:Number = this.app.get('PORT');

    listen(){
        this.app.listen(this._PORT, ()=>{
            console.log(`Server running to port ${this._PORT}`)
        })
    }
}

new Server().listen();