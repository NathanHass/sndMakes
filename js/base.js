/*
 * Do your jorvascrompts here!
 */


$(function() {

	var title, headline, description, image, fbHeadline, fbDescription, fbImage, twitterHeadline, twitterDescription, twitterImage, siteURL, displayURL, domain, siteName;

	$('.url-input-btn').click(function(e) {

		e.preventDefault();
					
		siteURL = $('.url-input').val();

		$.ajax({
			url: '/?url='+siteURL,
			dataType: 'json',
			success: function(data) {
				if (data != null) {

					// set core metadata from data
					title = data['title'], headline = data['headline'], description = data['description'], image = data['image'];

					// set facebook and twitter metadata
					fbHeadline = (data['fbHeadline'] != null) ? fbHeadline = data['fbHeadline'] : fbHeadline = title;
					fbDescription = (data['fbDescription'] != null) ? fbDescription = data['fbDescription'] : fbDescription = description;
					fbImage = (data['fbImage'] != null) ? fbImage = data['fbImage'] : fbImage = image;
					twitterHeadline = (data['twitterHeadline'] != null) ? twitterHeadline = data['twitterHeadline'] : twitterHeadline = headline;
					twitterDescription = (data['twitterDescription'] != null) ? twitterDescription = data['twitterDescription'] : twitterDescription = description;
					twitterImage = (data['twitterImage'] != null) ? twitterImage = data['twitterImage'] : twitterImage = fbImage;
					if (twitterImage == null) {twitterImage = ''}
					
					// parse domain
					if (siteURL != null) { 
						displayURL = siteURL.replace('http://','');
						displayURL = displayURL.replace('www.','');
						domain = displayURL;
						if (domain.indexOf('/') > 0) { domain = domain.substring(0, domain.indexOf('/'))}
					}

					// parse site name
					if (title.indexOf('-') > 0 && title.length > title.indexOf('-')+3) { siteName = title.substring(title.indexOf('-')+2); }
					else if (title.indexOf('|') > 0 && title.length > title.indexOf('-')+3) { siteName = title.substring(title.indexOf('|')+2); }

					// set text fields
					$('#title').val(title), $('#headline').val(headline), $('#description').val(description), $('#fbHeadline').val(fbHeadline), $('#fbDescription').val(fbDescription), $('#fbImage').val(fbImage), $('#twitterHeadline').val(twitterHeadline), $('#twitterDescription').val(twitterDescription), $('#twitterImage').val(twitterImage);

					// update displays
					updateFacebook();
					updateTwitter();
				}
			}
		});	
	});

	$('.general-submit').click(function(e) {
		e.preventDefault();
		headline = $('#headline').val(), description = $('#description').val(), image = $('#image').val();
	})

	$('.fb-submit').click(function(e) {
		e.preventDefault();
		fbHeadline = $('#fbHeadline').val(), fbDescription = $('#fbDescription').val(), fbImage = $('#fbImage').val();
		updateFacebook();
	})

	$('.twitter-submit').click(function(e) {
		e.preventDefault();
		twitterHeadline = $('#twitterHeadline').val(), twitterDescription = $('#twitterDescription').val(), twitterImage = $('#twitterImage').val();
		updateTwitter();
	})	

	function updateFacebook() {
		$('.facebook-desktop-img').attr('style', 'background-image: url('+fbImage+');');
		$('.facebook-desktop-title').html(fbHeadline);
		var fbDescriptionDisplay = fbDescription;
		if (fbDescription.length > 200) {fbDescriptionDisplay = fbDescription.substring(0, 196)+'...';}
		$('.facebook-desktop-desc').html(fbDescriptionDisplay);
		$('.facebook-desktop-domain').html(domain.toUpperCase());	
	}

	function updateTwitter() {
		$('.twitter-desktop-title').html(twitterHeadline+' <a href="'+siteURL+'">'+displayURL.substring(0,27)+'...</a>');
		$('.twitter-desktop-img').attr('style', 'background-image: url('+twitterImage+');');
	}	

});
