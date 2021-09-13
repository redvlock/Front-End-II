// SPLIT THE DESCRIPTION TASK AND RETURN THE TEXT DESCRIPTION
function getDescription(data, date=null){
    let description = data.split("  -  ")[0]
    return description
}

// SPLIT THE DESCRIPTION TASK AND RETURN THE DEADLINE
function getDeadline(data, minutes=null){
    let deadline = data.split("  -  ")[1]
    deadline = minutes && deadline? getDateMinutes(deadline) : 
               deadline? deadline : false
    return deadline
}

// SPLIT THE DESCRIPTION TASK AND RETURN THE DATE WARNING
function getDateWarning(data, minutes=null){
    let dateWarning = data.split("  -  ")[2]
    dateWarning = minutes && dateWarning? getDateMinutes(dateWarning) : 
               dateWarning? dateWarning : false
    return dateWarning
}

// RETURN DATE IN FRIENDLY TEXT BASED ON QUANTITY OF MINUTES
function getDateText(date, minutes=null, dateFuture=null){
    let dateMinutes = date;
    if(!minutes){
        dateMinutes = getDateMinutes(date);
    }
    dateMinutes = dateFuture? dateMinutes * -1 : dateMinutes
    date = dateMinutes < 1? "Ahora Mismo" : 
           dateMinutes < 60? `${dateMinutes} min` : 
           dateMinutes < 1440? `${Math.round(dateMinutes / 60)} hrs` :
           dateMinutes < 8640? `${Math.round((dateMinutes / 60) / 24)} dias`:
           dateMinutes < 35280? `${Math.round((dateMinutes / 60) / 168)} week`:
           dateMinutes < 482400? `${Math.round(dateMinutes / 43860)} month` :
           dateMinutes > 482400? `${Math.round(dateMinutes / 526464)} year` :
           !minutes? new Date(date).toLocaleDateString("es-CO") : ""
    
    return date;
}

// RETURN A DATE TEXT FRIENDLY BASE ON DATE FORMAT
function getDateFormat(date, locale, completeDay, completeMonth, year){
    if(!date) return "No establecida"
    locale = locale? locale : navigator.language
    date = new Date(date)
    let weekday = date.toLocaleDateString(locale, { weekday: 'long' });
    weekday = weekday.replace(weekday[0], weekday[0].toUpperCase())
    let day = date.getDate()
    let month = date.toLocaleDateString(locale, { month: 'long' });
    month = month.replace(month[0], month[0].toUpperCase())
    let yearDate = date.getFullYear();
    let dateCurrentHours = date.getHours();
    let dateCurrentMinutes = date.getMinutes() < 9? "0".concat(date.getMinutes()) : date.getMinutes()
    completeDay = completeDay? weekday : weekday.slice(0,3);
    completeMonth = completeMonth? month : month.slice(0,3)
    return `${completeDay} ${day} ${completeMonth}${year? ` ${yearDate}`:""}  -  ${dateCurrentHours}:${dateCurrentMinutes}`
}

// RETURN THE MINUTES PASSED BETWEEN ONE DATE AND NOW
function getDateMinutes(date){
    return Math.round((((new Date(date)).getTime() - Date.now()) / 1000) / 60)
}

// COMPARE TWO DATES
function compareDate(firstTask, secondTask, HigherToLower=null){
    let firstDeadline = getDeadline(firstTask.description, "min")
    let secondDeadline = getDeadline(secondTask.description, "min")
    firstDeadline = isNaN(firstDeadline) || firstDeadline===false? 100000000000000 : firstDeadline
    secondDeadline = isNaN(secondDeadline) || secondDeadline===false? 100000000000000 : secondDeadline
    return HigherToLower? firstDeadline - secondDeadline :secondDeadline - firstDeadline; 
}

// SET THE COLOR OF PRIORITY
function setPriority(deadlineMinutes, dateWarningMinutes){
    if((deadlineMinutes === false || deadlineMinutes > 120) || (dateWarningMinutes > 0 && deadlineMinutes < 120 && deadlineMinutes > 0)){
       return "rgb(30, 221, 30)"
    }else if((deadlineMinutes < 120 && deadlineMinutes > 1 && dateWarningMinutes < 0 && dateWarningMinutes) || (!dateWarningMinutes && deadlineMinutes > 1)){
       return "rgb(255, 174, 0)"
    }else{
       return "rgb(255, 21, 0)"
    }
}

function shortText(text, mobile, menu){
    mobile = mobile? 17 : 100
    mobile = window.screen.width < 380? 15 : mobile
    mobile = window.screen.width < 335? 13 : mobile
    mobile = menu?  20 : mobile
    return text.length > mobile? text.slice(0,mobile-3).concat("...") : text
}

function setMinDatePicker(date){
    let currentDate = date? date : new Date()
    let currentMonth = currentDate.getMonth() < 10? "0".concat(currentDate.getMonth() + 1) : currentDate.getMonth() + 1
    currentDate = `${currentDate.getFullYear()}-${currentMonth}-${currentDate.getDate()}`
    let dateCurrentHours = new Date().getHours();
    let dateCurrentMinutes = new Date().getMinutes();
    return `${currentDate.concat(`T${dateCurrentHours}:${dateCurrentMinutes}`)}`;
}
export { getDescription, getDeadline, getDateWarning, getDateText, getDateMinutes, compareDate, getDateFormat, setPriority, shortText, setMinDatePicker }