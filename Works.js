$(document).ready(function(){
    var today = new Date();
    var currentDate = new Date(); //создаем переменную для текущей даты
 
//var locale = window.navigator.language;

    var getLastDayOfMonth = function (year, month) {
        var lastdate = new Date(year, month + 1, 0);
        return lastdate.getDate();
    };

    var getFirstDayOfMonth = function (year, month) {
        var firstdate = new Date(year, month, 1);
        var dayOfWeek = firstdate.getDay();
        if (dayOfWeek == 0) {
            dayOfWeek = 7;
        }
        return dayOfWeek - 1;
    };

    var getAllDaysOfMonth = function (year, month) {
        var days = new Array();
        var lastDayOfMonth = getLastDayOfMonth(year, month);
        for (var i = 1; i <= lastDayOfMonth; i++) {
            days.push(i);
        }
        return days;
    };
  
    function fillEmptyTD(td) {
        td.addClass('empty');
        td.append('-');
    }

    function fillTD(td, date) {
        td.append(date); 
    }

    var createTable = function (date) {

        var dd = date.getDate();
        var mm = date.getMonth();
        var yyyy = date.getFullYear();
        
        var days = getAllDaysOfMonth(yyyy, mm);
        var weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        var table = $('<table>');
        var tr = $('<tr>');

        //заполняем шапку таблицы
        for (var i = 0; i < weekdays.length; i++) {
            var th = $('<th>');
            th.append(weekdays[i]);
            tr.append(th);
        }
        table.append(tr);

        //заполняем календарь
        for (var i = 0; i < 6; i++) {
            tr = $('<tr>');
            for (var j = 0; j < weekdays.length; j++) {            
                var td = $('<td>');
                if ((i == 0 && j < getFirstDayOfMonth(yyyy, mm)) || days.length == 0) {
                    fillEmptyTD(td);               
                }
                else {
                    if(days[0]==dd && date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth()){
                        td.addClass('todayTD');
                        }
                    fillTD(td, days.shift());
                    td.addClass('myClass');
                }
                tr.append(td); 
            }
            table.append(tr);    
        }
        $('#calendarDiv').empty().append(table);
        setCellsClickHandler();
    };

    $('.prev-button').click(function(){
        currentDate = setDate(currentDate, -1);
        setInnerHTML(currentDate);
        createTable(currentDate);
    });

    $('.next-button').click(function(){
        currentDate = setDate(currentDate, 1);
        setInnerHTML(currentDate);
        createTable(currentDate);
    });

    $('.today').click(function(){
        currentDate = today;
        setInnerHTML(currentDate);
        createTable(currentDate);
    });

    function setInnerHTML(date) {
        var elem_h3 = $('#date');
        var options = { month: 'long', year: 'numeric' };
        var month_year = date.toLocaleString('ru', options);
        elem_h3.empty().append(month_year);
    };

    function setDate(date, monthOffset){
        var newDate = new Date(date.getFullYear(), date.getMonth() + monthOffset, date.getDate());
        return newDate;
    };

    function setCellsClickHandler(){
        $('.myClass').click(function(){
            var form = $('#addEvent-form');
            var cell = $(this);
            //'position': 'absolute',
            form.css({'display': 'block',  'top': cell.position().top, 'left': cell.position().left});
            cell.css('position', 'relative');
            currentDate.setDate(cell.html());
        });    
    };

    createTable(currentDate);
    setInnerHTML(currentDate);
    

    // $('.myClass').click(function(){
    //     var form = $('#addEvent-form');
    //     form.css('display', 'block');
    //     $(this).css('position', 'relative');
    //     $(this).append(form);
    //     $(this).off('click');
    // });
});


/*
var table = document.getElementsByTagName('table');


table.onclick = function(event) {
    var target = event.target; // где был клик?
  
    if (target.tagName != 'td') return; // не на TD? тогда не интересует
  
    
    highlight(target); // подсветить TD
  };
});*/
/*
var newTable = document.getElementsByTagName('table');


newTable.onclick = function(){   
   var newTd = document.getElementsByTagName('td');
   var form = document.getElementById('addEvent-form');
   form.style.display = 'block';
   var div = document.getElementById('addEvent');
   newTd.appendChild(form);
 };*/

