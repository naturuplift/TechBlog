// function for changing format of a date in database
// making it available for use in app
module.exports = {
	format_date: (date) => {
		// Format date as MM/DD/YYYY
		return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		});
  	},
}