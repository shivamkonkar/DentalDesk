"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DobPickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function DobPicker({ value, onChange }: DobPickerProps) {
  const [open, setOpen] = React.useState(false);



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-between text-left font-normal"
        >
          {value ? format(value, "PPP") : <span>Select a date</span>}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          captionLayout="dropdown" 

        />
      </PopoverContent>
    </Popover>
  );
}