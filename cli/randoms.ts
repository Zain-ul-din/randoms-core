import      child_process, { ChildProcess }   from        'child_process';
import      CodeGenerator   from        '@randomsts/code-generator';
import      file_content    from        './file_content';
import      CONST           from        './constant';
import      fs              from        'fs';
import      CLI             from        './CLI';

class RandomsCLI extends CLI
{
    private production: boolean;

    public constructor (argument: string)
    {
        super (argument)
        this.production = false;
    }
    
    private runServer (): void
    {
        if (!this.production)
        {
            const _process = child_process.exec (`nodemon --exec "node ./randoms/server.js" -e js`);
            RandomsCLI.printLogs (_process);
            return;
        }
        const _process = child_process.exec (`node ./randoms/server.js`);
        RandomsCLI.printLogs (_process);
    }
    
    private createIndexFile (): void 
    {
        if (!fs.existsSync ("./randoms/"))
        fs.mkdirSync ("./randoms/", {recursive : true});
        fs.writeFileSync ('./randoms/server.js', file_content, "utf8");
    }
    
    private watchFiles (): void
    {
        const watch_process = child_process.exec (`tsc-watch --rootDir ./src --outDir randoms --onSuccess "randoms generate"`);
        RandomsCLI.printLogs (watch_process);
        const babel_process = child_process.exec ("babel randoms --out-dir randoms");
        RandomsCLI.printLogs (babel_process);
    }
    
    private generatorCode (): void  
    {
        const codeGenerator = new CodeGenerator ();
        codeGenerator.writeToFile ();
    }

    public override help(): void 
    {
        if (this.argument == '--help' || this.argument == '-h')
        {
            console.log (CONST.helper_text);
            process.exit ();
        }
    }
    
    public override emitController () 
    {
        this.help ();
        switch (this.argument)
        {
            case 'build':
                this.production = true;
                const build_process = child_process.exec (`tsc --rootDir ./src --outDir randoms --diagnostics`);
                RandomsCLI.printLogs (build_process);
                this.generatorCode ();
                this.createIndexFile ();
            break;
            case 'start':
                this.production = true;
                this.runServer ();
            break;
            case 'generate':
                this.createIndexFile ();
                this.generatorCode ();
            break;    
            case 'dev':
                this.runServer ();
            break;
            case 'watch':
                this.watchFiles ();
            break;
            default:
                this.help ();    
        }
    }
    
    private static printLogs (curr_process: ChildProcess)
    {
        curr_process.stdout?.on ("data", data => console.log (data));
        curr_process.stderr?.on ("data", err => console.log (err));
    }
}

new RandomsCLI (process.argv [2]).emitController ();


