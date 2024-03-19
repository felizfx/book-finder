import server from "./src/app.js"
import chalk from "chalk";

const PORT = 3000

server.listen(3000, () => {
    console.log(chalk.blue(`[server] server listening on port ${PORT}`));
})