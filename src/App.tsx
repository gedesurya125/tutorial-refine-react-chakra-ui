import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

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
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "blog_posts",
              list: "/blog-posts",
              show: "/blog-posts/show/:id",
              create: "/blog-posts/create",
              edit: "/blog-posts/edit/:id",
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
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="blog_posts" />}
              />
              <Route path="blog-posts">
                <Route index element={<ChakraUIInferencer />} />
                <Route path="show/:id" element={<ChakraUIInferencer />} />
                <Route path="edit/:id" element={<ChakraUIInferencer />} />
                <Route path="create" element={<ChakraUIInferencer />} />
              </Route>

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
