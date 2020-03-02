import React from 'react';
import Calendar from 'react-native-calendario';

<Calendar
  onChange={(range) => console.log(range)}
  minDate="2018-04-20"
  startDate="2018-04-30"
  endDate="2018-05-05"
  theme={{
    activeDayColor: {},
    monthTitleTextStyle: {
      color: '#6d95da',
      fontWeight: '300',
      fontSize: 16,
    },
    emptyMonthContainerStyle: {},
    emptyMonthTextStyle: {
      fontWeight: '200',
    },
    weekColumnsContainerStyle: {},
    weekColumnStyle: {
      paddingVertical: 10,
    },
    weekColumnTextStyle: {
      color: '#b6c1cd',
      fontSize: 13,
    },
    nonTouchableDayContainerStyle: {},
    nonTouchableDayTextStyle: {},
    startDateContainerStyle: {},
    endDateContainerStyle: {},
    dayContainerStyle: {},
    dayTextStyle: {
      color: '#2d4150',
      fontWeight: '200',
      fontSize: 15,
    },
    dayOutOfRangeContainerStyle: {},
    dayOutOfRangeTextStyle: {},
    todayContainerStyle: {},
    todayTextStyle: {
      color: '#6d95da',
    },
    activeDayContainerStyle: {
      backgroundColor: '#6d95da',
    },
    activeDayTextStyle: {
      color: 'white',
    },
    nonTouchableLastMonthDayTextStyle: {},
  }}
/>
