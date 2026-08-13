"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";

const BCrumb = [
  { to: "/", title: "Home" },
  { title: "Forms" },
];

const Page = () => {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [website, setWebsite] = useState("www.chuvaesafra.com.br");
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(website);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <BreadcrumbComp title="Form Elements" items={BCrumb} />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          {/* Default Inputs */}
          <div className="rounded-lg border border-border bg-card md:p-6 p-4">
            <h5 className="card-title">Default Inputs</h5>
            <div className="mt-6 flex flex-col gap-6">
              {/* Basic Input */}
              <div>
                <Label htmlFor="name">Input</Label>
                <Input id="name" type="text" required className="mt-2" />
              </div>

              {/* Input with placeholder */}
              <div>
                <Label htmlFor="firstname">Input with Placeholder</Label>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="Firstname"
                  required
                  className="mt-2"
                />
              </div>

              {/* Select */}
              <div>
                <Label htmlFor="countries">Select Input</Label>
                <Select>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password Input</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  required
                  className="mt-2"
                />
              </div>

              {/* Datepicker */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                  Date of birth
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal hover:bg-transparent focus:border-ring"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <Icon icon="solar:calendar-minimalistic-linear" width={18} height={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time */}
              <div>
                <Label htmlFor="time">Time Picker Input</Label>
                <div className="relative mt-2">
                  <Input
                    id="time"
                    type="time"
                    min="09:00"
                    max="18:00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                  <Icon icon="solar:clock-circle-linear" width="18" height="18" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                </div>
              </div>

              {/* Card Input with Icon */}
              <div>
                <Label htmlFor="card">Card</Label>
                <div className="relative mt-2">
                  <Icon
                    icon="uim:master-card"
                    width="20"
                    height="20"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input id="card" type="text" placeholder="Card number" className="pl-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="rounded-lg border border-border bg-card md:p-6 p-4">
            <h5 className="card-title">Textarea Input</h5>
            <div className="mt-6 flex flex-col gap-6">
              <div>
                <Label htmlFor="comment">Description</Label>
                <Textarea id="comment" placeholder="Leave a comment..." rows={4} />
              </div>

              <div>
                <Label htmlFor="disabled-comment">Description</Label>
                <Textarea id="disabled-comment" placeholder="Disabled" disabled rows={4} />
              </div>

              <div>
                <Label htmlFor="error-comment" className="text-destructive">Description</Label>
                <Textarea
                  id="error-comment"
                  placeholder="Leave a comment..."
                  rows={4}
                  className="border-destructive text-destructive focus-visible:border-destructive"
                  aria-invalid="true"
                />
              </div>
            </div>
          </div>

          {/* Input Colors */}
          <div className="rounded-lg border border-border bg-card md:p-6 p-4">
            <h5 className="card-title">Input Colors</h5>
            <div className="mt-6 flex flex-col gap-6">
              <div>
                <Label htmlFor="warning" className="text-warning">
                  Warning
                </Label>
                <Input id="warning" placeholder="Warning input" variant={"warning"} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="info" className="text-info">
                  Info
                </Label>
                <Input id="info" placeholder="Info input" variant={"info"} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="success" className="text-success">
                  Success
                </Label>
                <Input id="success" placeholder="Success input" variant={"success"} className="mt-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-6">
          {/* Input Group with Icons */}
          <div className="rounded-lg border border-border bg-card md:p-6 p-4">
            <h5 className="card-title">Input Group</h5>
            <div className="mt-6 flex flex-col gap-6">
              <div className="relative">
                <Icon icon="solar:letter-linear" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2" />
                <Input type="email" placeholder="name@example.com" className="pl-10" />
              </div>

              <div className="relative">
                <Icon icon="solar:phone-rounded-linear" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2" />
                <Input type="tel" placeholder="+1" className="pl-10" />
              </div>

              <div className="relative">
                <Icon icon="solar:global-linear" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2" />
                <Input type="text" placeholder="www.example.com" className="pl-10" />
              </div>

              <div className="relative">
                <Icon icon="solar:link-round-angle-linear" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2" />
                <Input type="text" placeholder="www.chuvaesafra.com.br" className="pl-10" />
              </div>

              {/* Copy input */}
              <div>
                <Label htmlFor="website">Website</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCopy}
                    className="rounded-md"
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* File Input */}
          <div className="rounded-lg border border-border bg-card md:p-6 p-4">
            <h5 className="card-title">File Input</h5>
            <Input type="file" className="mt-6" />
          </div>

          {/* Checkbox */}
          <div className="rounded-lg border border-border bg-card md:p-6 p-4">
            <h5 className="card-title">Checkbox</h5>
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Checkbox id="checkbox-default" />
                <Label htmlFor="checkbox-default">Default</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="checkbox-checked" defaultChecked />
                <Label htmlFor="checkbox-checked">Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="checkbox-disabled" disabled />
                <Label htmlFor="checkbox-disabled">Disabled</Label>
              </div>
            </div>
          </div>

          {/* Radio */}
          <div className="rounded-lg border border-border bg-card md:p-6 p-4">
            <h5 className="card-title">Radio Buttons</h5>
            <RadioGroup defaultValue="default" className="mt-6 flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="default" id="radio-default" />
                <Label htmlFor="radio-default">Default</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="selected" id="radio-selected" />
                <Label htmlFor="radio-selected">Selected</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="disabled" id="radio-disabled" disabled />
                <Label htmlFor="radio-disabled">Disabled</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Switch */}
          <div className="rounded-lg border border-border bg-card md:p-6 p-4">
            <h5 className="card-title">Toggle Switch</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Switch id="switch-default" checked={switch1} onCheckedChange={setSwitch1} />
                <Label htmlFor="switch-default">Toggle me</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-checked" checked={switch2} onCheckedChange={setSwitch2} />
                <Label htmlFor="switch-checked">Toggle me (checked)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-disabled" disabled />
                <Label htmlFor="switch-disabled">Disabled</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="switch-disabled-checked" checked disabled />
                <Label htmlFor="switch-disabled-checked">Disabled (checked)</Label>
              </div>
              <Switch checked={switch3} onCheckedChange={setSwitch3} aria-label="Toggle" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
