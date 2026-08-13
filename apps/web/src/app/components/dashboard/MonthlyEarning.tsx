"use client"
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "../shared/CardBox";
import { useTheme } from "next-themes";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MonthlyEarning = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const ChartData: any = {
        series: [
            {
                name: 'monthly earnings',
                color: "var(--chart-2)",
                data: [25, 66, 20, 40, 19, 58, 20],
            },
        ],
        chart: {
            id: "weekly-stats2",
            type: "area",
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
            fontFamily: "inherit",
            foreColor: "var(--muted-foreground)",
            background: "transparent",
            parentHeightOffset: 0,
        },
        theme: {
            mode: isDark ? "dark" : "light",
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 0,
                inverseColors: false,
                opacityFrom: 0.1,
                opacityTo: 0,
                stops: [20, 180],
            },
        },

        markers: {
            size: 0,
        },
        tooltip: {
            theme: isDark ? "dark" : "light",
            fixed: {
                enabled: true,
                position: "right",
            },
            x: {
                show: false,
            },
            y: {
                formatter: (val: number) => {
                    return `$${val}`;
                }
            }
        },
    };
    return (
        <>
            <CardBox className="p-0! mt-0" >
                <div className="px-6 pt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h5 className="card-title mb-0">Monthly Earnings</h5>
                        <div className="text-primary-foreground bg-primary rounded-full h-11 w-11 flex items-center justify-center">
                            <Icon icon='tabler:currency-dollar' className="text-xl" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-6 mb-4">
                        <div className="lg:col-span-8 md:col-span-8  col-span-8">
                            <h4 className="text-xl mb-3 tabular-nums">$6,820</h4>
                            <div className="flex items-center gap-2">
                                <span className="rounded-full p-1 bg-destructive/10 flex items-center justify-center ">
                                    <Icon icon='tabler:arrow-down-right' className="text-destructive" aria-hidden="true" />
                                </span>
                                <p className="text-foreground mb-0 tabular-nums">+9%</p>
                                <p className="text-muted-foreground mb-0">last year</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    role="img"
                    aria-label="Monthly Earnings trend for seven periods: 25, 66, 20, 40, 19, 58, and 20 dollars."
                    className="min-w-0"
                >
                    <Chart
                        options={ChartData}
                        series={ChartData.series}
                        type="area"
                        height={60}
                        width={"100%"}
                    />
                </div>
            </CardBox>
        </>
    )
}
export { MonthlyEarning }
