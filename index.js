'use strict';
const http = require('http')
const fs = require('fs')
const { stdout } = require('process');

function seturl(name, url, extension) {
  let data = fs.readFileSync('paths.json');
  let jdata = JSON.parse(data);
  if (jdata[name] == undefined){
    jdata[name] = "https://www."+url+ "." + extension; 
    fs.writeFileSync('paths.json', JSON.stringify(jdata))
    return "https://www." + url+ "." + extension;
  } else{
    return "https://en.wikipedia.org/wiki/HTTP_404"
  }
}
function getURL(name) {
    let data = fs.readFileSync('paths.json');
    let jdata = JSON.parse(data);
    if(jdata[name] != undefined){
      return(jdata[name]);
    }
}
const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  switch (req.url.slice(0, 8)) {
    case "/geturl/":
      res.writeHead(302, {'Location': getURL(req.url.slice(8))});
      res.end();
      break;
    case "/seturl/":
      let paramets = req.url.slice(8).split(":");
      if (paramets.length != 3){
        res.writeHead(302, {'Location': "https://en.wikipedia.org/wiki/HTTP_404"});
        res.end();
      } else{
        res.writeHead(302, {'Location' : seturl(paramets[0], paramets[1] , paramets[2])});
      }
    default:
      res.end(req.url);
      break;
  }
  res.end(req.url);
})
server.listen(port, () => {
  console.log(`Server running at port ${port}`)
  console.log("cheeky consolelog to get 50 lines lmao")
})