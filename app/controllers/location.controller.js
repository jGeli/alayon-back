require('dotenv').config()
const Pusher = require('pusher');
const axios = require('axios');
const { polylineDecode } = require('../utils/helpers');
let apiUrl = "https://maps.googleapis.com/maps/api/directions/json?mode=driving&origin=11.231740819531705,125.00249369526583&destination=11.20556360502487,125.00355796170336&key=AIzaSyDPrjF6BhygS3aEUmn58R9ZNLz_XBMRTG4"



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

exports.getCurrentLocation = (req, res) => {
    const { lat, lng } = req.params;
    console.log(process.env.map_key)
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.map_key}`)
    .then((response) => {
        let results = response.data ? response.data.results : [];
     return res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        return res.status(400).send(err)
    })
}


exports.getDestination = (req, res) => {
    axios.get(apiUrl)
  .then((response) => {
    console.log(response.data.routes[0].overview_polyline)
    let polsArr = [];
    let stps = response.data.routes[0].legs[0].steps

//   for (let i = 0; i < stps.length; i++) {
//        let rs = polylineDecode(stps[i].polyline.points);
//        rs.forEach(a => {
//             polsArr.push({ lat: a[0], lng: a[1] })
//        })
//   }


    let polId = response.data.routes[0].overview_polyline.points;
    // console.log(polId)
    let rs = polylineDecode(polId);
    // console.log(rs)


    // let rs = polylineDecode(stps[i].polyline.points);
    rs.forEach(a => {
         polsArr.push({ lat: a[0], lng: a[1] })
    })

    res.status(200).json({data: response.data, polyline: polsArr})
  })
  .catch(err => {
      console.log(err)
    res.status(400).send(err)
  })
}