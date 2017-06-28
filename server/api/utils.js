function getDate () {
  var date = new Date();
  var substract = date.getTime() - (300*60*1000);
  var dateStr = new Date(substract).toISOString().split('.')[0];
  return dateStr + '-05:00';
}


module.exports  = {
	getDate: getDate
};