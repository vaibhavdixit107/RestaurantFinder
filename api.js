 var auth = {
				//
				// Update with your auth tokens.
				//
				consumerKey : "6bYY1U8dhgFt17noBW5NXQ",
				consumerSecret : "LXEV5iVj-Azb12ub7G8kaFWpK5Q",
				accessToken : "tX6UzxaDaewFyriSB902mFFs4EDUF6Lx",
				// This example is a proof of concept, for how to use the Yelp v2 API with javascript.
				// You wouldn't actually want to expose your access token secret like this in a real application.
				accessTokenSecret : "YpjvnyGiU5JRb6RaPrl0LmmVTjg",
				serviceProvider : {
					signatureMethod : "HMAC-SHA1"
				}
			};
			var terms = 'restaurants';
			var near = 'copenhagen';
			var category = 'indpak';
			var radius = 20000;
			var accessor = {
				consumerSecret : auth.consumerSecret,
				tokenSecret : auth.accessTokenSecret
			};
			parameters = [];
			parameters.push(['term', terms]);
			parameters.push(['location', near]);
			parameters.push(['radius_filter',radius]);
			parameters.push(['category_filter',category]);
			parameters.push(['callback', 'cb']);
			parameters.push(['limit',3]);
			parameters.push(['oauth_consumer_key', auth.consumerKey]);
			parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
			parameters.push(['oauth_token', auth.accessToken]);
			parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
			var message = {
				'action' : 'http://api.yelp.com/v2/search',
				'method' : 'GET',
				'parameters' : parameters
			};
			OAuth.setTimestampAndNonce(message);
			OAuth.SignatureMethod.sign(message, accessor);
			var parameterMap = OAuth.getParameterMap(message.parameters);
			parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
			console.log(parameterMap);
			
			$.ajax({
				'url' : message.action,
				'data' : parameterMap,
				'cache' : true,
				'dataType' : 'jsonp',
				'jsonpCallback' : 'cb',
				'success' : function(data, textStats, XMLHttpRequest) {
			
						$.each(data.businesses, function(key, val){
								var output='<div data-role="collapsible" id="set">';
			
									output += '<h1>' + val.name +'</h1>';	
									output += '<img src="' + val.image_url + '" alt="' + val.id + '">';
									output += '<p>' + val.display_phone + '</p>';
									var addres=val.location.display_address;
									output += "<a href='https://www.google.dk/maps/dir//"+addres+"' class='ui-btn' data-theme='a'>" + addres + "</a>";
									output += '</div>';
							     $( "#set" ).append(output);
							 });
			
							 $("#set").trigger('create');
								 
						}
					});
				
			
					
