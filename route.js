

var config = require('../config.json');
var client = require('..AsyncRestClient.js');
var queryParam=new hashMap();

module.exports = {
    planetresidents: function (req, res, next) {
        trycatch(
            function() {

if(req.query.searchKey!==undefined){
                    queryParam.set("searchKey", people/1/);
                }

                if (queryParam !== null) {
                            queryParam.forEach(function (value, key) {
                                client.addQueryParameter(key, value);
                            });
                        }
                        var serviceURL = config.API_SERVER_PORT +config.API_SERVER_PLANETRES;
                        
                        client.setUrl(serviceURL);
                        client.setMethod(config.POST_METHOD_TYPE);
                        client.addHeaderParameter("Accept", "application/json");
                        client.addHeaderParameter("Content-Type", "application/json");
                        client.execute(function(error, Response){
if(Response.statusCode===200){
    //write the logic to display as per our wish or send it to the angular /any front end page to display it

}

else{
    
//display the error came from web service
}
res.send(Response);
res.end();
                        }

                       
    };