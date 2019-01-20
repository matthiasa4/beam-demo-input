var express = require('express'); 
var bodyParser = require('body-parser');
var path = require("path");
var Router = require("router");
var router = Router()
var app = express();

const PubSub = require('@google-cloud/pubsub');
const projectId = 'matthias-sandbox';
const pubsub = new PubSub();
const topicName = 'frontend-log';

app.use(express.static(path.join(__dirname, 'www')));

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World'))

router.route('/test')    
    .post(function(req, res) {
		console.log(req.headers.host);
		console.log(req.body);
		res.status(200).redirect('/');
		publishSentence(
			{
				'body': req.body,
				'host': req.headers['x-forwarded-for'] || req.connection.remoteAddress
			}
			);
	});

function publishSentence(data) {
	const dataBuffer = Buffer.from(JSON.stringify(data));    
	pubsub
	    .topic(topicName)
	    .publisher()
	    .publish(dataBuffer)
	    .then(messageId => {
	      console.log(`Message ${messageId} published.`);
	    })
	    .catch(err => {
	      console.error('ERROR:', err);
	    });
}
      
app.use('/api', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

