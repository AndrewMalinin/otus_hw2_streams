const fs = require('fs');

function writeArrayToFile(arr, fileName) {
   return new Promise((res, rej)=>{
      const startTime = +new Date();
      const ws = fs.createWriteStream(fileName);
      
      ws.on("error", function (err) {
         rej(err.message)
      });

      ws.on("close", function () {
        res({
         timeSpent_ms: +new Date() - startTime
        });
      });
      
      ws.write('[' + arr.join(', ') + ']',()=>{
         ws.end();
      })
   })
   
}


module.exports = {
   writeArrayToFile,
};
