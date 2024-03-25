import React, { Dispatch, SetStateAction } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

interface TeamMemberFormProps {
  employeeData: {
    name: string;
    phoneNumber: string;
    email: string;
    managerId: string;
    level: string;
    team: string | null;
  };
  setEmployeeData: Dispatch<
    SetStateAction<{
      name: string;
      phoneNumber: string;
      email: string;
      managerId: string;
      level: string;
      team: string;
    }>
  >;
}

const TeamMemberForm = ({
  employeeData,
  setEmployeeData,
}: TeamMemberFormProps) => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          id="name"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone_number">Phone number</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter phone number"
          id="phone_number"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          id="email"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="">Select superior</Label>
        <Select defaultValue="pavan">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select the team" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pavan">pavan </SelectItem>
              <SelectItem value="banjamin">benjamin</SelectItem>
              <SelectItem value="nick">nick</SelectItem>
              <SelectItem value="david">david</SelectItem>
              <SelectItem value="john">john</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Team member</Button>
    </div>
  );
};

export default TeamMemberForm;
