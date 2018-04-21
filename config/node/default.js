import path from "path";

export default {
    session: {
        secret: "__LD_MICROLD",
        key: "sid"
    },
    db: {
        redis: {
            host: "",
            port: "",
            family: "",
            password: "",
            db: ""
        },
        mysql: {
            host: "",
            port: "",
            family: "",
            password: "",
            db: ""
        }
    },
    upload: {
        path: path.join(__dirname, "public/upload/"),
        url: "/public/upload/"
    }
};
