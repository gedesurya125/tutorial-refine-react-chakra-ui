import {
  Authenticated,
  GitHubBanner,
  Refine,
  WelcomePage,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  AuthPage,
} from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";
import { BlogPostList } from "./components/blogPost/BlogPostList";
import { BlogPostEdit } from "./components/blogPost/BlogPostedit";
import { BlogPostShow } from "./components/blogPost/BlogPostShow";
import { BlogPostCreate } from "./components/blogPost/BlogPostCreate";
import { authProvider, axiosInstance } from "./authProvider";

function App() {
  return (
    <ChakraProvider theme={RefineThemes.Blue}>
      {/* <RefineKbarProvider> */}
      {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
      <BrowserRouter>
        {/* <DevtoolsProvider> */}
        <Refine
          notificationProvider={notificationProvider()}
          routerProvider={routerBindings}
          dataProvider={dataProvider(
            "https://api.fake-rest.refine.dev",
            axiosInstance
          )}
          authProvider={authProvider}
          resources={[
            {
              name: "blog_posts",
              list: "/blog-posts",
              show: "/blog-posts/show/:id",
              create: "/blog-posts/create",
              edit: "/blog-posts/edit/:id",
              meta: {
                canDelete: true,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            // useNewQueryKeys: true,
            // projectId: "BWL7f6-B5c0Me-VMaOj2",
          }}
        >
          <Routes>
            {/* //? MAIN PAGE */}
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="blog_posts" />}
              />
              <Route path="blog-posts">
                <Route index element={<BlogPostList />} />
                <Route path="show/:id" element={<BlogPostShow />} />
                <Route path="edit/:id" element={<BlogPostEdit />} />
                <Route path="create" element={<BlogPostCreate />} />
              </Route>
            </Route>

            {/* //? LOGIN PAGE */}
            <Route
              element={
                <Authenticated key="one" fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path="/login" element={<AuthPage type="login" />} />
              <Route path="/register" element={<AuthPage type="register" />} />
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              />
              <Route
                path="/update-password"
                element={<AuthPage type="updatePassword" />}
              />
            </Route>

            {/* //? Error Page */}
            <Route
              element={
                <Authenticated key="two" fallback={<Outlet />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          {/* <RefineKbar /> */}
          <UnsavedChangesNotifier />
          {/* <DocumentTitleHandler /> */}
        </Refine>
        {/* <DevtoolsPanel /> */}
        {/* </DevtoolsProvider> */}
      </BrowserRouter>
      {/* </RefineKbarProvider> */}
    </ChakraProvider>
  );
}

export default App;
