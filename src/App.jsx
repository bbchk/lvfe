import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingOverlay from "comps/loading/overlay";

import Header from "comps/layout/header";
const Footer = lazy(() => import("comps/layout/footer/footer.jsx"));

// Lazy load pages
const Home = lazy(() => import("pages/Home"));
const ProductsListing = lazy(() => import("pages/ProductsListing"));
const ProductDetails = lazy(() => import("pages/ProductDetails"));
// const SignIn = lazy(() => import("pages/auth/SignIn"));
// const AboutUs = lazy(() => import("pages/info/AboutUs"));
// const PrivacyPolicy = lazy(() => import("pages/info/PrivacyPolicy"));
// const TermsOfUsage = lazy(() => import("pages/info/TermsOfUsage"));
// const UserProfile = lazy(() => import("pages/user/UserProfile"));
// const WishList = lazy(() => import("pages/user/WishList"));
// const OrdersList = lazy(() => import("pages/user/OrdersList"));
const NotFound = lazy(() => import("comps/layout/404.jsx"));

// const MainOffcanvas = lazy(() => import('comps/modals/main_offcanvas/main_offcanvas.js'));
// const ChangePasswordModal = lazy(() => import('comps/modals/change_password/change_password_modal'));
// const SignInModal = lazy(() => import('comps/modals/auth/sign_in_modal/sign_in_modal'));
// const SignUpModal = lazy(() => import('comps/modals/auth/sign_up_modal/sign_up_modal'));
// const DeleteAccountModal = lazy(() => import('comps/modals/delete_account/delete_account_modal.js'));
const CartModal = lazy(() => import("comps/modals/cart/cart_modal"));
// const WriteReviewModal = lazy(() => import('comps/modals/reviews/write_review_modal'));
// const HotkeysModal = lazy(() => import('comps/modals/hotkeys/hotkeys.modal'));

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
        <Modals />

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

          {/*
          <Route path="/auth/signin" element={<SignIn />} />
          */}

          {/* Products */}
          <Route
            path="/products/:categoryPath/:filtersStr?"
            element={<ProductsListing />}
          />
          <Route
            path="/product/:productSlug/:productId/:activeTab?"
            element={<ProductDetails />}
          />

          {/* User pages
          <Route path="/user/personal_data" element={<UserProfile />} />
          <Route path="/user/wish_list" element={<WishList />} />
          <Route path="/user/orders_list" element={<OrdersList />} />
          */}

          {/* Info pages
          <Route path="/info/about_us" element={<AboutUs />} />
          <Route path="/info/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/info/terms-of-usage" element={<TermsOfUsage />} />
          */}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

function Modals() {
  const {
    signInModalOpen,
    signUpModalOpen,
    changePasswordModalOpen,
    deleteAccountModalOpen,
    cartModalOpen,
    writeReviewModalOpen,
    hotkeysModalOpen,
    mainOffcanvasOpen,
  } = useSelector((state) => state.modals);

  return <Suspense fallback={null}>{cartModalOpen && <CartModal />}</Suspense>;
}

// {mainOffcanvasOpen && <MainOffcanvas />}
// {deleteAccountModalOpen && <DeleteAccountModal />}
// {changePasswordModalOpen && <ChangePasswordModal />}
// {signInModalOpen && <SignInModal />}
// {signUpModalOpen && <SignUpModal />}
// {writeReviewModalOpen && <WriteReviewModal />}
// {hotkeysModalOpen && <HotkeysModal />}

export default App;
