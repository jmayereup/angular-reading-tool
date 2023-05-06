const fs = require('fs-extra');
    const concat = require('concat');
    
    build = async () =>{
        const files = [
            './dist/angular-reading-tool/runtime.js',
            './dist/angular-reading-tool/polyfills.js',
            // './dist/angular-reading-tool/es2015-polyfills.js',
            // './dist/angular-reading-tool/scripts.js',
            './dist/angular-reading-tool/main.js'
          ];
        
          await fs.ensureDir('./dist/widget');
          await concat(files, './dist/widget/reading-tool.js');
    }
    build();