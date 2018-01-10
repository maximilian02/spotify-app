const express     = require('express');
const app         = express();
const router      = express.Router();
const bodyParser  = require('body-parser');
const request     = require('request');
const port        = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-access-token');
    next();
});

// Pre flight method not needed right now.
// Just skip it and return a 200 status
router.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

router.post('/auth', (req, res) => {
    var client_id = '5d9f45b73cb1475699de53960af3a72d';
    var client_secret = '30b052e72e45442aa8b9bef6451b1516';

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) 
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.json({ success: true, message: 'Enjoy your token!', token: body.access_token });
        }
    });
});

app.use(router);

app.listen(port, () => {
    console.log(`Spotify auth token request app working on: ${port}`);
});