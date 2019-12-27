import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'

import UseCors from './config/cors'
import AddControllers from './config/controllers'

const port = process.env.PORT || 3001;

const app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use(bodyParser.json())

UseCors(app)
AddControllers(app)

app.listen(port, () => {
	console.log(`API running on ${port}`)
})