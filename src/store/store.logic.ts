import {Schedule_Model} from '../model/schedule/Schedule_Model';
import {Vacation_Model} from '../model/vacation/Vacation_Model';
import {MealCost_Model} from '../model/mealCost/MealCost_Model';
import {useAtom} from 'jotai';
import {MealCoastsMapAtom, SchedulesMapAtom, VacationsMapAtom} from './store';

const StoreLogic = () => {
    const [schedules, setSchedules] = useAtom(SchedulesMapAtom)
    const [vacations, setVacations] = useAtom(VacationsMapAtom)
    const [mealCoasts, setMealCoasts] = useAtom(MealCoastsMapAtom)

    function generateScheduleKey(year: number, month: number) {
        return `${year}-${month}`
    }

    function registerSchedules(year: number, month: number, newScheDules: Schedule_Model[]) {
        schedules.set(generateScheduleKey(year, month), newScheDules)
        setSchedules(schedules)
    }

    function findSchedules(year: number, month: number) {
        return schedules.get(generateScheduleKey(year, month)) || []
    }

    function registerVacations(year: number, newVacations: Vacation_Model[]) {
        vacations.set(year, newVacations)
        setVacations(vacations)
    }

    function findVacations(year: number) {
        return vacations.get(year) || []
    }

    function registerMealCosts(year: number, newMealCoasts: MealCost_Model[]) {
        mealCoasts.set(year, newMealCoasts)
        setMealCoasts(mealCoasts)
    }

    function findMealCosts(year: number) {
        return mealCoasts.get(year) || []
    }

    return {
        registerSchedules,
        findSchedules,
        registerVacations,
        findVacations,
        registerMealCosts,
        findMealCosts
    }
}

export default StoreLogic