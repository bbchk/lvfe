import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingOverlay from "comps/loading/overlay";

// Lazily-loaded components
const CustomHotkeys = lazy(() => import("comps/accessibility/hotkeys.jsx"));
const Header = lazy(() => import("comps/layout/header/header.jsx"));
const Footer = lazy(() => import("comps/layout/footer/footer.jsx"));

// Lazy load pages
const Home = lazy(() => import("pages/Home"));
const ProductsListing = lazy(() => import("pages/ProductsListing"));
const ProductDetails = lazy(() => import("pages/ProductDetails"));
const SignIn = lazy(() => import("pages/auth/SignIn"));
const AboutUs = lazy(() => import("pages/info/AboutUs"));
const PrivacyPolicy = lazy(() => import("pages/info/PrivacyPolicy"));
const TermsOfUsage = lazy(() => import("pages/info/TermsOfUsage"));
const UserProfile = lazy(() => import("pages/user/UserProfile"));
const WishList = lazy(() => import("pages/user/WishList"));
const OrdersList = lazy(() => import("pages/user/OrdersList"));
const NotFound = lazy(() => import("comps/layout/404.jsx"));

// You were using this variable but had it commented out.
const balsamiqSansClass = "balsamiq-sans";

function App() {
  const location = useLocation();

  // Effect to scroll to the top of the page on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return (
    <div className="App">
      {/* A single top-level Suspense for all lazy-loaded components */}
      <Suspense fallback={<LoadingOverlay loading={true} />}>
        <Header />

        <div className={balsamiqSansClass} style={{ minHeight: "100vh" }}>
          <MainContent />
        </div>

        <Footer />
      </Suspense>
    </div>
  );
}

function MainContent() {
  const { loading } = useSelector((state) => state.modals);

  return (
    <>
      <LoadingOverlay loading={loading} />

      {/* Suspense for the routed pages */}
      <Suspense fallback={<LoadingOverlay loading={true} />}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/auth/signin" element={<SignIn />} />

          {/* Products */}
          <Route
            path="/products/:categoryPath/:filtersStr?"
            element={<ProductsListing />}
          />
          <Route
            path="/product/:productSlug/:productId/:activeTab?"
            element={<ProductDetails />}
          />

          {/* User pages */}
          <Route path="/user/personal_data" element={<UserProfile />} />
          <Route path="/user/wish_list" element={<WishList />} />
          <Route path="/user/orders_list" element={<OrdersList />} />

          {/* Info pages */}
          <Route path="/info/about_us" element={<AboutUs />} />
          <Route path="/info/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/info/terms-of-usage" element={<TermsOfUsage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

// Don't forget to export your main App component
// function Modals() {
//   const {
//     signInModalOpen,
//     signUpModalOpen,
//     changePasswordModalOpen,
//     deleteAccountModalOpen,
//     cartModalOpen,
//     writeReviewModalOpen,
//     hotkeysModalOpen,
//     mainOffcanvasOpen,
//   } = useSelector((state) => state.modals);
//
//   return (
//     <Suspense fallback={null}>
//       {mainOffcanvasOpen && <MainOffcanvas />}
//       {deleteAccountModalOpen && <DeleteAccountModal />}
//       {changePasswordModalOpen && <ChangePasswordModal />}
//       {signInModalOpen && <SignInModal />}
//       {signUpModalOpen && <SignUpModal />}
//       {writeReviewModalOpen && <WriteReviewModal />}
//       {cartModalOpen && <CartModal />}
//       {hotkeysModalOpen && <HotkeysModal />}
//     </Suspense>
//   );
// }

export default App;
