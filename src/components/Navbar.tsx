"use client";
import { UserPlus } from "lucide-react";
import Form from "./Form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <nav className="border-b border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-8 p-2">
        <div>
          <h1 className="text-lg font-bold uppercase italic text-center">
            Employee Management System
          </h1>
        </div>
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" /> Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <Form handleCloseDialog={handleCloseDialog} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
