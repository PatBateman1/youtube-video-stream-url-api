const express = require('express'),
      qs      = require('querystring');
      request = require('request'),
      app     = express(),
      port    = process.env.PORT || 3000;

      
const get_url = function (id, res) {
    const url_front = 'http://youtube.com/get_video_info?video_id=';
    let url = url_front + id;
    request(url, function(err, res1, content) {
        let response = {'err': 'video stream url not found'};
        if (!err && res.statusCode == 200) {
            content = qs.parse(content);
            let json = JSON.parse(content.player_response).streamingData;
            if (json != undefined) {
                let array = json.formats;
                if (array.length > 0) {
                    response = {'url': array[0]['url']}
                }
            }
        }
        res.send(response);
    });

}


const main = function() {


    app.get('/api/:id', function(req, res) {
        let id = req.params.id;
        get_url(id, res);
    });


    app.listen(port, function() {
        console.log("successfully listen")
    });
};

main();