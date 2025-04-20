import {useAtom, useAtomValue} from 'jotai';
import {Schedule_Model} from '../model/schedule/Schedule_Model';
import {SchedulesMapAtom} from './store';
import dayjs from 'dayjs';

export function useFindSchedules(year: number, month: number) {
    const schedulesMap = useAtomValue(SchedulesMapAtom)
    return schedulesMap.get(generateScheduleKey(year, month))
}

export function useAddSchedules(year: number, month: number, schedules: Schedule_Model[]) {
    const [schedulesMap, setSchedulesMap] = useAtom(SchedulesMapAtom)
    schedulesMap.set(generateScheduleKey(year, month), schedules)
    setSchedulesMap(schedulesMap)
}

export function useUpdateTodaySchedule(schedule: Schedule_Model) {
    const [schedulesMap, setSchedulesMap] = useAtom(SchedulesMapAtom)
    const year = dayjs().year()
    const month = dayjs().month()
    schedulesMap.set(generateScheduleKey(year, month), schedules)
    setSchedulesMap(schedulesMap)
}

function generateScheduleKey(year: number, month: number) {
    return `${year}-${month}`
}

export function getSchedules(year: number, month: number) {

}