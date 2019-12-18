import {Request, Response, Express} from 'express'
import logger from '../config/logger'
import TimersServie from '../services/TimerService'
import { PageSize } from '../models'

export default (app: Express) : void => {

    app.route('/api/v1/timer/')
        .post(async (req: Request, res: Response) => {
            try {   
                let timer = req.body
                let result = TimersServie.save(timer)
                res.send(result)
            } catch (error) {
                logger.error(error)
            }
            res.status(500).send()
        })
        .delete(async (req: Request, res: Response) => {
            try {
                let result = await TimersServie.remove(req.query.id)
                res.send(result)
            } catch (error) {
                logger.error(error)
            }
            res.status(500)
        })
    app.route('/api/v1/timer/list')
        .get(async (req: Request, res: Response) => {
            try {   
                let {pageParams} = req.body
                let result = TimersServie.getList(new PageSize(pageParams.start, pageParams.limit))
                res.send(result)
            } catch (error) {
                logger.error(error)
            }
            res.status(500).send()
        })
}