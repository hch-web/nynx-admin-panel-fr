/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';

// PAGES
const DisputeHistory = lazy(() => import('containers/pages/disputeHistory'));
// const DisputeHistoryDetail = lazy(() => import('containers/pages/disputeHistoryDetail'));
const SuperUsers = lazy(() => import('containers/pages/superUsers'));
const Freelancer = lazy(() => import('containers/pages/freelancers'));
const Analytics = lazy(() => import('containers/pages/analytics'));
const Attribute = lazy(() => import('containers/pages/attribute'));
const AttributeDetail = lazy(() => import('containers/pages/attributeDetail'));
const Skills = lazy(() => import('containers/pages/skills'));
const SkillDetail = lazy(() => import('containers/pages/skillDetail'));
const SocialMedia = lazy(() => import('containers/pages/socialMedia'));
const SocialDetail = lazy(() => import('containers/pages/socialMediaDetail'));
const Features = lazy(() => import('containers/pages/features'));
const FeatureDetail = lazy(() => import('containers/pages/featureDetail'));
const Chat = lazy(() => import('containers/pages/chat/index'));
const Client = lazy(() => import('containers/pages/clients'));
const JobPostingTabPanel = lazy(() => import('containers/pages/jobPostingTabPanel'));
const JobDetail = lazy(() => import('containers/pages/jobDetail'));
const GigDetails = lazy(() => import('containers/pages/gigDetail'));
const Category = lazy(() => import('containers/pages/category'));
const CategoryDetail = lazy(() => import('containers/pages/categoryDetail'));
const SubCategories = lazy(() => import('containers/pages/subCategory'));
const SubCategoryDetail = lazy(() => import('containers/pages/subCategoryDetail'));
const UserDetail = lazy(() => import('containers/pages/userDetail/userDetailTabs'));
const Gigs = lazy(() => import('containers/pages/gigs'));
const Workspaces = lazy(() => import('containers/pages/workspaces'));
const WorkspacesDetail = lazy(() => import('containers/pages/workspacesDetail'));
const TaskDetails = lazy(() => import('containers/pages/taskDetail'));
const TicketAndSupport = lazy(() => import('containers/pages/ticket&Support'));
const LoginPage = lazy(() => import('containers/pages/login'));
const SuperUserDetail = lazy(() => import('containers/pages/superUserDetail'));
const TicketDetails = lazy(() => import('containers/pages/ticket&Support/components/TicketDetails'));
const ForgotPassword = lazy(() => import('containers/pages/forgotPassword'));
const ResetPassword = lazy(() => import('containers/pages/resetPassword'));
const DashboardDefault = lazy(() => import('containers/pages/dashboard'));
const PartialRefundDetails = lazy(() =>
  import('containers/pages/ticket&Support/components/PartialRefundDetails')
);
const RefundToClientDetails = lazy(() =>
  import('containers/pages/ticket&Support/components/RefundToClientDetails')
);
const RefundToClientHistory = lazy(() => import('containers/pages/fullRefundToClientHistory'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/">
            <Route path="auth" element={<PublicRoutes />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route index element={<DashboardDefault />} />
              <Route path="chat" element={<Chat />} />

              <Route path="profile/:id" element={<SuperUserDetail />} />

              {/* SUPER ADMIN ROUTES */}
              <Route path="/" element={<AdminRoutes />}>
                <Route path="/super-users" element={<SuperUsers />} />
                <Route path="history" element={<DisputeHistory />} />
                <Route path="full-refund-history" element={<RefundToClientHistory />} />
                <Route path="transaction-details/:id" element={<PartialRefundDetails />} />
                {/* <Route path="history/:id" element={<DisputeHistoryDetail />} /> */}

                <Route path="categories" element={<Category />} />
                <Route path="attributes" element={<Attribute />} />
                <Route path="attribute/:id" element={<AttributeDetail />} />
                <Route path="features" element={<Features />} />
                <Route path="features/:subId" element={<Features />} />
                <Route path="feature/:id" element={<FeatureDetail />} />
                <Route path="features/:subId/:id" element={<FeatureDetail />} />
                <Route path="social-media" element={<SocialMedia />} />
                <Route path="social-media/:id" element={<SocialDetail />} />
                <Route path="category/:id" element={<CategoryDetail />} />
                <Route path="category/:id/subcategory" element={<SubCategories />} />
                <Route path="category/:id/subcategory/:subId" element={<SubCategoryDetail />} />
                <Route path="super-users" element={<SuperUsers />} />
                <Route path="freelancers" element={<Freelancer />} />
                <Route path="clients" element={<Client />} />
                <Route path="jobs" element={<JobPostingTabPanel />} />
                <Route path="skills" element={<Skills />} />
                <Route path="skill/:id" element={<SkillDetail />} />
                <Route path="job/:id" element={<JobDetail />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="client/:id" element={<UserDetail />} />
                <Route path="freelancer/:id" element={<UserDetail />} />
                <Route path="freelancer/:id/gig/:gigId" element={<GigDetails />} />
                <Route path="super-user/add" element={<SuperUserDetail />} />
                <Route path="gigs" element={<Gigs />} />
                <Route path="workspaces" element={<Workspaces />} />
                <Route path="workspace/:id" element={<WorkspacesDetail />} />
                <Route path="refund-to-client-details/:id" element={<RefundToClientDetails />} />
                <Route path="workspace/:id/task/:taskId/:taskVia" element={<TaskDetails />} />
                <Route path="request" element={<Outlet />}>
                  <Route index element={<TicketAndSupport />} />
                  <Route path=":id" element={<TicketDetails />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
