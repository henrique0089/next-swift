import { Employee } from '@app/entities/employee'
import { EmployeesRepository } from '@app/repositories/employees-repository'

export class GetAllEmployeesUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute(): Promise<Employee[]> {
    return this.employeesRepo.findAll()
  }
}
