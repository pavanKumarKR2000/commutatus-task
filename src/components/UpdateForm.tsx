"use client";
import { getSuperior, levels } from "@/lib/utils";
import { EmployeeProps, useEmployee } from "@/zustand/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { OctagonAlert } from "lucide-react";

interface UpdateFormProps {
  employeeData: EmployeeProps;
  handleCloseDialog: () => void;
}

const UpdateForm = ({
  employeeData: { id, name, phoneNumber, email, managerId, team, level },
  handleCloseDialog,
}: UpdateFormProps) => {
  const superiors = useEmployee((store) => store.getEmployeesByLevel);
  const getEmployeeById = useEmployee((store) => store.getEmployeeById);
  const updateEmployee = useEmployee((store) => store.updateEmployee);
  const getAllTeams = useEmployee((store) => store.getAllTeams);
  const [type, setType] = useState(level);
  const [teamErrorMessage, setTeamErrorMessage] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    employeeName: name,
    phoneNumber,
    email,
    managerId,
    team,
    level,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateEmployee({
      id,
      name: employeeData.employeeName.trim(),
      phoneNumber: employeeData.phoneNumber.trim(),
      email: employeeData.email.trim(),
      level: type,
      managerId: employeeData.managerId,
      team: employeeData.team,
    });

    setEmployeeData({
      employeeName: "",
      phoneNumber: "",
      email: "",
      managerId: "",
      team: "",
      level: "",
    });

    handleCloseDialog();
  };

  const checkTeamExists = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (
      getAllTeams().includes(value) &&
      type === levels.L3 &&
      getEmployeeById(id).team !== value
    ) {
      setTeamErrorMessage(true);
    } else {
      setTeamErrorMessage(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="">
        <Label htmlFor="">Type</Label>
        <Select defaultValue={level} onValueChange={(type) => setType(type)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select the team" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={levels.L1} disabled>
                L1 (CEO)
              </SelectItem>

              <SelectItem value={levels.L2} disabled>
                L2 (Department head)
              </SelectItem>

              <SelectItem value={levels.L3} disabled>
                L3 (Team lead)
              </SelectItem>

              <SelectItem value={levels.L4} disabled>
                L4 (Team member)
              </SelectItem>
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
                value={employeeData?.team || " "}
                placeholder="Enter team"
                onChange={(e) => {
                  setEmployeeData((prev) => {
                    return { ...prev, team: e.target.value };
                  });
                  checkTeamExists(e);
                }}
                id="email"
                required
              />
              {teamErrorMessage && (
                <p className="w-full text-center p-1 bg-red-200 flex items-center rounded-md">
                  <OctagonAlert className="h-4 w-4 mr-2" /> Team name already
                  exists
                </p>
              )}
            </div>
          )}

          {/** row-5 */}
          {(type === levels.L3 || type === levels.L4 || type === levels.L2) && (
            <div className="space-y-1">
              <Label htmlFor="">Select superior</Label>
              <Select
                defaultValue={getEmployeeById(managerId!).id}
                onValueChange={(e) =>
                  setEmployeeData((prev) => {
                    return { ...prev, managerId: e };
                  })
                }
                required
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
                value={
                  (employeeData.managerId &&
                    (getEmployeeById((employeeData?.managerId as string) || "")
                      .team as string)) ||
                  ""
                }
                disabled
                id="email"
                required
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 py-8">
          <Button type="submit" disabled={teamErrorMessage}>
            Update Item
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
