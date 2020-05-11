import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  // public async show(request: Request, response: Response): Promise<Response> {
  //   const createAppointment = container.resolve(CreateAppointmentService);

  //   const appointments = cre
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { provider_id, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = container.resolve(CreateAppointmentService);
      const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
        user_id,
      });

      return response.json(appointment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
