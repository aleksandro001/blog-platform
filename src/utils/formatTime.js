import { format, parseISO } from 'date-fns';

const formatTime = (date) => format(parseISO(date), 'MMMM dd, yyyy');

export default formatTime;
