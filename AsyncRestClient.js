
/*
 * Rest Client Framework: This Class interacts with the web service  environment 
 * and responds back with the web service response. 
 * This class forms the request that needs to be sent to webservice.
 */





var requestClient = require('request');
var hashMap = require('hashmap');
var logger = require('./TMOLogger');

var headerMap = new hashMap();
var queryMap = new hashMap();
var bodyMap = new hashMap();
var serverURL = null;
var methodT = 'GET';


function execute(handleResponse) {
	
	var options = {};
	var url = serverURL;
	
	
	serverURL = "";

	// Query & Header parameters declaration
	var queryParameterStr = "", headerParameterStr = "", bodyStr = "";

	// Constructing the header parameter string
	if( headerMap.count() > 0 ) {
		headerMap.forEach(function(value, key) {
			headerParameterStr += "\"" + key +"\" : \"" + value + "\",";
		});

		headerParameterStr = headerParameterStr.substring( 0, headerParameterStr.length-1 );
	}
	
	// Clearing the header parameters
	headerMap.clear();

	// Constructing query parameters string
	if( queryMap.count() > 0 ) {
		queryParameterStr += "?";

        queryMap.forEach(function(value, key) {
			queryParameterStr += key +"="+ value + "&";
		});

		queryParameterStr = queryParameterStr.substring( 0, queryParameterStr.length-1 );
	}
	

	// Clearing the query map parameters
	queryMap.clear();

	// Constructing the request body parameters
    if( bodyMap.count() > 0 ) {
        bodyMap.forEach(function(value, key) {

            if(typeof value === 'object'){
                var bodyStr1 = "{";
				for(var objectKey in value){
					bodyStr1 += "\"" + objectKey + "\" : \"" + value[objectKey] + "\",";
				}
                /*value.forEach(function(value1, key1) {
                	bodyStr1 += "\"" + key1 + "\" : \"" + value1 + "\",";
                });*/
                bodyStr1 = bodyStr1.substring( 0, bodyStr1.length-1 );
                bodyStr1 += "},";
                bodyStr += "\"" + key + "\" : " + bodyStr1;
            } else {
                bodyStr += "\"" + key + "\" : \"" + value + "\",";
            }

        });
        bodyStr = bodyStr.substring( 0, bodyStr.length-1 );
    }
	

	// Clearing the request body parameters
	bodyMap.clear();

	url += queryParameterStr;

	options.headers = JSON.parse("{" + headerParameterStr + "}");
	options.url = url;
	if( bodyStr.length > 0){
		options.body = "{" + bodyStr  + "}";
	}
	options.method = methodT;

	//Time out introduced to enable autoscaling per perf recommendation
	options.timeout = 10000;

	// Making the request and send the error / response back
	requestClient(options, function(error, response, body){
		if(!error) {
			if (response !== undefined && response !== null){
				
				if(response.statusCode > 200) {
					try {
						var errorResponse = JSON.parse(response.body);
						
						if(options.body !== undefined) {
							trimmingBody(options.body);
						}
					}
					catch (error) {
						
						if(options.body !== undefined) {
							trimmingBody(options.body);
						}
					}
				}
			}else{
				
				if(options.body !== undefined) {
					trimmingBody(options.body);
				}
			}
		}
		else {
			
			if(options.body !== undefined) {
				trimmingBody(options.body);
			}
			response = {};
			response.statusCode = '209';
			response.body = {};
		}
		handleResponse(error, response);
	});
}

function trimmingBody(requestBody){
	var body = JSON.parse(requestBody);
	if(body !== undefined && body.ssn !== undefined){
		body.ssn = 'XXXX';
		
	}else if(body !== undefined && body.prepaid_pin !== undefined){
		body.prepaid_pin = 'XXXX';
		
	}else{
		//console statement or logger
	}
}


// Module methods to export as public
module.exports = {
	setUrl : function(url) {
		serverURL = url;
	},
	
	setMethod : function(method){
		methodT = method;
	},
	
	addQueryParameter : function( key, value ) {
	 	queryMap.set( key, value );
	},
	
	addHeaderParameter : function( key, value ) {
	 	headerMap.set( key, value );
	},
	
	setRequestBody : function( key, value ) {
		bodyMap.set( key, value );
	},
	
	execute : execute
};
