"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const code_generator_1 = __importDefault(require("@randomsts/code-generator"));
const file_content_1 = __importDefault(require("./file_content"));
const constant_1 = __importDefault(require("./constant"));
const fs_1 = __importDefault(require("fs"));
const CLI_1 = __importDefault(require("./CLI"));
class RandomsCLI extends CLI_1.default {
    production;
    constructor(argument) {
        super(argument);
        this.production = false;
    }
    runServer() {
        if (!this.production) {
            const _process = child_process_1.default.exec(`nodemon --exec "node ./randoms/server.js" -e js`);
            RandomsCLI.printLogs(_process);
            return;
        }
        const _process = child_process_1.default.exec(`node ./randoms/server.js`);
        RandomsCLI.printLogs(_process);
    }
    createIndexFile() {
        if (!fs_1.default.existsSync("./randoms/"))
            fs_1.default.mkdirSync("./randoms/", { recursive: true });
        fs_1.default.writeFileSync('./randoms/server.js', file_content_1.default, "utf8");
    }
    watchFiles() {
        const watch_process = child_process_1.default.exec(`tsc-watch --rootDir ./src --outDir randoms --onSuccess "randoms generate"`);
        RandomsCLI.printLogs(watch_process);
        const babel_process = child_process_1.default.exec("babel randoms --out-dir randoms");
        RandomsCLI.printLogs(babel_process);
    }
    generatorCode() {
        const codeGenerator = new code_generator_1.default();
        codeGenerator.writeToFile();
    }
    help() {
        if (this.argument == '--help' || this.argument == '-h') {
            console.log(constant_1.default.helper_text);
            process.exit();
        }
    }
    emitController() {
        this.help();
        switch (this.argument) {
            case 'build':
                this.production = true;
                const build_process = child_process_1.default.exec(`tsc --rootDir ./src --outDir randoms --diagnostics`);
                RandomsCLI.printLogs(build_process);
                this.generatorCode();
                this.createIndexFile();
                break;
            case 'start':
                this.production = true;
                this.runServer();
                break;
            case 'generate':
                this.createIndexFile();
                this.generatorCode();
                break;
            case 'dev':
                this.runServer();
                break;
            case 'watch':
                this.watchFiles();
                break;
            default:
                this.help();
        }
    }
    static printLogs(curr_process) {
        curr_process.stdout?.on("data", data => console.log(data));
        curr_process.stderr?.on("data", err => console.log(err));
    }
}
new RandomsCLI(process.argv[2]).emitController();
