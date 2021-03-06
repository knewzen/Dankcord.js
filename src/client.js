const {HTTPClient} = require("./routes.js");
const {GatewayClient} = require("./gateway.js");
const {EventEmitter} = require("events");
const {Message} = require("./datatypes");

class Client extends EventEmitter {
    constructor(token, options){
        super();
        this.token = token;
        this.http = new HTTPClient(token);
        this.gateway = new GatewayClient(token, this);
        this.guilds = new Map();
        this.channels = new Map();
        this.options = options || {};
    }

    start() {
        this.gateway.start();
    }

    sendMessage(channelID, content) {
        return new Promise((resolve) => {
            this.http.sendReq("channels/"+channelID.toString()+"/messages", "post", {content: content}).then((res) => {
                resolve(new Message(res, this));
            });
        });
    }
}
exports.Client = Client;