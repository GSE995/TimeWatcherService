import {Request, Response, Express} from 'express'
import logger from '../config/logger'
import TimersServie from '../services/TimerService'
import { PageSize, Timer } from '../models'
import ListResult from '../models/ListResult'

export default (app: Express) : void => {

    app.route('/api/v1/timer/:id')
        .put(async (req: Request, res: Response) => {
            let timer = req.body
            let result = await TimersServie.save(timer)
            result
                .ifSuccess((data: Timer) => {
                    res.send(data)
                })
                .ifFailure((message: string) => {
                    logger.error(message)
                    res.status(500).send(message)
                })
        })
        .post(async (req: Request, res: Response) => {
            let timer = req.body
            let result = await TimersServie.create(timer)
            result
                .ifSuccess((data: Timer) => {
                    res.send(data)
                })
                .ifFailure((message: string) => {
                    logger.error(message)
                    res.status(500).send(message)
                })
        })
        .delete(async (req: Request, res: Response) => {
            let result = await TimersServie.remove(req.query.id)
            result
                .ifSuccess(() => {
                    res.send()
                })
                .ifFailure((message: string) => {
                    logger.error(message)
                    res.status(500).send(message)
                })
        })
    app.route('/api/v1/timer/list')
        .get(async (req: Request, res: Response) => {
            let qery = req.query
            let result = await TimersServie.getList(new PageSize(qery.start, qery.limit))

            result
                .ifSuccess((data: ListResult<Timer>) => {
                    res.send(data)
                })
                .ifFailure((message: string) => {
                    logger.error(message)
                    res.status(500).send(message)
                })
        })
}