import { Router } from "express";
import ticketController from "../../controllers/ticket.controller.js";
import Ticket from '../../dao/Mongo/models/Ticket.js'

const ticket_router = new Router()


ticket_router.post('/', ticketController.createTicket)

ticket_router.get('/:purchaser', ticketController.getTicket)


export default ticket_router