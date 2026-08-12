import SalesOverview from '@/app/components/dashboard/SalesOverview'
import { YearlyBreakup } from '@/app/components/dashboard/YearlyBreakup'
import { MonthlyEarning } from '@/app/components/dashboard/MonthlyEarning'
import { RecentTransaction } from '@/app/components/dashboard/RecentTransaction'
import { ProductPerformance } from '@/app/components/dashboard/ProductPerformance'

export default function ProducerDashboardPage() {
  return <div className='grid grid-cols-12 gap-6'><div className='col-span-12 lg:col-span-8'><SalesOverview /></div><div className='col-span-12 lg:col-span-4'><div className='grid grid-cols-12 gap-6'><div className='col-span-12'><YearlyBreakup /></div><div className='col-span-12'><MonthlyEarning /></div></div></div><div className='col-span-12 lg:col-span-4'><RecentTransaction /></div><div className='col-span-12 flex lg:col-span-8'><ProductPerformance /></div></div>
}
