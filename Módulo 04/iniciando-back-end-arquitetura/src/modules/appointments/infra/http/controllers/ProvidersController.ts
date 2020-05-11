import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listProviders = container.resolve(ListProviderService);

      const providers = await listProviders.execute({
        user_id,
      });

      return response.json(providers);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
