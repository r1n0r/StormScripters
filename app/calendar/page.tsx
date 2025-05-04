"use client";
import { EventCalendar } from "@/components/event-calendar";
import { Toaster } from "@/components/ui/toaster";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4">University Events Calendar</h1>
          <p className="text-lg text-muted-foreground mb-8">
            May 4th is our only Open Day this month - Join us for a campus tour and meet our faculty!
          </p>
          <div className="bg-card rounded-lg shadow-lg p-6">
            <EventCalendar />
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
} 