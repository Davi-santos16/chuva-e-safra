import { Icon } from "@iconify/react";

const TicketFilter = ({ tickets, setFilter, filter }: any) => {
    
  const pendingC = tickets?.filter((t: { Status: string }) => t.Status === "Pending").length;
  const openC = tickets?.filter((t: { Status: string }) => t.Status === "Open").length;
  const closeC = tickets?.filter((t: { Status: string }) => t.Status === "Closed").length;

  return (
    <div className="grid grid-cols-12 gap-6">
      <button
        type="button"
        className={`lg:col-span-3 md:col-span-6 col-span-12 min-h-11 p-6 bg-secondary text-center rounded-lg border border-interactive/20 transition-colors hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${filter === "total_tickets" ? "ring-2 ring-interactive/40" : ""}`}
        onClick={() => setFilter("total_tickets")}
        aria-pressed={filter === "total_tickets"}
      >
        <Icon icon="tabler:ticket" className="mx-auto mb-2 h-5 w-5 text-interactive" aria-hidden="true" />
        <h3 className="text-interactive text-2xl tabular-nums">{tickets.length}</h3>
        <h6 className="text-base text-interactive">Total Tickets</h6>
      </button>
      <button
        type="button"
        className={`lg:col-span-3 md:col-span-6 col-span-12 min-h-11 p-6 bg-warning-soft text-center rounded-lg border border-warning/25 transition-colors hover:bg-warning/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${filter === "Pending" ? "ring-2 ring-warning/50" : ""}`}
        onClick={() => setFilter("Pending")}
        aria-pressed={filter === "Pending"}
      >
        <Icon icon="tabler:clock" className="mx-auto mb-2 h-5 w-5 text-warning" aria-hidden="true" />
        <h3 className="text-foreground text-2xl tabular-nums">{pendingC}</h3>
        <h6 className="text-base text-foreground">Pending Tickets</h6>
      </button>
      <button
        type="button"
        className={`lg:col-span-3 md:col-span-6 col-span-12 min-h-11 p-6 bg-success-soft text-center rounded-lg border border-success/20 transition-colors hover:bg-success/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${filter === "Open" ? "ring-2 ring-success/40" : ""}`}
        onClick={() => setFilter("Open")}
        aria-pressed={filter === "Open"}
      >
        <Icon icon="tabler:circle-check" className="mx-auto mb-2 h-5 w-5 text-success" aria-hidden="true" />
        <h3 className="text-success text-2xl tabular-nums">{openC}</h3>
        <h6 className="text-base text-success">Open Tickets</h6>
      </button>
      <button
        type="button"
        className={`lg:col-span-3 md:col-span-6 col-span-12 min-h-11 p-6 bg-destructive-soft text-center rounded-lg border border-destructive/20 transition-colors hover:bg-destructive/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${filter === "Closed" ? "ring-2 ring-destructive/40" : ""}`}
        onClick={() => setFilter("Closed")}
        aria-pressed={filter === "Closed"}
      >
        <Icon icon="tabler:circle-x" className="mx-auto mb-2 h-5 w-5 text-destructive" aria-hidden="true" />
        <h3 className="text-destructive text-2xl tabular-nums">{closeC}</h3>
        <h6 className="text-base text-destructive">Closed Tickets</h6>
      </button>
    </div>
  );
};

export default TicketFilter;
