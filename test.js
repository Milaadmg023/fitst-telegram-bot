const fs = require("fs");
const request = require("request");

const getMusic = async () => {
  const response = await fetch(
    `https://saavn.dev/search/songs?query=in+the+end`
  );
  const data = await response.json();
  const url = data.data.results[0].downloadUrl[0].link;
  const filePath = `${data.data.results[0].name}.mp3`;
  request(url, { encoding: "binary" })
    .pipe(fs.createWriteStream(filePath))
    .on("finish", async () => {
      console.log("download finished");
    });
};

getMusic()