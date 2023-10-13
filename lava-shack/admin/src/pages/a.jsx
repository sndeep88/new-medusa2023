import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useHotkeys } from "react-hotkeys-hook"
import { Route, Routes, useNavigate } from "react-router-dom"
import { WRITE_KEY } from "../components/constants/analytics"
import { lazy, Suspense } from "react"

import Spinner from "../components/atoms/spinner"

const PrivateRoute = lazy(() => import("../components/private-route"))
const SEO = lazy(() => import("../components/seo"))
const Layout = lazy(() => import("../components/templates/layout"))
const AnalyticsProvider = lazy(() => import("../context/analytics"))
const Collections = lazy(() => import("../domain/collections"))
const Customers = lazy(() => import("../domain/customers"))
const Discounts = lazy(() => import("../domain/discounts"))
const GiftCards = lazy(() => import("../domain/gift-cards"))
const Inventory = lazy(() => import("../domain/inventory"))
const Oauth = lazy(() => import("../domain/oauth"))
const Orders = lazy(() => import("../domain/orders"))
const DraftOrders = lazy(() => import("../domain/orders/draft-orders"))
const Pricing = lazy(() => import("../domain/pricing"))
const ProductsRoute = lazy(() => import("../domain/products"))
const PublishableApiKeys = lazy(() => import("../domain/publishable-api-keys"))
const SalesChannels = lazy(() => import("../domain/sales-channels"))
const Settings = lazy(() => import("../domain/settings"))
const Page = lazy(() => import("../domain/page"))
const Template = lazy(() => import("../domain/templates"))

const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center bg-grey-5 text-grey-90">
    <Spinner variant="secondary" />
  </div>
)

const IndexPage = () => {
  const navigate = useNavigate()
  useHotkeys("g + o", () => navigate("/a/orders"))
  useHotkeys("g + p", () => navigate("/a/products"))

  return (
    <PrivateRoute>
      <Suspense fallback={<Loading />}>
        <DashboardRoutes />
      </Suspense>
    </PrivateRoute>
  )
}

const DashboardRoutes = () => {
  return (
    <AnalyticsProvider writeKey={WRITE_KEY}>
      <DndProvider backend={HTML5Backend}>
        <Layout>
          <SEO title="Medusa" />
          <Routes className="h-full">
            <Route path="oauth/:app_name" element={<Oauth />} />
            <Route path="products/*" element={<ProductsRoute />} />
            <Route path="collections/*" element={<Collections />} />
            <Route path="gift-cards/*" element={<GiftCards />} />
            <Route path="orders/*" element={<Orders />} />
            <Route path="draft-orders/*" element={<DraftOrders />} />
            <Route path="discounts/*" element={<Discounts />} />
            <Route path="customers/*" element={<Customers />} />
            <Route path="pricing/*" element={<Pricing />} />
            <Route path="pages/*" element={<Page />} />
            <Route path="templates/*" element={<Template />} />
            <Route path="settings/*" element={<Settings />} />
            <Route path="sales-channels/*" element={<SalesChannels />} />
            <Route
              path="publishable-api-keys/*"
              element={<PublishableApiKeys />}
            />
            <Route path="inventory/*" element={<Inventory />} />
          </Routes>
        </Layout>
      </DndProvider>
    </AnalyticsProvider>
  )
}

export default IndexPage
