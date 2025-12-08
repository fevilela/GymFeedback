"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      formatters={{
        formatWeekdayName: (date) =>
          date.toLocaleString("default", { weekday: "narrow" }),
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-between pt-1 relative items-center px-1",
        caption_label: "text-sm font-medium capitalize",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-white/10 text-white"
        ),
        nav_button_previous: "",
        nav_button_next: "",

        /* importante: mantemos layout de tabela e fixamos largura das colunas */
        table: "w-full table-fixed border-collapse",
        /* cabeçalho: cada th vai se comportar bem dentro de table-fixed */
        head_row: "",
        /* centraliza e garante padding/altura */
        head_cell:
          "text-muted-foreground text-center align-middle py-1 font-medium text-[0.8rem] w-[14.285714%]",
        /* cada linha do corpo tem a mesma largura de 7 colunas */
        row: "mt-2",
        /* cada célula do corpo recebe largura fixa (1/7 = 14.285714%) e centralização */
        cell: "h-9 text-center text-sm p-0 relative w-[14.285714%] align-middle flex items-center justify-center",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 m-auto font-normal aria-selected:opacity-100 rounded-full hover:bg-white/10 text-white"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]",
        day_today: "bg-white/10 text-white",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-red-900/40 aria-selected:text-red-200 rounded-none first:rounded-l-full last:rounded-r-full",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />;
          }
          return <ChevronRight className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
