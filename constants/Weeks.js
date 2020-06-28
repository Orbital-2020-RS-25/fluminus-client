import moment from 'moment'

const sem_start = moment('2020-01-13 00:00:00');

export default function get_date(week, day_of_week, start, end) {
    let day = -1;
    switch (day_of_week) {
        case "Monday": 
            day = 0;
        case "Tuesday": 
            day = 1;
        case "Wednesday": 
            day = 2;
        case "Thursday": 
            day = 3;
        case "Friday": 
            day = 4;
        case "Saturday": 
            day = 5;
        case "Sunday": 
            day = 6;
    }

    const start_time = sem_start.clone()
                    .add(week - 1, 'week')
                    .add(day, 'day')
                    .add(parseInt(start.slice(0,2)), 'hour')
                    .add(parseInt(start.slice(2)), 'minute');

    const end_time = sem_start.clone()
                    .add(week - 1, 'week')
                    .add(day, 'day')
                    .add(parseInt(end.slice(0,2)), 'hour')
                    .add(parseInt(end.slice(2)), 'minute');

    return [start_time, end_time];
}