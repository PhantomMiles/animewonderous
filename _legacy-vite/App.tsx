import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import CommunityPage from './pages/CommunityPage';
import CommunityDetailsPage from './pages/CommunityDetailsPage';
import ForumPage from './pages/ForumPage';
import AccountPage from './pages/AccountPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import CartPage from './pages/CartPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductDetailsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/:communityId" element={<CommunityDetailsPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/settings" element={<AccountSettingsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
