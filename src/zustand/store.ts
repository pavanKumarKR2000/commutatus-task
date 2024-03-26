import { levels } from "@/lib/utils";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface EmployeeProps {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  level: string;
  managerId: string | null;
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
    managerId: string | null,
    team?: string | null
  ) => void;
  getEmployeesByLevel: (level: string) => EmployeeProps[];
  getEmployeeById: (level: string) => EmployeeProps;
  getAllTeams: () => (string | null)[];
  deleteEmployee: (id: string) => void;
  updateEmployee: (data: EmployeeProps) => void;
}

export const useEmployee = create<UseEmployeeProps>()(
  devtools(
    persist(
      (set, get) => ({
        employees: [],
        addEmployee: (
          id,
          name,
          phoneNumber,
          email,
          level,
          managerId,
          team = null
        ) =>
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
          return get().employees.filter(
            (employee) => employee.id === id
          )?.[0] as EmployeeProps;
        },
        getAllTeams: () => {
          return get()
            .getEmployeesByLevel(levels.L3)
            .map((employee) => employee.team);
        },
        deleteEmployee: (id: string) =>
          set((state) => ({
            employees: state.employees.filter((employee) => employee.id !== id),
          })),
        updateEmployee: (data: EmployeeProps) => {
          const remaining_employees = get().employees.filter(
            (emp) => emp.id !== data.id
          );

          const new_updatedEmployee = { ...data };
          remaining_employees.unshift(new_updatedEmployee);
          set(() => ({ employees: remaining_employees }));
        },
      }),
      { name: "employees" }
    )
  )
);
