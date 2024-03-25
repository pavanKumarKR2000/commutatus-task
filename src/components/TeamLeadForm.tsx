import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const TeamLeadForm = () => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          id="name"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="name">Team name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter team name"
          id="team name"
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
        <Label htmlFor="">Select Superior</Label>
        <Select defaultValue="head 1">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select the team" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="head 1">head 1</SelectItem>
              <SelectItem value="head 2">head 2</SelectItem>
              <SelectItem value="head 3">head 3</SelectItem>
              <SelectItem value="head 4">head 4</SelectItem>
              <SelectItem value="head 5">head 5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Team</Button>
    </div>
  );
};

export default TeamLeadForm;
