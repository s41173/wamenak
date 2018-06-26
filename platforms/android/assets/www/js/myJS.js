function startDate() {
    var currentDate = new Date();

    day = currentDate.getDay();
    date = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();

    var hari = document.getElementById("day");
    document.getElementById("date").innerHTML = date;
    var bln = document.getElementById("month");
    document.getElementById("year").innerHTML = year;

    if(day === 1){
		day = "Monday,";
	}
	else if(day === 2){
		day = "Tuesday,";
	}
	else if(day === 3){
		day = "Wednesday,";
	}
	else if(day === 4){
		day = "Thursday,";
	}
	else if(day === 5){
		day = "Friday,";
	}
	else if(day === 6){
		day = "Saturday,";
	}
	else{
		day = "Sunday,";
	}
    hari.innerHTML = day;
    

    if(month === 1){
		month = "January";
	}
	else if(month === 2){
		month = "February";
	}	
	else if(month === 3){
		month = "March";
	}
	else if(month === 4){
		month = "April";
	}
	else if(month === 5){
		month = "May";
	}
	else if(month === 6){
		month = "June";
	}
	else if(month === 7){
		month = "July";
	}
	else if(month === 8){
		month = "August";
	}
	else if(month === 9){
		month = "September";
	}
	else if(month === 10){
		month = "October"
	}
	else if(month === 11){
		month = "November";
	}
	else{
		month = "December";
	}
	bln.innerHTML = month;
}


