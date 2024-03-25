import { Label } from "@radix-ui/react-label";
import React from "react";
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

const HeadOfDepartmentForm = () => {
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

      <Button type="submit">Add Head</Button>
    </div>
  );
};

export default HeadOfDepartmentForm;
