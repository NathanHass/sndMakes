/*
 * Do your jorvascrompts here!
 */


$(function() {

	// dummy data
	var data = {"title":"Google's Nexus 6 is a giant phablet designed for Android Lollipop | The Verge", 
				"headline":"Google's Nexus 6 is a giant phablet designed for Android Lollipop",
				"description":"Google is today introducing the Nexus 6, the latest in its line of smartphones designed to show off the capabilities of new Android releases. This is the biggest Nexus phone that Google has...",
				"image": "http://cdn1.vox-cdn.com/uploads/chorus_image/image/41948964/N6-moreeverything-1600.0.0_cinema_1200.0.jpg",
				"fbHeadline":"Google's Nexus 6 is a giant phablet designed for Android Lollipop",
				"fbDescription":"Google is today introducing the Nexus 6, the latest in its line of smartphones designed to show off the capabilities of new Android releases. This is the biggest Nexus phone that Google has...",
				"fbImage":"http://cdn1.vox-cdn.com/uploads/chorus_image/image/41948964/N6-moreeverything-1600.0.0_cinema_1200.0.jpg",
				"twitterHeadline":"Google's Nexus 6 is a giant phablet designed for Android Lollipop",
				"twitterDescription":"Google is today introducing the Nexus 6, the latest in its line of smartphones designed to show off the capabilities of new Android releases. This is the biggest Nexus phone that Google has...",
				"twitterImage":"http://cdn1.vox-cdn.com/uploads/chorus_image/image/41948964/N6-moreeverything-1600.0.0_cinema_1200.0.jpg"};
	
	// set core metadata from data
	var title = data['title'], headline = data['headline'], description = data['description'], image = data['image'], domain, siteName;

	// set facebook and twitter metadata
	var fbHeadline = (fbHeadline === null) ? fbHeadline = title : fbHeadline = data['fbHeadline'];
	var fbDescription = (fbDescription === null) ? fbDescription = description : fbDescription = data['fbDescription'];
	var fbImage = (fbImage === null) ? fbImage = image : fbImage = data['fbImage'];
	var twitterHeadline = (twitterHeadline === null) ? twitterHeadline = headline : twitterHeadline = data['twitterHeadline'];
	var twitterDescription = (twitterDescription === null) ? twitterDescription = description : twitterDescription = data['twitterDescription'];
	var twitterImage = (twitterImage === null) ? twitterImage = image : twitterImage = data['twitterImage'];

	// additional metadata
	//, domain, googleHeadline, googleDescription, googleImage;

	$('.url-input-btn').click(function(e) {

		e.preventDefault();

		// parse domain
		domain = $('.url-input').val();
		if (domain != null) { 
			domain = domain.replace('http://','');
			if (domain.indexOf('/') > 0) { domain = domain.substring(0, domain.indexOf('/'))}
		}

		// parse site name
		if (title.indexOf('-') > 0 && title.length > title.indexOf('-')+3) { siteName = title.substring(title.indexOf('-')+2); }
		else if (title.indexOf('|') > 0 && title.length > title.indexOf('-')+3) { siteName = title.substring(title.indexOf('|')+2); }

		// set text fields
		$('#title').val(title), $('#headline').val(headline), $('#description').val(description), $('#fbHeadline').val(fbHeadline), $('#fbDescription').val(fbDescription), $('#fbImage').val(fbImage), $('#twitterHeadline').val(twitterHeadline), $('#twitterDescription').val(twitterDescription), $('#twitterImage').val(twitterImage);

		// update displays
		updateFacebook();
	
	});

	$('.fb-submit').click(function(e) {
		e.preventDefault();
		fbHeadline = $('#fbHeadline').val(), fbDescription = $('#fbDescription').val(), fbImage = $('#fbImage').val();
		updateFacebook();
	})

	function updateFacebook() {
		$('.facebook-desktop-img').attr('style', 'background-image: url('+fbImage+');');
		$('.facebook-desktop-title').html(fbHeadline);
		var fbDescriptionDisplay = fbDescription;
		if (fbDescription.length > 200) {fbDescriptionDisplay = fbDescription.substring(0, 196)+'...';}
		$('.facebook-desktop-desc').html(fbDescriptionDisplay);
		$('.facebook-desktop-domain').html(domain.toUpperCase());	
	}

});
