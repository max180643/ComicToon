import ContentWithSidebarLayout from '../components/layout/ContentWithSidebarLayout'
import AllBook from '../components/layout/AllBook'

const home = () => {
  return (
    <ContentWithSidebarLayout title="การ์ตูนมาใหม่">
      <AllBook />
    </ContentWithSidebarLayout>
  )
}

export default home
