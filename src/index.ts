import * as express from 'express'
import * as parser from 'body-parser'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'

import AddControllers from './config/controllers'

const BudgetManagerPORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors)

AddControllers(app)

app.listen(BudgetManagerPORT, () => {
	console.log(`Budget manager api running on ${BudgetManagerPORT}`)
})