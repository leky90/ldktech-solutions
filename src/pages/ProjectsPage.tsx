import { PageHero } from '@/components/shared/PageHero'
import { Portfolio } from '@/components/sections/Portfolio'

export function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="[ Dự án ]"
        title="180+ dự án đã bàn giao từ 2012"
        sub="4.9/5★ với 125+ đánh giá trên Freelancer.com, 60 dự án trên vLance. Dưới đây là các dự án tiêu biểu và nhận xét nguyên văn của khách hàng."
      />
      <Portfolio showHeading={false} />
    </>
  )
}
