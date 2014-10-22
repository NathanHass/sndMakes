/*
 * Do your jorvascrompts here!
 */


$(function() {

	var title, headline, description, image, fbHeadline, fbDescription, fbImage, twitterHeadline, twitterDescription, twitterImage, googleDescription, siteURL, displayURL, domain, siteName = '';

	$('.url-input-btn').click(function(e) {

		e.preventDefault();

		siteURL = $('.url-input').val();

		$.ajax({
			url: '/?url='+siteURL,
			dataType: 'json',
			success: function(data) {
				if (data != null) {

					title = null, headline = null, description = null, image = null, fbHeadline = null, fbDescription = null, fbImage = null, twitterHeadline = null, twitterDescription = null, twitterImage = null, googleDescription = null, displayURL = null, domain = null, siteName = '';

					// set core metadata from data
					title = data['title'], description = data['description'];
					headline = (data['headline'] != null) ? headline = data['headline'] : headline = title;

					// set facebook and twitter metadata
					fbHeadline = (data['fbHeadline'] != null) ? fbHeadline = data['fbHeadline'] : fbHeadline = title;
					fbDescription = (data['fbDescription'] != null) ? fbDescription = data['fbDescription'] : fbDescription = description;
					fbImage = (data['fbImage'] != null) ? fbImage = data['fbImage'] : fbImage = image;
					twitterHeadline = (data['twitterHeadline'] != null) ? twitterHeadline = data['twitterHeadline'] : twitterHeadline = headline;
					twitterDescription = (data['twitterDescription'] != null) ? twitterDescription = data['twitterDescription'] : twitterDescription = description;
					twitterImage = (data['twitterImage'] != null) ? twitterImage = data['twitterImage'] : twitterImage = fbImage;
					googleDescription = (data['eDescription'] != null) ? googleDescription = data['eDescription'] : googleDescription = description;
					if (googleDescription != null && googleDescription.length > 140) {googleDescription = googleDescription.substring(0, 140)+'...';}
					if (twitterImage == null) {twitterImage = ''; }
					if (fbHeadline == null) { fbHeadline = ''; }
					image = fbImage
					if (image == null) { image = ''; }

					// parse domain
					if (siteURL != null) {
						displayURL = siteURL.replace('http://','');
						displayURL = displayURL.replace('www.','');
						domain = displayURL;
						if (domain.indexOf('/') > 0) { domain = domain.substring(0, domain.indexOf('/'))}
					}

					// parse site name
					if (title.lastIndexOf('-') > 0 && title.length > title.lastIndexOf('-')+3) { siteName = title.substring(title.lastIndexOf('-')+2); }
					else if (title.lastIndexOf('|') > 0 && title.length > title.lastIndexOf('-')+3) { siteName = title.substring(title.lastIndexOf('|')+2); }

					// set text fields
					$('#title').val(title), $('#headline').val(headline), $('#description').val(description), $('#fbHeadline').val(fbHeadline), $('#fbDescription').val(fbDescription), $('#fbImage').val(fbImage), $('#twitterHeadline').val(twitterHeadline), $('#twitterDescription').val(twitterDescription), $('#twitterImage').val(twitterImage);

					// update displays
					updateFacebook();
					updateTwitter();
					updateGoogle();
				}
			}
		});
	});

	$('#title').keydown(function() {
		title = $(this).val();
		updateGoogle();
	});
	$('#headline').keydown(function() {
		headline = $(this).val();
		updateGoogle();
	});
	$('#description').keydown(function() {
		description = $(this).val();
		updateGoogle();
	});
	$('#fbHeadline').keydown(function() {
		fbHeadline = $(this).val();
		updateFacebook();
	});
	$('#fbDescription').keydown(function() {
		fbDescription = $(this).val();
		updateFacebook();
	});
	$('#twitterHeadline').keydown(function() {
		twitterHeadline = $(this).val();
		updateTwitter();
	});

	$('.fb-submit').click(function(e) {
		e.preventDefault();
		fbImage = $('#fbImage').val();
		updateFacebook();
	})

	$('.twitter-submit').click(function(e) {
		e.preventDefault();
		twitterImage = $('#twitterImage').val();
		updateTwitter();
	})

	function updateFacebook() {
		$('.facebook-desktop-title').html(fbHeadline);
		var fbHeadlineDisplay = fbHeadline;
		if (fbHeadlineDisplay != null && fbHeadlineDisplay.length > 80) {fbHeadlineDisplay = fbHeadlineDisplay.substring(0, 80)+'...';}
		$('.facebook-mobile-title').html(fbHeadlineDisplay);
		var fbDescriptionDisplay = fbDescription;
		if (fbDescriptionDisplay != null && fbDescription.length > 200) {fbDescriptionDisplay = fbDescription.substring(0, 196)+'...';}
		$('.facebook-desktop-desc').html(fbDescriptionDisplay);
		$('.facebook-desktop-domain').html(domain.toUpperCase());
		$('.facebook-mobile-name').html(domain.toLowerCase());
		if (fbImage != null && fbImage != '') {
			$('.facebook-desktop-img').attr('style', 'background-image: url('+fbImage+');');
			$('.facebook-mobile-img').attr('style', 'background-image: url('+fbImage+');');
		} else {
			$('.facebook-desktop-img').attr('style', 'height:0px;border:0px;');
			$('.facebook-mobile-img').attr('style', 'height:0px;border:0px;');
		}
	}

	function updateTwitter() {
		var twitterHeadlineDisplay = twitterHeadline;
		if (twitterHeadlineDisplay != null && twitterHeadlineDisplay.length > 113) {twitterHeadlineDisplay = twitterHeadlineDisplay.substring(0, 113);}
		$('.twitter-desktop-title').html(twitterHeadlineDisplay+' <a href="'+siteURL+'">'+displayURL.substring(0,27)+'...</a>');
		if (twitterHeadline != null && twitterHeadline.length > 140) {twitterHeadlineDisplay = twitterHeadline.substring(0, 140);} else { twitterHeadlineDisplay = twitterHeadline; }
		$('.twitter-mobile-card-title').html(twitterHeadlineDisplay);
		if (twitterImage != null && twitterImage != '') {
			$('.twitter-desktop-img').attr('style', 'background-image: url('+twitterImage+');');
			$('.twitter-mobile-card-img').attr('style', 'background-image: url('+twitterImage+');');
		} else {
			$('.twitter-desktop-img').attr('style', 'height:0px;border:0px;');
			$('.twitter-mobile-card-img').attr('style', 'height:0px;border:0px;');
		}
		var twitterDisplaySource = siteName.replace('.com','');
		$('.twitter-mobile-card-name').html(twitterDisplaySource);
		$('.twitter-mobile-card-source-name').html(twitterDisplaySource);
		$('.twitter-mobile-card-source-handle').html(' @'+twitterDisplaySource.replace(' ','').toLowerCase());
		var twitterDescriptionDisplay = twitterDescription;
		if (twitterDescriptionDisplay != null && twitterDescriptionDisplay.length > 200) {twitterDescriptionDisplay = twitterDescriptionDisplay.substring(0, 196)+'...';}
		$('.twitter-mobile-card-desc').html(twitterDescriptionDisplay);
	}

	function updateGoogle() {
		if (image != null && image != '') {
			$('.google-desktop-img').attr('style', 'background-image: url('+image+');');
			$('.google-mobile-img').attr('style', 'background-image: url('+image+');');
			$('.google-desktop-pair .art-bd').attr('style', 'display:block;');
			$('.google-mobile-card .art-bd').attr('style', 'display:block;')
			$('.google-desktop-pair .google-desktop-text-bd').attr('style', 'margin-left:144px;');
			$('.google-mobile-card .google-card-mobile-hgroup').attr('style', 'width:182px;');
		} else {
			$('.google-desktop-pair .art-bd').attr('style', 'display:none;');
			$('.google-desktop-pair .google-desktop-text-bd').attr('style', 'margin-left:0px;');
			$('.google-mobile-card .art-bd').attr('style', 'display:none;')
			$('.google-mobile-card .google-card-mobile-hgroup').attr('style', 'width:auto;');
		}
		$('.google-desktop-title').html(headline);
		$('.google-mobile-title').html(headline);
		$('.google-desktop-source').html(siteName.replace('.com',''));
		$('.google-mobile-name').html(siteName.replace('.com',''));
		$('.google-desktop-desc').html(googleDescription);
	}

	$('.js-edit-trigger').on('click', function() {
		var preview_mod = $(this).closest('.preview-mod');
		preview_mod.toggleClass('is-active');
	});

});
