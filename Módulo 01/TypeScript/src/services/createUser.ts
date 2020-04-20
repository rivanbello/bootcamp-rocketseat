interface TechObject{
  title: string,
  experience: number,
}

interface CreateUserData{
  name?: string,
  email: string,
  password: string
  techs: Array<string | TechObject>, //string[] quando for tipo unico dentro do array
}

export default function createUser({ name = '', email, password }:CreateUserData) {
  const user = {
    name,
    email,
    password
  }

  return user; 
}