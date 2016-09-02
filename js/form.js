$(document).ready(function(){
	var emailRegEx = /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/;
	var bDayRegEx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

	$('#registration').find('input').on('change', function(){
		var emailString = $('#email').val();
		var bDayString = $('#bday').val();
		var passString = $('#pass').val();
		var pass2String = $('#pass2').val();

		var disabled = !(emailString && bDayString && passString && pass2String);

		// Email input validation
		// Not using <input type="email"> to preserve consistency in look
		if (!emailString.match(emailRegEx) && emailString != '') {
			$('#email').addClass('error');
			$('.email-error').show();
			disabled = true;
		} else {
			$('#email').removeClass('error');
			$('.email-error').hide();
		}

		// Birthday input verification
		if (!bDayString.match(bDayRegEx) && bDayString != 'dd/mm/yyyy') {
			$('#bday').addClass('error');
			$('.date-error').show();
			disabled = true;

		} else {
			var day = parseInt(bDayString.slice(0,2));
			var month = parseInt(bDayString.slice(3,5)) - 1;
			var year = parseInt(bDayString.slice(6,10));

			var bDayDate = new Date(year, month, day);
			var todayDate = new Date();

			if (bDayDate > todayDate) {
				$('#bday').addClass('error');
				$('.date-error-2').show();
				disabled = true;
			} else {
				$('#bday').removeClass('error');
				$('.date-error').hide();
			}
		}

		// Passwords match verification
		if (!(passString == pass2String) && passString && pass2String) {
			$('#pass, #pass2').addClass('error');
			$('.pass-error').show();
			disabled = true;
		} else {
			$('#pass, #pass2').removeClass('error');
			$('.pass-error').hide();
		}
		$('#submit').prop( "disabled", disabled );
	});
})