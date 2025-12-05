import app from "./app.js"

const main = () => {
    app.listen(app.get("PORT"));
    console.log(`el servidor corre en el puerto ${app.get("PORT")}`);
}

main();