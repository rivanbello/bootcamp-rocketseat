import { isEqual } from 'date-fns';
import { uuid } from 'uuidv4';

import IAppointmenstRepository from '@modules/appointments/repositories/IAppointmenstRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointments';

class FakeAppointmentsRepository implements IAppointmenstRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }
}

export default FakeAppointmentsRepository;
