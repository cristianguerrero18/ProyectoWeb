import app from "./app.js"

const PORT = process.env.PORT || 4000;

const main = () => {
    app.listen(PORT, () => {
        console.log(`El servidor corre en el puerto ${PORT}`);
    });
}

main();