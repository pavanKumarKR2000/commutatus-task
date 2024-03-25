"use client";
import { FormEvent, useState } from "react";
import CeoForm from "./CeoForm";
import HeadOfDepartmentForm from "./HeadOfDepartmentForm";
import TeamLeadForm from "./TeamLeadForm";
import TeamMemberForm from "./TeamMemberForm";
import { Label } from "./ui/label";
import { v4 as uuidv4 } from "uuid";
import { getSuperior } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEmployee } from "@/zustand/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { levels } from "@/lib/utils";

const Form = () => {
  const addEmployee = useEmployee((store) => store.addEmployee);
  const employees = useEmployee((store) => store.employees);
  const superiors = useEmployee((store) => store.getEmployeesByLevel);
  const [type, setType] = useState(levels.L4);
  const [defaultSuperior, setDefaultSuperior] = useState(
    superiors(getSuperior.get(type) as string)[0]?.id
  );
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    phoneNumber: "",
    email: "",
    managerId: "",
    team: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEmployee(
      uuidv4(),
      employeeData.employeeName,
      employeeData.phoneNumber,
      employeeData.email,
      type,
      employeeData.managerId,
      employeeData.team
    );

    setEmployeeData({
      employeeName: "",
      phoneNumber: "",
      email: "",
      managerId: "",
      team: "",
    });
  };

  return (
    <form className="space-y-6 w-[50%]" onSubmit={handleSubmit}>
      <div className="">
        <Label htmlFor="">Select type</Label>
        <Select
          defaultValue={levels.L4}
          onValueChange={(type) => setType(type)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select the team" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={levels.L1}>L1 (CEO)</SelectItem>
              <SelectItem value={levels.L2}>L2 (Department head)</SelectItem>
              <SelectItem value={levels.L3}> L3 (Team lead)</SelectItem>
              <SelectItem value={levels.L4}> L4 (Team member)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/** row-1 */}
          <div className="space-y-1">
            <Label htmlFor="employeeName">Employee Name</Label>
            <Input
              type="text"
              name="employee name"
              value={employeeData.employeeName}
              placeholder="Enter employee name"
              onChange={(e) =>
                setEmployeeData((prev) => {
                  return { ...prev, employeeName: e.target.value };
                })
              }
              id="employeeName"
              required
            />
          </div>
          {/** row-2 */}
          <div className="space-y-1">
            <Label htmlFor="phone_number">Phone number</Label>
            <Input
              type="text"
              name="phone number"
              value={employeeData.phoneNumber}
              placeholder="Enter phone number"
              onChange={(e) =>
                setEmployeeData((prev) => {
                  return { ...prev, phoneNumber: e.target.value };
                })
              }
              id="phone_number"
              required
            />
          </div>
          {/** row-3 */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={employeeData.email}
              placeholder="Enter email"
              onChange={(e) =>
                setEmployeeData((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
              id="email"
              required
            />
          </div>
          {/** row-4 */}
          {type === levels.L3 && (
            <div className="space-y-1">
              <Label htmlFor="email">Team</Label>
              <Input
                type="text"
                name="team"
                value={employeeData.team}
                placeholder="Enter team"
                onChange={(e) =>
                  setEmployeeData((prev) => {
                    return { ...prev, team: e.target.value };
                  })
                }
                id="email"
                required
              />
            </div>
          )}

          {/** row-5 */}
          {(type === levels.L3 || type === levels.L4 || type === levels.L2) && (
            <div className="space-y-1">
              <Label htmlFor="">Select superior</Label>
              <Select
                defaultValue={defaultSuperior}
                onValueChange={(e) =>
                  setEmployeeData((prev) => {
                    return { ...prev, managerId: e };
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the superior" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {superiors(getSuperior.get(type) as string).map((sup) => (
                      <SelectItem value={sup.id} key={sup.id}>
                        {sup.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {/** row-6 */}
          {type === levels.L4 && (
            <div className="space-y-1">
              <Label htmlFor="email">team</Label>
              <Input
                type="text"
                name="team"
                value={""}
                disabled
                id="email"
                required
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 py-8">
          <Button
            type="button"
            onClick={() => {
              console.table(employees);
              console.table(superiors(getSuperior.get(type) as string));
            }}
          >
            print
          </Button>
          <Button type="submit">Add Item</Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
