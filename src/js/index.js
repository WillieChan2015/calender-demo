class Calender {
  constructor(year, month) {
    if (year === undefined || month === undefined) {
      throw new Error("year or month cannot be undefined!");
    }
    if (typeof year !== 'number' || typeof month !== 'number') {
      throw new Error("year or month must be Number type!");
    }
    if (year < 1970 || year > 2100) {
      throw new Error("Year is illegal!");
    }
    if (month < 1 || month > 12) {
      throw new Error("Month is illegal!");
    }
    this.year = year | 0;
    this.month = month | 0;
    this._date = new Date(this.year, this.month - 1, 1);
  }

  setYear(year) {
    if (year === undefined) {
      throw new Error("year cannot be undefined!");
    }
    if (typeof year !== 'number') {
      throw new Error("year must be Number type!");
    }
    if (year < 1970 || year > 2100) {
      throw new Error("Year is illegal!");
    }
    year = year | 0;    // 取整
    if (this.year === year) {
      return
    }
    this.year = year;
    this._date = new Date(this.year, this.month - 1, 1);

    return this._date;
  }

  setMonth(month) {
    if (month === undefined) {
      throw new Error("Month cannot be undefined!");
    }
    if (typeof month !== 'number') {
      throw new Error("Month must be Number type!");
    }
    if (month < 1 || month > 12) {
      throw new Error("Month is illegal!");
    }
    month = month | 0;    // 取整
    if (this.month === month) {
      return
    }
    this.month = month;
    this._date = new Date(this.year, this.month - 1, 1);

    return this._date;
  }

  getAlldays() {
    if ([1, 3, 5, 7, 8, 10, 12].includes(this.month)) {
      return 31
    }
    if (this.month === 2) {
      if ((this.year % 4 === 0) && (this.year % 100 !== 0) || (this.year % 400 === 0)) {
        return 29
      }
      return 28
    }
    return 30
  }

  getFirstDayOfWeek() {
    return this._date.getDay();
  }

  nextYear() {
    let year = this.year + 1;
    if (year > 2100) {
      return
    }
    this.year = year;
    this._date = new Date(this.year, this.month - 1, 1);
    
    return this._date;
  }

  preYear() {
    let year = this.year - 1;
    if (year < 1970) {
      return
    }
    this.year = year;
    this._date = new Date(this.year, this.month - 1, 1);
    
    return this._date;
  }

  nextMonth() {
    let month = this.month + 1;
    if (month > 12) {
      this.year += 1;
      month = 1;
    }
    this.month = month;

    this._date = new Date(this.year, this.month - 1, 1);

    return this._date;
  }

  preMonth() {
    let month = this.month - 1;
    if (month < 1) {
      this.year -= 1;
      month = 12;
    }
    this.month = month;

    this._date = new Date(this.year, this.month - 1, 1);

    return this._date;
  }

  getYear() {
    return this.year;
  }

  getMonth() {
    return this.month;
  }
}

window.addEventListener('load', function () {
  let _d = new Date();
  const date = new Calender(_d.getFullYear(), _d.getMonth() + 1);

  setCalender(date);

  // set selcetions of year
  const yearSelect = this.document.querySelector("#select-year");
  let yearOpts = '';
  for (let i = 1970; i < 2100; i++) {
    yearOpts += `<option value="${i}" ${i === date.getYear() ? 'selected' : ''}>${i}</option>`
  }
  yearSelect.innerHTML = yearOpts;

  // set selections of month
  const monthSelect = this.document.querySelector("#select-month");
  let monthOpts = '';
  for (let i = 1; i <= 12; i++) {
    monthOpts += `<option value="${i}" ${i === date.getMonth() ? 'selected' : ''}>${i}</option>`
  }
  monthSelect.innerHTML = monthOpts;

  // Add selections change event
  yearSelect.addEventListener('change', function() {
    let year = yearSelect.value - 0;
    date.setYear(year);
    let month = monthSelect.value - 0;
    date.setMonth(month);
    setCalender(date);
  });
  monthSelect.addEventListener('change', function() {
    let year = yearSelect.value - 0;
    date.setYear(year);
    let month = monthSelect.value - 0;
    date.setMonth(month);
    setCalender(date);
  });


  // Add click event
  this.document.querySelector('.calender-title-wrap .pre-month').addEventListener('click', function() {
    date.preMonth();
    setCalender(date);
  });
  this.document.querySelector('.calender-title-wrap .next-month').addEventListener('click', function() {
    date.nextMonth();
    setCalender(date);
  });
});

/**
 * 设置日历 / Set calender
 * @param {Calender} date 
 */
function setCalender(date) {
  if (!(date instanceof Calender)) {
    throw new Error("The parameter of date must be an instance of Calender!");
  }
  let count = 0;
  let days = date.getAlldays();
  let calenderDiv = '<div class="line-list-wrap">';
  for (let i = 0; i < date.getFirstDayOfWeek(); i++) {
    calenderDiv += '<span class="item"></span>';
  }
  for (let i = date.getFirstDayOfWeek(); i < 7; i++) {
    calenderDiv += `<span class="item">${count + 1}</span>`;
    count += 1;
  }
  calenderDiv += '</div>';

  let weedDayCount = 0;
  for (; count < days; count++) {
    if (weedDayCount === 0) {
      calenderDiv += '<div class="line-list-wrap">';
    }
    calenderDiv += `<span class="item">${count + 1}</span>`;
    weedDayCount += 1;
    if (weedDayCount === 7) {
      calenderDiv += '</div>';
      weedDayCount = 0;
    }
  }
  if (weedDayCount !== 0 && weedDayCount < 7) {
    for (; weedDayCount < 7; weedDayCount++) {
      calenderDiv += '<span class="item"></span>';
    }
    calenderDiv += '</div>';
  }

  document.querySelector('.calendar-wrap .calender-content').innerHTML = calenderDiv;

  const calenderHeader = document.querySelector('.calendar-wrap .calender-title-wrap');
  calenderHeader.querySelector('.set-year').innerHTML = date.getYear();
  calenderHeader.querySelector('.set-month').innerHTML = date.getMonth();
}
