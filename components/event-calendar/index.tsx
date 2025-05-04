"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function EventCalendar() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample event dates with their types for the current month
  const eventDates = [
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 4), type: "Open Day", description: "University Open Day - Tour our campus and meet faculty" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 7), type: "Webinar", description: "Study Abroad Opportunities" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 12), type: "Open Day", description: "Department Open House" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 15), type: "Webinar", description: "Career Prospects" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 18), type: "Open Day", description: "Student Life Showcase" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 22), type: "Webinar", description: "Scholarship Opportunities" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 25), type: "Open Day", description: "Research Facilities Tour" },
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 28), type: "Webinar", description: "International Student Support" },
  ];

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const event = eventDates.find(event => event.date.toDateString() === date.toDateString());
    if (event) {
      toast({
        title: event.type,
        description: event.description,
      });
    } else {
      toast({
        title: "Date Selected",
        description: `You selected ${date.toLocaleDateString()}`,
      });
    }
  };

  const renderCalendar = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const event = eventDates.find(
        (event) => event.date.toDateString() === date.toDateString()
      );

      calendarDays.push(
        <div key={day} className="relative group">
          <button
            onClick={() => handleDateClick(date)}
            className={`h-10 w-10 rounded-full hover:bg-primary hover:text-white transition-colors ${
              isSelected ? "bg-primary text-white" : ""
            }`}
          >
            {day}
          </button>
          {event && (
            <>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {event.type}
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="text-center font-semibold py-2">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">
          {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
      </div>
      {renderCalendar()}
      <Card className="p-4 mt-4">
        <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
        <div className="space-y-2">
          {eventDates.map((event, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{event.type}</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
              <Button variant="outline" size="sm">
                Register
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 