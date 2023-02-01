const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = querystring.parse(body);
      const name = data.name;
      const email = data.email;

      fs.appendFile('data.csv', `${name},${email}\n`, err => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text-html'});
        res.end('Form data successfully written to CSV file.');
      });
    });
  } else {
    res.end(`
      <!doctype html>
      <html>
        <body>
          <form action="/" method="post">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name"><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br><br>
            <input type="submit" value="Submit">
          </form>
        </body>
      </html>
    `);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
