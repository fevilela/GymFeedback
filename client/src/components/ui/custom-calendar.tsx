import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  isWithinInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface CustomCalendarProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
}

export function CustomCalendar({
  date,
  setDate,
  className,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);

  const days = React.useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handleDateClick = (day: Date) => {
    if (!date?.from || (date.from && date.to)) {
      // Start new range
      setDate({ from: day, to: undefined });
    } else {
      // Complete range
      if (day < date.from) {
        setDate({ from: day, to: date.from });
      } else {
        setDate({ ...date, to: day });
      }
    }
  };

  const isInRange = (day: Date) => {
    if (!date?.from || !date?.to) return false;
    return isWithinInterval(day, { start: date.from, end: date.to });
  };

  const isRangeStart = (day: Date) => date?.from && isSameDay(day, date.from);
  const isRangeEnd = (day: Date) => date?.to && isSameDay(day, date.to);

  const getDayClass = (day: Date) => {
    const isSelected = isRangeStart(day) || isRangeEnd(day);
    const inRange = isInRange(day);
    const isHovered =
      hoverDate &&
      date?.from &&
      !date.to &&
      day > date.from &&
      day <= hoverDate;

    // Check if day is within hover range
    const inHoverRange =
      date?.from &&
      !date.to &&
      hoverDate &&
      ((day >= date.from && day <= hoverDate) ||
        (day <= date.from && day >= hoverDate));

    return cn(
      "h-9 w-9 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center text-sm transition-all duration-200 relative z-10",
      !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50",
      isSelected &&
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full shadow-lg scale-110",
      (inRange || inHoverRange) &&
        !isSelected &&
        "bg-primary/20 text-foreground rounded-none first:rounded-l-full last:rounded-r-full",
      isSameDay(day, new Date()) &&
        !isSelected &&
        "text-primary font-bold border border-primary/50 rounded-full"
    );
  };

  return (
    <div
      className={cn(
        "p-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl w-[340px]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent border-white/10 hover:bg-white/5"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-heading font-semibold text-lg capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent border-white/10 hover:bg-white/5"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
          <div
            key={i}
            className="text-center text-xs text-muted-foreground font-medium py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => handleDateClick(day)}
            onMouseEnter={() => setHoverDate(day)}
            onMouseLeave={() => setHoverDate(null)}
            className={getDayClass(day)}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center pt-4 border-t border-white/10">
        <div className="text-xs text-muted-foreground">
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd/MM", { locale: ptBR })} -{" "}
                {format(date.to, "dd/MM", { locale: ptBR })}
              </>
            ) : (
              format(date.from, "dd/MM/yyyy", { locale: ptBR })
            )
          ) : (
            "Selecione um período"
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7 px-2"
          onClick={() => setDate(undefined)}
        >
          Limpar
        </Button>
      </div>
    </div>
  );
}

export function CalendarDateRangePicker({
  date,
  setDate,
  className,
}: CustomCalendarProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal bg-card/50 border-white/10 hover:bg-card/80",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ptBR })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: ptBR })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CustomCalendar date={date} setDate={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
