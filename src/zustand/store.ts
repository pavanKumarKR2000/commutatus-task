import { create } from "zustand";

interface EmployeeProps {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  level: string;
  managerId: string;
  team: string | null;
}

interface UseEmployeeProps {
  employees: EmployeeProps[];
  addEmployee: (
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    level: string,
    managerId: string,
    team?: string | null
  ) => void;
  getEmployeesByLevel: (level: string) => EmployeeProps[];
  getEmployeeById: (level: string) => EmployeeProps[];
}

export const useEmployee = create<UseEmployeeProps>((set, get) => ({
  employees: [],
  addEmployee: (id, name, phoneNumber, email, level, managerId, team = null) =>
    set((state) => ({
      employees: [
        ...state.employees,
        { id, name, phoneNumber, email, level, managerId, team },
      ],
    })),
  getEmployeesByLevel: (level: string) => {
    return get().employees.filter((employee) => employee.level === level);
  },
  getEmployeeById: (id: string) => {
    return get().employees.filter((employee) => employee.id === id);
  },
}));
