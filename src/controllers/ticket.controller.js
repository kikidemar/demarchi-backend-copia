import Ticket from '../dao/Mongo/models/Ticket.js'

class TicketController {

    createTicket = async (req, res, next) => {
        try {
            let { dataTotal } = req.body;
            const purchaser = this.getPurchaserFromCookie(req);

            const existingTicket = await Ticket.findOne({ purchaser });

            if (existingTicket) {
                
                return res.status(409).json({ message: 'You already have a ticket', ticket: existingTicket });
            }

            const purchaseDate = new Date();

            const newTicket = new Ticket({
                purchase_date: purchaseDate,
                amount: dataTotal,
                purchaser: purchaser,
            });

            const savedTicket = await newTicket.save();

            res.status(201).json({ message: 'Ticket created', ticket: savedTicket });
        } catch (error) {
            next(error);
        }
    };

    getPurchaserFromCookie = (req) => {
        const cookies = req.cookies;
        const emailCookie = cookies.email;

        if (emailCookie) {
            return emailCookie
        }

        return 'Comprador_desconocido'
    }

    getTicket = async (req, res, next) => {
        try {
            const purchaser = this.getPurchaserFromCookie(req);
            const ticket = await Ticket.find({ purchaser }, 'purchaser purchase_date amount')
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket no found' });
            }

            return res.status(200).json(ticket);
        } catch (error) {
            next(error);
        }
    }

}

export default new TicketController()