import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const showProfileService = container.resolve(ShowProfileService);

      const user = await showProfileService.execute({ user_id });

      return response.json(classToClass(user));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, old_password, password } = request.body;

      const updatedProfile = container.resolve(UpdateProfileService);

      const user = await updatedProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      delete user?.password;

      return response.json(classToClass(user));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
