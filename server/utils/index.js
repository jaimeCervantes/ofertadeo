function formatDateStr(date, format){
  var dateStr = new Date(date);
  if (format && format.toUpperCase() === 'GMT') {
    return dateStr.toGMTString().split('GMT')[0] + '-0500';
  }
  return  dateStr.toISOString().split('.')[0] + '-05:00' ;
}

function getDate (dateObj, format) {
  var date;
  if(dateObj) {
    date = new Date(dateObj);
  } else {
    date = new Date();
  }
  
  var substract = date.getTime() - (300*60*1000);// minus 5 hrs
  
  return formatDateStr(substract, format );
}


module.exports = {
  getDate: getDate
};