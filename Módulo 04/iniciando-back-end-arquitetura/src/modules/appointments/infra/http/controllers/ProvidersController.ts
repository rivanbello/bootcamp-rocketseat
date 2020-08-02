import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listProviders = container.resolve(ListProviderService);

      const providers = await listProviders.execute({
        user_id,
      });

      return response.json(classToClass(providers));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
