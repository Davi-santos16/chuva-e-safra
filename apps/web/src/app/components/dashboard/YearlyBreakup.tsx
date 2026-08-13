"use client"
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "../shared/CardBox";
import { useTheme } from "next-themes";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const YearlyBreakup = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const ChartData: any = {
        series: [
            38, 40, 25
        ],
        labels: ["2023", "2025", "2024"],
        chart: {
            type: "donut",
            fontFamily: "inherit",
            foreColor: "var(--muted-foreground)",
            background: "transparent",
            height: 200,
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        theme: {
            mode: isDark ? "dark" : "light",
        },
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                },
            },
        },
        stroke: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },

        legend: {
            show: false,
        },
        colors: ["var(--chart-1)", "var(--chart-3)", "var(--chart-2)"],


        tooltip: {
            theme: isDark ? "dark" : "light",
            fillSeriesColor: false,
            y: {
                formatter: (val: number) => {
                    return `$${val}K`;
                }
            }
        },
    };
    return (
        <>
            <CardBox>
                <div className="grid grid-cols-12 ">
                    <div className="flex flex-col sm:col-span-7 col-span-12">
                        <div>
                            <h5 className="card-title mb-4 lg:whitespace-nowrap">Yearly Breakup</h5>
                            <h4 className="text-xl mb-2 tabular-nums">$36,358</h4>
                            <div className="flex items-center mb-3 gap-2">
                                <span className="rounded-full p-1 bg-success/10 flex items-center justify-center ">
                                    <Icon icon="tabler:arrow-up-left" className="text-success" aria-hidden="true" />
                                </span>
                                <p className="text-foreground mb-0 tabular-nums">+9%</p>
                                <p className="text-muted-foreground mb-0">last year</p>
                            </div>
                        </div>
                        <ul className="flex flex-wrap gap-4 items-center mt-4 text-muted-foreground" aria-label="Yearly Breakup legend">
                            <li className="flex items-center">
                                <Icon icon="tabler:point-filled" className="text-chart-1 text-xl me-1" aria-hidden="true" />
                                <span className="text-xs">2023</span>
                            </li>
                            <li className="flex items-center">
                                <Icon icon="tabler:point-filled" className="text-chart-2 text-xl me-1" aria-hidden="true" />
                                <span className="text-xs">2024</span>
                            </li>
                            <li className="flex items-center">
                                <Icon icon="tabler:point-filled" className="text-chart-3 text-xl me-1" aria-hidden="true" />
                                <span className="text-xs">2025</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:col-span-5 col-span-12 min-w-0">
                        <div
                            className="flex min-w-0 justify-center"
                            role="img"
                            aria-label="Yearly Breakup donut chart: 2023 is 38, 2025 is 40, and 2024 is 25."
                        >
                            <Chart
                                options={ChartData}
                                series={ChartData.series}
                                type="donut"
                                height={200}
                                width={140}
                            />
                        </div>
                    </div>
                </div>

            </CardBox>
        </>
    )
}
export { YearlyBreakup }
