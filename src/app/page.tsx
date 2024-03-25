import EmployeeTree from "@/components/EmployeeTree";
import EmployeesTable from "@/components/EmployeesTable";
import Form from "@/components/Form";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="p-6 flex flex-col items-center gap-6">
      <Form />
      <EmployeesTable />
      <EmployeeTree />
    </main>
  );
}
