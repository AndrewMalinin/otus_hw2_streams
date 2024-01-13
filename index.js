const fs = require('fs');
const { getFilePath } = require("./utils/getFilePath");
const { parseFileReadStream } = require('./utils/parseFileReadStream');
const { writeArrayToFile } = require('./utils/writeArrayToFile');

const RESULT_FILE_NAME = 'result.txt'

const filePath = getFilePath();
if (!filePath) {
   console.log('Файл не найден');
   return;
}

const rs = fs.createReadStream(filePath);

console.log('> Анализ файла...')
parseFileReadStream(rs)
.then((resultObj)=>{
   console.log('> Анализ завершён!')
   console.log('> Файл обработан за ' + (resultObj.timeSpent_ms.toLocaleString()) + ' мс')
   console.log('> Всего слов обработано: ' + resultObj.wordsCount.toLocaleString())
   console.log('> Уникальных слов найдено: ' + resultObj.result.length.toLocaleString())
   return resultObj.result;
})
.then((resArr)=>{
   console.log('\n> Запись результата в файл ' + RESULT_FILE_NAME)
   writeArrayToFile(resArr, RESULT_FILE_NAME)
   .then((resultObj)=>{
      console.log('> Файл успешно записан!')
      console.log('> Запись заняла: '+ (resultObj.timeSpent_ms.toLocaleString()) + ' мс')
   })
   .catch((errorMsg)=>{
      console.log('> Запись файла завершилась с ошибкой:\t'+ errorMsg)
   })
})
.catch((errorMsg)=>{
   console.log('> Анализ завершился с ошибкой:\t'+ errorMsg)
})