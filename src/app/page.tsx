import EmployeeTree from "@/components/EmployeeTree";
import EmployeesTable from "@/components/EmployeesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="p-6 flex flex-col items-center gap-6">
      <Tabs defaultValue="table">
        <TabsList className="flex justify-center md:justify-start items-center gap-4 w-full md:w-fit">
          <TabsTrigger value="table">Table view</TabsTrigger>
          <TabsTrigger value="chart">Chart view</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="w-[90vw]">
          <EmployeesTable />
        </TabsContent>
        <TabsContent value="chart" className="w-[90vw]">
          <EmployeeTree />
        </TabsContent>
      </Tabs>
    </main>
  );
}
