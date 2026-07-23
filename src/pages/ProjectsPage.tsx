import { PageHero } from '@/components/shared/PageHero'
import { Portfolio } from '@/components/sections/Portfolio'

export function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="[ Dự án ]"
        title="180+ dự án đã bàn giao từ 2012"
        sub="Hơn một thập kỷ phát triển phần mềm cho khách hàng tại Việt Nam, Anh, Pháp và Singapore. Dưới đây là các dự án tiêu biểu cùng nhận xét nguyên văn từ khách hàng."
      />
      <Portfolio showHeading={false} />
    </>
  )
}
