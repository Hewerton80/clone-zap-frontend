import moment from 'moment';

export const getHumanizeDate = (date: Date)=> {
    const dateMoment = moment(date);
    const restMinuts = moment().diff(dateMoment, 'minutes')
    return moment.duration(restMinuts, 'minutes').locale('pt-br').humanize()

}