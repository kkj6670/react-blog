import * as fs from 'fs';

const BOARD_JSON_DIR = './public/data/boardData.json';
const BOARD_MD_DIR = './public/data/board/';

const boardData = {};

const folders = fs.readdirSync(BOARD_MD_DIR).map((folder) => folder);
folders.forEach((name) => {
  const dir = `${BOARD_MD_DIR}${name}/`;
  const files = fs.readdirSync(dir).map((fileName) => {
    const fileDir = `${dir}${fileName}`;

    const md = fs.readFileSync(fileDir, 'utf8');
    const info = md.match(/(BOARD_)(.*)(:\s)(.*)/g);
    const [ title, date, tag ] = info.map(item => item.replace(/(BOARD_)(.*)(:\s)/,''));

    return {
      fileName,
      title,
      date,
      tag: JSON.parse(tag),
    };
  });

  if (files.length > 0) {
    files.sort((a, b) => b.date - a.date);
    boardData[name] = files;
  }
});

fs.open(BOARD_JSON_DIR, 'w', function (err, fd) {
  if (err) throw err;
  console.log('1. file open');

  let buf = new Buffer(JSON.stringify(boardData));
  fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
    if (err) throw err;

    console.log('2. file write');
    fs.close(fd, function (err) {
      if (err) throw err;

      console.log('3. file closed');
    });
  });
});
