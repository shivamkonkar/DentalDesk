"use client";

import React from "react";

import { useState, useRef} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  CalendarIcon,
  List,
} from "lucide-react";
import { AddNewPatient } from "@/components/patient/AddPatientDialog";


export default function DentalCRMDashboard() {
  const [currentView, setCurrentView] = useState("Day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mobileView, setMobileView] = useState<"appointments" | "calendar">(
    "appointments"
  ); // Mobile view state
  const containerRef = useRef<HTMLDivElement>(null);
  const [calendarSize, setCalendarSize] = useState("normal");

  // Sample appointments data
  const todaysAppointments = [
    {
      time: "9:00 AM - 9:30 AM",
      patient: "Aarav Sharma",
      reason: "Annual Check-up & Cleaning",
    },
    {
      time: "10:00 AM - 10:45 AM",
      patient: "Priya Patel",
      reason: "Root Canal Treatment",
    },
    {
      time: "11:30 AM - 12:00 PM",
      patient: "Rajesh Kumar",
      reason: "Dental Filling",
    },
    {
      time: "2:00 PM - 2:30 PM",
      patient: "Sneha Gupta",
      reason: "Routine Cleaning",
    },
    {
      time: "3:15 PM - 4:00 PM",
      patient: "Vikram Singh",
      reason: "Crown Placement",
    },
    {
      time: "4:30 PM - 5:00 PM",
      patient: "Anita Desai",
      reason: "Consultation",
    },
  ];

  // Calendar appointments for visual display
  const calendarAppointments = [
    { time: "9:00", duration: 30, patient: "Aarav Sharma", top: 60 },
    { time: "10:00", duration: 45, patient: "Priya Patel", top: 120 },
    { time: "11:30", duration: 30, patient: "Rajesh Kumar", top: 210 },
    { time: "14:00", duration: 30, patient: "Sneha Gupta", top: 360 },
    { time: "15:15", duration: 45, patient: "Vikram Singh", top: 435 },
    { time: "16:30", duration: 30, patient: "Anita Desai", top: 510 },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateMobile = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-base md:text-lg font-semibold text-gray-900 truncate">
            <span className="hidden sm:inline">SmileCare Dental Clinic | </span>
            DentalDesk
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 md:h-10 md:w-10 rounded-full"
              >
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-sm">
                    DS
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className="cursor-pointer">
                Profile Info
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile View Toggle */}
      <div className="md:hidden border-b border-slate-200 px-4 py-3">
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={mobileView === "appointments" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMobileView("appointments")}
            className={`flex-1 ${
              mobileView === "appointments"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <List className="w-4 h-4 mr-2" />
            Appointments
          </Button>
          <Button
            variant={mobileView === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMobileView("calendar")}
            className={`flex-1 ${
              mobileView === "calendar"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Desktop Layout */}
        <div
          ref={containerRef}
          className="hidden md:flex h-[calc(100vh-73px)] relative"
        >
          {/* Left Column - Quick Actions & Summary */}
          <div className="border-r border-slate-200 p-6 space-y-6 overflow-hidden">
            {/* Quick Actions */}
            <div className="space-y-3">
              <AddNewPatient />

              <Button
                variant="outline"
                className="w-full h-11 border-slate-200 text-gray-700 hover:bg-gray-50"
              >
                <Users className="w-4 h-4 mr-2" />
                Patient Management
              </Button>
            </div>

            {/* Today's Appointments Card */}
            <Card className="border-slate-200 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Today&apos;s Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {todaysAppointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="border-l-3 border-l-blue-600 pl-4 py-2"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.time}
                      </div>
                      <div className="text-base font-semibold text-gray-800 mt-1">
                        {appointment.patient}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {appointment.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Calendar */}
          <div className="p-6 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {formatDate(currentDate)}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateDate("prev")}
                      className="border-slate-200 hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToToday}
                      className="border-slate-200 hover:bg-gray-50"
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateDate("next")}
                      className="border-slate-200 hover:bg-gray-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* View Controls */}
                <div className="flex items-center space-x-4">
                  {/* Calendar Size Controls */}
                  <div className="hidden lg:flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Size:</span>
                    <div className="flex items-center space-x-1 border border-slate-200 rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCalendarSize("compact")}
                        className={
                          calendarSize === "compact" ? "bg-gray-100" : ""
                        }
                      >
                        S
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCalendarSize("normal")}
                        className={
                          calendarSize === "normal" ? "bg-gray-100" : ""
                        }
                      >
                        M
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCalendarSize("large")}
                        className={
                          calendarSize === "large" ? "bg-gray-100" : ""
                        }
                      >
                        L
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 border border-slate-200 rounded-lg p-1">
                    {["Day", "Week", "Month"].map((view) => (
                      <Button
                        key={view}
                        variant={currentView === view ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentView(view)}
                        className={
                          currentView === view
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }
                      >
                        {view}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <Card className="flex-1 border-slate-200 shadow-none">
                <CardContent className="p-0 h-full">
                  <div className="relative h-full">
                    {/* Time Column */}
                    <div className="absolute left-0 top-0 w-20 h-full border-r border-slate-200">
                      {hours.map((hour) => (
                        <div
                          key={hour}
                          className={`border-b border-slate-100 flex items-start justify-end pr-3 pt-1 ${
                            calendarSize === "compact"
                              ? "h-12"
                              : calendarSize === "large"
                              ? "h-20"
                              : "h-16"
                          }`}
                        >
                          <span className="text-sm text-gray-500 font-medium">
                            {hour === 12
                              ? "12 PM"
                              : hour > 12
                              ? `${hour - 12} PM`
                              : `${hour} AM`}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Calendar Content */}
                    <div className="ml-20 relative h-full">
                      {/* Hour Grid Lines */}
                      {hours.map((hour, index) => (
                        <div
                          key={hour}
                          className={`absolute w-full border-b border-slate-100 ${
                            calendarSize === "compact"
                              ? "h-12"
                              : calendarSize === "large"
                              ? "h-20"
                              : "h-16"
                          }`}
                          style={{
                            top: `${
                              index *
                              (calendarSize === "compact"
                                ? 48
                                : calendarSize === "large"
                                ? 80
                                : 64)
                            }px`,
                          }}
                        />
                      ))}

                      {/* Appointment Blocks */}
                      {calendarAppointments.map((appointment, index) => (
                        <div
                          key={index}
                          className="absolute left-2 right-2 bg-blue-100 border border-blue-200 rounded-md p-2 z-10"
                          style={{
                            top: `${
                              appointment.top *
                              (calendarSize === "compact"
                                ? 0.75
                                : calendarSize === "large"
                                ? 1.25
                                : 1)
                            }px`,
                            height: `${
                              (appointment.duration / 60) *
                              (calendarSize === "compact"
                                ? 48
                                : calendarSize === "large"
                                ? 80
                                : 64)
                            }px`,
                            minHeight: "32px",
                          }}
                        >
                          <div className="text-sm font-medium text-blue-800 truncate">
                            {appointment.patient}
                          </div>
                          <div className="text-xs text-blue-600 mt-1">
                            {appointment.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Mobile Appointments View */}
          {mobileView === "appointments" && (
            <div className="p-4 space-y-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <AddNewPatient />
                <Button
                  variant="outline"
                  className="h-11 border-slate-200 text-gray-700 hover:bg-gray-50"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Patients
                </Button>
              </div>

              {/* Today's Appointments */}
              <Card className="border-slate-200 shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Today&apos;s Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {todaysAppointments.map((appointment, index) => (
                      <div
                        key={index}
                        className="border-l-3 border-l-blue-600 pl-4 py-3 bg-gray-50 rounded-r-lg"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.time}
                        </div>
                        <div className="text-base font-semibold text-gray-800 mt-1">
                          {appointment.patient}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {appointment.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Mobile Calendar View */}
          {mobileView === "calendar" && (
            <div className="p-4">
              {/* Mobile Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {formatDateMobile(currentDate)}
                  </h2>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateDate("prev")}
                      className="border-slate-200 hover:bg-gray-50 h-8 w-8 p-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToToday}
                      className="border-slate-200 hover:bg-gray-50 text-xs px-2"
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateDate("next")}
                      className="border-slate-200 hover:bg-gray-50 h-8 w-8 p-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Mobile View Controls */}
                <div className="flex items-center space-x-1 border border-slate-200 rounded-lg p-1">
                  {["Day", "Week"].map((view) => (
                    <Button
                      key={view}
                      variant={currentView === view ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentView(view)}
                      className={`text-xs px-2 ${
                        currentView === view
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {view}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mobile Calendar Grid */}
              <Card className="border-slate-200 shadow-none">
                <CardContent className="p-0">
                  <div className="relative" style={{ height: "500px" }}>
                    {/* Mobile Time Column */}
                    <div className="absolute left-0 top-0 w-16 h-full border-r border-slate-200">
                      {hours.map((hour) => (
                        <div
                          key={hour}
                          className="h-12 border-b border-slate-100 flex items-start justify-end pr-2 pt-1"
                        >
                          <span className="text-xs text-gray-500 font-medium">
                            {hour === 12
                              ? "12P"
                              : hour > 12
                              ? `${hour - 12}P`
                              : `${hour}A`}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Calendar Content */}
                    <div className="ml-16 relative h-full">
                      {/* Mobile Hour Grid Lines */}
                      {hours.map((hour, index) => (
                        <div
                          key={hour}
                          className="absolute w-full h-12 border-b border-slate-100"
                          style={{ top: `${index * 48}px` }}
                        />
                      ))}

                      {/* Mobile Appointment Blocks */}
                      {calendarAppointments.map((appointment, index) => (
                        <div
                          key={index}
                          className="absolute left-1 right-1 bg-blue-100 border border-blue-200 rounded-md p-1 z-10"
                          style={{
                            top: `${appointment.top * 0.6}px`,
                            height: `${Math.max(
                              (appointment.duration / 60) * 48 * 0.6,
                              24
                            )}px`,
                          }}
                        >
                          <div className="text-xs font-medium text-blue-800 truncate">
                            {appointment.patient}
                          </div>
                          <div className="text-xs text-blue-600">
                            {appointment.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
