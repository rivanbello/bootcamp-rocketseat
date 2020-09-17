import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { token, password } = request.body;

      const resetPassword = container.resolve(ResetPasswordService);

      await resetPassword.execute({
        token,
        password,
      });

      return response.status(204).json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
