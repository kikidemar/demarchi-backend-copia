import Ticket from '../dao/Mongo/models/Ticket.js'

class TicketController {

  // Controlador para crear un nuevo ticket
  createTicket = async (req, res, next) => {
      try {
          let { dataTotal } = req.body;
          const purchaser = this.getPurchaserFromCookie(req);
  
          const purchaseDate = new Date();
  
          const newTicket = new Ticket({
              purchase_date: purchaseDate,
              amount: dataTotal,
              purchaser: purchaser,
          });
  
          const savedTicket = await newTicket.save();
  
          res.status(201).json({ message: 'Ticket creado', ticket: savedTicket });
      } catch (error) {
          next(error); // Pasa el error al siguiente middleware de manejo de errores
      }
  };
  
  getPurchaserFromCookie = (req) => {
    const cookies = req.cookies;
    const emailCookie = cookies.email;

    if (emailCookie) {
        return emailCookie
    }

    return 'Comprador_desconocido'
};
  };



export default new TicketController()