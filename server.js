const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());

let data = [];

app.use(express.static(`${__dirname}/client/build/`));
function sendHomepage(req, res) {
  res.sendFile(__dirname + '/client/public/index.html');
}

function getComments(req, res) {
  res.json(data);
}

function postComment(req, res) {
  data.push({
    id: req.body.id,
    username: req.body.username,
    comment: req.body.comment,
    time: req.body.time,
    replies: req.body.replies,
  });
}

function postReply(req, res) {
  data[req.body.postID].replies.push({
    id: req.body.id,
    username: req.body.username,
    reply: req.body.reply,
    time: req.body.time,
  });
}

app.get('/', sendHomepage);
app.get('/api/comments', getComments);
app.post('/api/comments', postComment);
app.post('/api/reply', postReply);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  // eslint-disable-line no-console
});
