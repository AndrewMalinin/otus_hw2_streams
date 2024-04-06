function parseFileReadStream(rs) {
   return new Promise((res, rej)=>{
      const startTime = + new Date();
      const wordsMap = new Map();
      let wordsCounter = 0;
      let buffer = '';
      rs.on('data', function(chunk) {
         // разделяем на подстроки, разделенные пробельными символами
         const words = (buffer + chunk).toLowerCase().split(/\s+/gmi)
         buffer = words.pop();
      
         words.forEach((item)=>{
            //ищем только слово, включая слова с дефисами и апострофами
            const word = item.match(/[a-zA-Zа-яА-ЯёЁ]+[a-zA-Zа-яА-ЯёЁ\-\’\`]*[a-zA-Zа-яА-ЯёЁ]*/mi) || []
            if (!word.length) {
               return;
            }
            wordsMap.set(word[0], (wordsMap.get(word[0]) || 0) + 1);
            wordsCounter++;
         })
      });

      rs.on('error', function(error){
         rej(error.message);
      })

      rs.on('end', function() {
         res({
               timeSpent_ms: +new Date() - startTime,
               result: Array.from(wordsMap).sort().map((tuple)=>tuple[1]),
               wordsCount: wordsCounter,
            });
      });
   })
}

module.exports = {
   parseFileReadStream,
};
