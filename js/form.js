$(document).ready(function(){
	var emailRegEx = /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/;
	var bDayRegEx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

	// Birthday input assistance
	$('#bday').on('keyup', function(e){
		var val = $(this).val();
		if ((val.length == 2 || val.length == 5) && e.which != 8) {
			$(this).val(val + '/');
		}
	});

	// Form input validation
	$('#registration').find('input').on('change', function(){
		var emailString = $('#email').val();
		var bDayString = $('#bday').val();
		var passString = $('#pass').val();
		var pass2String = $('#pass2').val();

		var disabled = !(emailString && bDayString && passString && pass2String);

		// Email input validation
		// Not using <input type="email"> to preserve consistency in look in case of error
		if (!emailString.match(emailRegEx) && emailString != '') {
			$('#email').addClass('error');
			$('.email-error').css('display', 'block');
			disabled = true;
		} else {
			$('#email').removeClass('error');
			$('.email-error').css('display', 'none');
		}

		// Birthday input verification
		if (!bDayString.match(bDayRegEx) && bDayString != '') {
			$('#bday').addClass('error');
			$('.date-error').css('display', 'block');
			disabled = true;

		} else {
			var day = parseInt(bDayString.slice(0,2));
			var month = parseInt(bDayString.slice(3,5)) - 1;
			var year = parseInt(bDayString.slice(6,10));

			var bDayDate = new Date(year, month, day);
			var todayDate = new Date();

			if (bDayDate > todayDate) {
				$('#bday').addClass('error');
				$('.date-error-2').css('display', 'block');
				disabled = true;
			} else {
				$('#bday').removeClass('error');
				$('.date-error').css('display', 'none');
			}
		}

		// Passwords match verification
		if (!(passString == pass2String) && passString && pass2String) {
			$('#pass, #pass2').addClass('error');
			$('.pass-error').css('display', 'block');
			disabled = true;
		} else {
			$('#pass, #pass2').removeClass('error');
			$('.pass-error').css('display', 'none');
		}
		$('#submit').prop( "disabled", disabled );
	});

	//Submitting form via AJAX
	$('#registration').on('submit', function(e){
		e.preventDefault();
		$('.loading').addClass('visible');
		$.ajax({
			method: "POST",
			url: "php/form.php",
			data: { email: $('#email').val()}
		})
		.done(function( msg ) {
			alert(msg);
			$('#registration').find('input[type=text], input[type=password]').each(function(){
				$(this).val('');
			});
			$('#submit').prop('disabled', 'true');
			$('.loading').removeClass('visible');
  		})
  		.fail(function(err) {
  			alert(err);
  		});
	});
});