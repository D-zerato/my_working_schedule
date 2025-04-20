import dayjs from 'dayjs';
import ServerLogic from '../_server/logic/server.logic';
import StoreLogic from '../store/store.logic';
import {DriveFileContent_Model} from '../_server/model/DriveFileContent_Model';
import {Schedule_Model} from '../model/schedule/Schedule_Model';
import {Vacation_Model} from '../model/vacation/Vacation_Model';
import {MealCost_Model} from '../model/mealCost/MealCost_Model';

const serverLogic = ServerLogic();
const storeLogic = StoreLogic();

export async function initData() {
    await initSchedule()
    await initVacations()
    await initMealCoasts()
}

async function initSchedule() {
    const thisYear = dayjs().year()
    const thisMonth = dayjs().month()

    const thisSchedulesFileData: DriveFileContent_Model | undefined = await serverLogic.findFile(generateSchedulesFileName(thisYear, thisMonth))
    if (!thisSchedulesFileData) {
        await serverLogic.registerFile(generateSchedulesFileName(thisYear, thisMonth), undefined)
    }
    const parseThisSchedules: Schedule_Model[] = thisSchedulesFileData ? JSON.parse(thisSchedulesFileData.content) : []
    storeLogic.registerSchedules(thisYear, thisMonth, parseThisSchedules)

    const beforeYear = dayjs().add(-1, 'month').year()
    const beforeMonth = dayjs().add(-1, 'month').month()
    const beforeSchedulesFileData: DriveFileContent_Model | undefined = await serverLogic.findFile(generateSchedulesFileName(beforeYear, beforeMonth))
    const parseBeforeSchedules: Schedule_Model[] = beforeSchedulesFileData ? JSON.parse(beforeSchedulesFileData.content) : []
    storeLogic.registerSchedules(beforeYear, beforeMonth, parseBeforeSchedules)
}

async function initVacations() {
    const thisYear = dayjs().year()

    const vacationFileData: DriveFileContent_Model | undefined = await serverLogic.findFile(generateVacationsFileName(thisYear))
    if (!vacationFileData) {
        await serverLogic.registerFile(generateVacationsFileName(thisYear), undefined)
    }
    const parseVacations: Vacation_Model[] = vacationFileData ? JSON.parse(vacationFileData.content) : []
    storeLogic.registerVacations(thisYear, parseVacations)
}

async function initMealCoasts() {
    const thisYear = dayjs().year()

    const mealCoastsFileData: DriveFileContent_Model | undefined = await serverLogic.findFile(generateMealCostsFileName(thisYear))
    if (!mealCoastsFileData) {
        await serverLogic.registerFile(generateMealCostsFileName(thisYear), undefined)
    }
    const parseMealCoasts: MealCost_Model[] = mealCoastsFileData ? JSON.parse(mealCoastsFileData.content) : []
    storeLogic.registerMealCosts(thisYear, parseMealCoasts)
}

function generateSchedulesFileName(year: number, month: number) {
    return `${year}-${month}-schedule.json`
}

function generateVacationsFileName(year: number) {
    return `${year}-vacations.json`
}

function generateMealCostsFileName(year: number) {
    return `${year}-mealCosts.json`
}