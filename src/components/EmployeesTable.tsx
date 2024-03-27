"use client";
import { levels } from "@/lib/utils";
import { EmployeeProps, useEmployee } from "@/zustand/store";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import UpdateForm from "./UpdateForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const EmployeesTable = () => {
  const employees = useEmployee((store) => store.employees);
  const deleteEmployee = useEmployee((store) => store.deleteEmployee);
  const getEmployeeById = useEmployee((store) => store.getEmployeeById);

  const [searchInput, setSearchInput] = useState("");
  const [employeeData, setEmployeeData] = useState<EmployeeProps>({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
    managerId: null,
    team: null,
    level: "",
  });

  const handleDelete = (id: string) => {
    deleteEmployee(id);
  };

  const handleUpdate = (ID: string) => {
    const { id, name, phoneNumber, email, managerId, team, level } =
      getEmployeeById(ID);

    setEmployeeData({
      id,
      name,
      phoneNumber,
      email,
      managerId,
      team,
      level,
    });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSearch = () => {
    handleSearch;
  };

  return (
    <div className="w-full border border-slate-200">
      <div className="p-2">
        {employees.length > 0 && (
          <form className="flex items-center gap-4" onSubmit={handleSearch}>
            <Input
              type="search"
              className="w-[40%]"
              placeholder="Search by name,email,phone number"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <Button type="button" onClick={() => setSearchInput("")}>
              Get all rows
            </Button>
          </form>
        )}
      </div>
      {employees.length === 0 && (
        <p className="text-center py-8">Nothing here!</p>
      )}
      {employees.length > 0 && (
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
              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(
              (searchInput.trim().length > 0 &&
                employees.filter((emp) => {
                  let searchStr = `${emp.name} ${emp.email} ${emp.phoneNumber}`;
                  return searchStr.includes(searchInput);
                })) ||
              employees
            ).map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.level}</TableCell>
                <TableCell>{employee.managerId}</TableCell>
                <TableCell>{employee.team}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {employee.level === levels.L4 && (
                        <DropdownMenuItem
                          onClick={() => handleDelete(employee.id)}
                          className="px-0 w-full"
                        >
                          <Button className="w-full" variant="destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}
                        >
                          <DialogTrigger
                            asChild
                            onClick={() => handleUpdate(employee.id)}
                          >
                            <Button className="w-full">
                              <Pencil className="h-4 w-4 mr-2" /> Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <UpdateForm
                              employeeData={employeeData}
                              handleCloseDialog={handleCloseDialog}
                            />
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default EmployeesTable;
