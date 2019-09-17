module.exports = {
    publicPath: "./",//设置文件路径,默认'/'，部署应用包时的基本 URL
    "devServer": {
        "hot": true,
        "host": "0.0.0.0",
        "port": "3000",
        "disableHostCheck": process.env.NODE_ENV === "production" ? false : true,
    }
}