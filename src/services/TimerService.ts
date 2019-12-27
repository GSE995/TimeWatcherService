import Timer from '../models/Timer'
import {SuccessResult, ErrorResult} from '../models/Result'
import ListResult from '../models/ListResult'
import PageSize from '../models/PageSize'
import firebase from '../config/firebase'

const db = firebase.firestore()
const collection = db.collection('timers')

const API_ROOT_URL = '/api/timer'
export { API_ROOT_URL }

export default class TimersServie<T> {

    static async create(timer: Timer): Promise<SuccessResult<Timer> | ErrorResult> {
        try {
            let timerForSave = {
                name: timer.name,
                endDate: timer.endDate || null,
                startDate: timer.startDate
            }
            let docRef: any = await collection.add(timerForSave)
            let serverTimer = new Timer(timer.name)
            serverTimer.startDate = timer.startDate
            serverTimer.id = docRef.id
            return new SuccessResult(serverTimer)
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }

    static async save(timer: Timer): Promise<SuccessResult<Timer> | ErrorResult> {
        try {
            let timerForSave = {
                name: timer.name,
                endDate: timer.endDate || null,
                startDate: timer.startDate
            }
            let res = await collection.doc(timer.id).update(timerForSave)
            return new SuccessResult(timer)
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }

    static async remove(id: string): Promise<SuccessResult<Boolean> | ErrorResult> {
        try {
            let response = await collection.doc(id).delete()
            return new SuccessResult(true)
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }

    static async getList(pageSize: PageSize): Promise<SuccessResult<ListResult<Timer>> | ErrorResult> {
        try {
            let querySnapshot = await collection.orderBy('endDate', 'desc') .get()
            let timers: any = []
            
            querySnapshot.forEach(doc => {
                let data = doc.data()
                let timer = new Timer(data.name)
                timer.id = doc.id
                timer.startDate = data.startDate ? data.startDate.toDate() : null
                timer.endDate = data.endDate ? data.endDate.toDate() : null
                timers.push(timer)
            })
            return new SuccessResult(new ListResult<Timer>(timers, 1, pageSize))
        } catch (error) {
            console.log(error)
            return new ErrorResult(error)
        }
    }
}
