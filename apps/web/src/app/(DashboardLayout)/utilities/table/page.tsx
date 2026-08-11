"use client"

import { TbDotsVertical } from "react-icons/tb";
import Image from "next/image";
import CardBox from "@/app/components/shared/CardBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const priorityStyles: Record<string, string> = {
  Low: "bg-secondary text-interactive",
  Medium: "bg-warning-soft text-foreground",
  High: "bg-destructive-soft text-destructive",
};

const priorityIcons: Record<string, string> = {
  Low: "tabler:info-circle",
  Medium: "tabler:clock",
  High: "tabler:alert-triangle",
};

const page = () => {

  const PerformersData = [
    {
      key: "performerData1",
      profileImg: "/images/profile/user-3.jpg",
      username: "Sunil Joshi",
      designation: "Web Designer",
      project: "Elite Admin",
      priority: "Low",
      budget: "3.9k"
    },
    {
      key: "performerData2",
      profileImg: "/images/profile/user-5.jpg",
      username: "John Deo",
      designation: "Web Developer",
      project: "Flexy Admin",
      priority: "Medium",
      budget: "24.5k"
    },
    {
      key: "performerData3",
      profileImg: "/images/profile/user-6.jpg",
      username: "Nirav Joshi",
      designation: "Web Manager",
      project: "Material",
      priority: "High",
      budget: "12.8k"
    },
    {
      key: "performerData4",
      profileImg: "/images/profile/user-7.jpg",
      username: "Yuvraj Sheth",
      designation: "Project Manager",
      project: "Xtreme Admin",
      priority: "Low",
      budget: "4.8k"
    },
    {
      key: "performerData5",
      profileImg: "/images/profile/user-8.jpg",
      username: "Micheal Doe",
      designation: "Content Writer",
      project: "Helping Hands WP Theme",
      priority: "High",
      budget: "9.3k"
    },
  ]
  /*Table Action*/
  const tableActionData = [
    {
      icon: "solar:add-circle-outline",
      listtitle: "Add",
    },
    {
      icon: "solar:pen-new-square-broken",
      listtitle: "Edit",
    },
    {
      icon: "solar:trash-bin-minimalistic-outline",
      listtitle: "Delete",
    },
  ];

  const BCrumb = [
    {
      to: "/",
      title: "Home",
    },
    {
      title: "Table",
    },
  ];
  return (
    <>
      <BreadcrumbComp title="Table" items={BCrumb} />
      <CardBox>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-sm font-semibold ps-0">
                        Assigned
                      </TableHead>
                      <TableHead className="text-sm font-semibold">Project</TableHead>
                      <TableHead className="text-sm font-semibold">Priority</TableHead>
                      <TableHead className="text-sm font-semibold"></TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {PerformersData.map((item, index) => (
                      <TableRow key={index} className="border-b border-border hover:bg-primary/5">
                        {/* Assigned */}
                        <TableCell className="ps-0 min-w-[200px]">
                          <div className="flex gap-3 items-center">
                            <Image
                              src={item.profileImg}
                              alt={item.username}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <h6 className="text-sm font-semibold mb-1">
                                {item.username}
                              </h6>
                              <p className="text-xs text-muted-foreground font-medium">
                                {item.designation}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Project */}
                        <TableCell>
                          <p className="text-foreground text-sm font-medium">
                            {item.project}
                          </p>
                        </TableCell>

                        {/* Priority */}
                        <TableCell>
                          <Badge
                            className={`gap-1.5 border-0 text-sm py-1 px-3 ${priorityStyles[item.priority]}`}
                          >
                            <Icon icon={priorityIcons[item.priority]} height={14} aria-hidden="true" />
                            {item.priority}
                          </Badge>
                        </TableCell>

                        {/* Actions Dropdown */}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label={`Open actions for ${item.username}`}>
                                <TbDotsVertical size={22} aria-hidden="true" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              {tableActionData.map((action, idx) => (
                                <DropdownMenuItem
                                  key={idx}
                                  className="flex gap-3 items-center"
                                >
                                  <Icon icon={action.icon} height={18} aria-hidden="true" />
                                  <span>{action.listtitle}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
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
    </>
  )
}

export default page
