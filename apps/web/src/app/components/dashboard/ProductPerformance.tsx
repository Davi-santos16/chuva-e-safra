"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CardBox from "../shared/CardBox";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react/dist/iconify.js";

const priorityStyles: Record<string, string> = {
  Low: "bg-secondary text-secondary-foreground",
  Medium: "bg-warning-soft text-foreground",
  High: "bg-destructive-soft text-destructive",
  Critical: "bg-destructive text-destructive-foreground",
};

const priorityIcons: Record<string, string> = {
  Low: "tabler:info-circle",
  Medium: "tabler:clock",
  High: "tabler:alert-triangle",
  Critical: "tabler:alert-octagon",
};

export const ProductPerformance = () => {
  const PerformersData = [
    {
      key: "performerData1",
      username: "Sunil Joshi",
      designation: "Web Designer",
      project: "Elite Admin",
      priority: "Low",
      budget: "3.9k"
    },
    {
      key: "performerData2",
      username: "Andrew McDownland",
      designation: "Project Manager",
      project: "Real Homes WP Theme",
      priority: "Medium",
      budget: "24.5k"
    },
    {
      key: "performerData3",
      username: "Christopher Jamil",
      designation: "Project Manager",
      project: "MedicalPro WP Theme",
      priority: "High",
      budget: "12.8k"
    },
    {
      key: "performerData4",
      username: "Nirav Joshi",
      designation: "Frontend Engineer",
      project: "Hosting Press HTML",
      priority: "Critical",
      budget: "4.8k"
    },
    {
      key: "performerData5",
      username: "Micheal Doe",
      designation: "Content Writer",
      project: "Helping Hands WP Theme",
      priority: "Low",
      budget: "9.3k"
    },
  ]
  return (
    <CardBox>
      <div id="product" className="mb-6">
        <div>
          <h5 className="card-title">Product Performance</h5>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm font-semibold">Id</TableHead>
                    <TableHead className="text-sm font-semibold">Assigned</TableHead>
                    <TableHead className="text-sm font-semibold">Name</TableHead>
                    <TableHead className="text-sm font-semibold">Priority</TableHead>
                    <TableHead className="text-sm font-semibold">Budget</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {PerformersData.map((item, index) => (
                    <TableRow key={item.key} className="border-b border-border hover:bg-primary/5">
                      <TableCell>
                        <p className="text-muted-foreground font-medium text-sm tabular-nums">{index + 1}</p>
                      </TableCell>

                      <TableCell className="ps-0 min-w-[200px]">
                        <div>
                          <h6 className="text-sm font-semibold mb-1">{item.username}</h6>
                          <p className="text-xs font-medium text-muted-foreground">{item.designation}</p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="text-muted-foreground font-medium text-sm">
                          {item.project}
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`gap-1.5 border-0 px-3 py-1 text-[13px] ${priorityStyles[item.priority]}`}
                        >
                          <Icon icon={priorityIcons[item.priority]} aria-hidden="true" />
                          {item.priority}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <p className="text-foreground text-[15px] font-medium tabular-nums">
                          {item.budget}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </CardBox>

  )
}
