"use client"

import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { format, parseISO } from "date-fns"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { type Event } from "../lib/event-data"

interface EventDetailsProps {
  event: Event
  onClose: () => void
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  const isFullyBooked = event.registered >= event.capacity
  const spotsLeft = event.capacity - event.registered

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{event.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(parseISO(event.date), "EEEE, MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {isFullyBooked
                ? "Fully Booked"
                : `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="mr-2"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              // Handle registration
              console.log("Register for event:", event.id)
            }}
            disabled={isFullyBooked}
          >
            {isFullyBooked ? "Fully Booked" : "Register Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 