import {Request, Response} from 'express';
import createUser from './services/createUser';

export function helloWorld( request: Request, response: Response) {
  const user = createUser({
    email: 'email',
    password: '123456',
    techs: [ 
      'ReactJS',
      'ReactNative',
      'NodeJs',
      {title: 'JavaScript', experience: 100}
    ]
  });

  return response.json(user);
}