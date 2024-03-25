"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEmployee } from "@/zustand/store";

const EmployeesTable = () => {
  const employees = useEmployee((store) => store.employees);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>name</TableHead>
            <TableHead>phone number</TableHead>
            <TableHead>email</TableHead>
            <TableHead>level</TableHead>
            <TableHead>manager id</TableHead>
            <TableHead>team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.phoneNumber}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.level}</TableCell>
              <TableCell>{employee.managerId}</TableCell>
              <TableCell>{employee.team}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesTable;
