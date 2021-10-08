const Pusher = require('pusher');

let pusher = new Pusher({
    appId: '1279433',
    key: '80137af464a6ec652410',
    secret: 'c6b47c72cdeb37f6c9a4',
    cluster: 'ap1',
    useTLS: true
});


exports.pusherAuth = (req, res) => {
    console.log('auth')

    let socketId = req.body.socket_id;
    let channel = req.body.channel_name;
    let random_string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    let presenceData = {
        user_id: random_string,
        user_info: {
            username: '@' + random_string,
        }
    };
    let auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
}

exports.updateLocation = (req, res) => {
    console.log('wewew')
    // trigger a new location update event via pusher
    pusher.trigger('presence-channel', 'location-update', {
        'username': req.body.username,
        'location': req.body.location
    })
    res.json({ 'status': 200 });
}