"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  isBefore,
  startOfDay,
} from "date-fns"

import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { EventDetails } from "../components/event-details"
import { cn } from "../lib/utils"
import { events, type Event } from "../lib/event-data"

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Get the first day of the month and the last day of the month
  const firstDayOfMonth = startOfMonth(currentMonth)
  const lastDayOfMonth = endOfMonth(currentMonth)

  // Get all days in the month
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })

  // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Create an array of empty slots for days before the first day of the month
  const emptySlots = Array(firstDayOfWeek).fill(null)

  // Combine empty slots with days in the month
  const allDays = [...emptySlots, ...daysInMonth]

  // Split the days into weeks
  const weeks = []
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7))
  }

  // Get events for the current month
  const currentMonthEvents = events.filter((event) => {
    const eventDate = parseISO(event.date)
    return isSameMonth(eventDate, currentMonth)
  })

  // Function to safely format dates
  const safeFormat = (date: Date, formatStr: string): string => {
    try {
      return format(date, formatStr)
    } catch (e) {
      console.error("Error formatting date:", date)
      return "Invalid date"
    }
  }

  // Check if a date is in the past
  const isPastDate = (date: Date): boolean => {
    return isBefore(startOfDay(date), startOfDay(new Date()))
  }

  // Check if an event is over
  const isEventOver = (date: string): boolean => {
    try {
      return isBefore(parseISO(date), new Date())
    } catch (e) {
      return false
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">{safeFormat(currentMonth, "MMMM yyyy")}</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-7 border-b">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center font-medium">
              {day}
            </div>
          ))}
        </div>
        <div>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 border-b last:border-0">
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <div key={`empty-${weekIndex}-${dayIndex}`} className="h-24 p-1 border-r last:border-r-0" />
                }

                const dayEvents = currentMonthEvents.filter((event) => {
                  try {
                    return isSameDay(parseISO(event.date), day)
                  } catch (e) {
                    return false
                  }
                })

                const isPast = isPastDate(day)

                return (
                  <div
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={cn(
                      "h-24 p-1 border-r last:border-r-0 relative",
                      dayEvents.length > 0 ? "bg-muted/30" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "font-medium text-sm p-1 w-7 h-7 flex items-center justify-center",
                        isSameDay(day, new Date()) && "bg-blue-500 text-white rounded-full",
                        isPast && !isSameDay(day, new Date()) && "text-gray-400",
                      )}
                    >
                      {safeFormat(day, "d")}
                    </div>
                    <div className="space-y-1 mt-1">
                      {dayEvents.map((event) => {
                        const eventOver = isEventOver(event.date)

                        return (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={cn(
                              "w-full text-left text-xs p-1 rounded truncate relative",
                              "hover:bg-primary/10 transition-colors",
                              eventOver && "opacity-70",
                              event.type === "Workshop" &&
                                "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                              event.type === "Webinar" &&
                                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                              event.type === "Open Day" &&
                                "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
                            )}
                          >
                            <div className="flex items-center gap-1">
                              <span>{safeFormat(parseISO(event.date), "h:mm a")}</span>
                              <span className={cn("font-medium", eventOver && "line-through")}>{event.title}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </Card>

      {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  )
} 