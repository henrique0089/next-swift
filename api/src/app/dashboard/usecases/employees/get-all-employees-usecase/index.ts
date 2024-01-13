import { Employee } from '@app/dashboard/entities/employee'
import { EmployeesRepository } from '@app/dashboard/repositories/employees-repository'

export class GetAllEmployeesUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute(): Promise<Employee[]> {
    return this.employeesRepo.findAll()
  }
}
