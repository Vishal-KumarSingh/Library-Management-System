import axios from 'axios';
import Cookies from 'js-cookie'
export default class Network {
    constructor() {
        this.url = "http://localhost/library-api/index.php";
        this.token = Cookies.get("token");

    }
    hit(action = "", data = "", handle = null) {
        if (Cookies.get("token") || action == "Login" || action == "Registration") {
            console.log({
                "token": Cookies.get("token"),
                "action": action,
                "data": data
            });
            axios.post(this.url,
                {
                    "token": Cookies.get("token"),
                    "action": action,
                    "data": data
                }
            ).then((response) => {
                console.log("Network Response: " + response["data"]["message"]);
                handle(response["data"]);
            });
        }

    }

}
