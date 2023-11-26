import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
dayjs.extend(dayOfYear);
dayjs.extend(isToday);
dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);

dayjs.locale("vi");

export default dayjs;
