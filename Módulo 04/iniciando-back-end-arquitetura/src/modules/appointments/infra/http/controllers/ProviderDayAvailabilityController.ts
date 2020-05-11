import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const provider_id = request.params.id;
      const { month, year, day } = request.body;

      const listProviderDayAvailability = container.resolve(
        ListProviderDayAvailabilityService,
      );
      const availability = await listProviderDayAvailability.execute({
        provider_id,
        month,
        year,
        day,
      });

      return response.json(availability);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
