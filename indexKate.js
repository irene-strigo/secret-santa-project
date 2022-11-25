timeend = new Date();
// IE и FF по разному отрабатывают getYear()
timeend = new Date(timeend.getYear() > 1900 ? (timeend.getYear() + 1) : (timeend.getYear() + 1901), 0, 1);
// для задания обратного отсчета до определенной даты укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ);
// Для задания даты с точностью до времени укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);
setInterval(
	function time() {
		//     today = new Date();
		//     today = Math.floor((timeend - today) / 1000);
		//     tsec = today % 60; today = Math.floor(today / 60); if (tsec < 10) tsec = '0' + tsec;
		//     tmin = today % 60; today = Math.floor(today / 60); if (tmin < 10) tmin = '0' + tmin;
		//     thour = today % 24; today = Math.floor(today / 24);
		//     timestr = today + " дней " + thour + " часов " + tmin + " минут " + tsec + " секунд";
		//     document.getElementById('t').innerHTML = timestr;
		// }

		today = new Date();
		today = Math.floor((timeend - today) / 1000);
		tsec = today % 60;
		today = Math.floor(today / 60);
		if (tsec < 10) tsec = '0' + tsec;
		tmin = today % 60;
		today = Math.floor(today / 60);
		if (tmin < 10) tmin = '0' + tmin;
		thour = today % 24;
		today = Math.floor(today / 24);
		timestr = today + " дней " + thour + " часов " + tmin + " минут " + tsec + " секунд";

		/*console.log(today);
        console.log(thour);
        console.log(tmin);
        console.log(tsec);*/





		document.getElementById("day").innerHTML = today;
		document.getElementById("thour").innerHTML = thour;
		document.getElementById("tmin").innerHTML = tmin;
		document.getElementById("tsec").innerHTML = tsec;
	}, 5);