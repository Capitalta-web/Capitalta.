09:53:30.513 Running build in Washington, D.C., USA (East) – iad1
09:53:30.513 Build machine configuration: 4 cores, 8 GB
09:53:30.612 Cloning github.com/abalderas10/ui_capitalta (Branch: main, Commit: f50d2ba)
09:53:36.162 Warning: Failed to fetch one or more git submodules
09:53:36.162 Cloning completed: 5.550s
09:53:36.665 Restored build cache from previous deployment (DZnN7K5fmgstYUgEH1h9j7EXdAcd)
09:53:37.146 Running "vercel build"
09:53:38.494 Vercel CLI 50.11.0
09:53:39.749 yarn config v1.22.19
09:53:39.785 success Set "enableGlobalCache" to "false".
09:53:39.785 Done in 0.04s.
09:53:39.796 Installing dependencies...
09:53:39.968 yarn install v1.22.19
09:53:40.032 [1/4] Resolving packages...
09:53:50.316 warning jest > jest-cli > jest-config > glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
09:53:50.316 warning jest > @jest/core > @jest/reporters > glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
09:53:50.317 warning jest > @jest/core > jest-runtime > glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
09:53:50.706 warning jest > @jest/core > @jest/transform > babel-plugin-istanbul > test-exclude > glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
09:53:51.052 warning jest > @jest/core > @jest/transform > babel-plugin-istanbul > test-exclude > glob > inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
09:53:51.276 warning jest-environment-jsdom > jsdom > whatwg-encoding@3.1.1: Use @exodus/bytes instead for a more spec-conformant and faster implementation
09:53:51.336 warning jest-environment-jsdom > jsdom > html-encoding-sniffer > whatwg-encoding@3.1.1: Use @exodus/bytes instead for a more spec-conformant and faster implementation
09:53:51.688 [2/4] Fetching packages...
09:54:34.825 [3/4] Linking dependencies...
09:54:34.827 warning " > @livekit/components-react@2.9.19" has unmet peer dependency "tslib@^2.6.2".
09:54:34.828 warning "@livekit/components-react > @livekit/components-core@0.12.12" has unmet peer dependency "tslib@^2.6.2".
09:54:34.828 warning " > @mui/icons-material@7.3.7" has incorrect peer dependency "@mui/material@^7.3.7".
09:54:34.829 warning "@mui/material > @types/react-transition-group@4.4.12" has unmet peer dependency "@types/react@*".
09:54:34.829 warning " > livekit-client@2.17.1" has unmet peer dependency "@types/dom-mediacapture-record@^1".
09:54:34.830 warning " > slick-carousel@1.8.1" has unmet peer dependency "jquery@>=1.8.0".
09:54:34.832 warning "eslint-config-next > typescript-eslint@8.54.0" has unmet peer dependency "typescript@>=4.8.4 <6.0.0".
09:54:34.832 warning "eslint-config-next > typescript-eslint > @typescript-eslint/utils@8.54.0" has unmet peer dependency "typescript@>=4.8.4 <6.0.0".
09:54:34.832 warning "eslint-config-next > typescript-eslint > @typescript-eslint/parser@8.54.0" has unmet peer dependency "typescript@>=4.8.4 <6.0.0".
09:54:34.833 warning "eslint-config-next > typescript-eslint > @typescript-eslint/eslint-plugin@8.54.0" has unmet peer dependency "typescript@>=4.8.4 <6.0.0".
09:54:34.833 warning "eslint-config-next > typescript-eslint > @typescript-eslint/typescript-estree@8.54.0" has unmet peer dependency "typescript@>=4.8.4 <6.0.0".
09:54:34.833 warning "eslint-config-next > typescript-eslint > @typescript-eslint/eslint-plugin > ts-api-utils@2.4.0" has unmet peer dependency "typescript@>=4.8.4".
09:54:34.833 warning "eslint-config-next > typescript-eslint > @typescript-eslint/typescript-estree > @typescript-eslint/project-service@8.54.0" has unmet peer dependency "typescript@>=4.8.4 <6.0.0".
09:54:34.833 warning "eslint-config-next > typescript-eslint > @typescript-eslint/typescript-estree > @typescript-eslint/tsconfig-utils@8.54.0" has unmet peer dependency "typescript@>=4.8.4 <6.0.0".
09:54:34.833 warning "eslint-config-next > typescript-eslint > @typescript-eslint/eslint-plugin > @typescript-eslint/type-utils@8.54.0" has unmet peer dependency "typescript@>=4.8.4 <6.0.0".
09:54:34.869 warning Workspaces can only be enabled in private projects.
09:54:34.878 warning Workspaces can only be enabled in private projects.
09:54:59.574 [4/4] Building fresh packages...
09:55:00.390 success Saved lockfile.
09:55:00.394 Done in 80.43s.
09:55:00.532 Detected Next.js version: 16.1.1
09:55:00.536 Running "yarn run build"
09:55:00.721 yarn run v1.22.19
09:55:00.751 $ next build
09:55:01.679 ▲ Next.js 16.1.1 (Turbopack)
09:55:01.679 
09:55:01.686 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
09:55:01.754   Creating an optimized production build ...
09:56:11.766 
09:56:11.767 > Build error occurred
09:56:11.772 Error: Turbopack build failed with 10 errors:
09:56:11.772 ./src/components/third-party/SimpleBar.jsx:10:1
09:56:11.772 Module not found: Can't resolve 'react-device-detect'
09:56:11.772 [0m [90m  8 |[39m [90m// @third-party[39m
09:56:11.772  [90m  9 |[39m [36mimport[39m [33mMainSimpleBar[39m [36mfrom[39m [32m'simplebar-react'[39m[33m;[39m
09:56:11.772 [31m[1m>[22m[39m[90m 10 |[39m [36mimport[39m { [33mBrowserView[39m[33m,[39m [33mMobileView[39m } [36mfrom[39m [32m'react-device-detect'[39m[33m;[39m
09:56:11.773  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.773  [90m 11 |[39m
09:56:11.773  [90m 12 |[39m [90m// @project[39m
09:56:11.773  [90m 13 |[39m [36mimport[39m { [33mThemeDirection[39m } [36mfrom[39m [32m'@/config'[39m[33m;[39m[0m
09:56:11.773 
09:56:11.773 
09:56:11.773 
09:56:11.773 Import traces:
09:56:11.773   Client Component Browser:
09:56:11.773     ./src/components/third-party/SimpleBar.jsx [Client Component Browser]
09:56:11.773     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component Browser]
09:56:11.773     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component Browser]
09:56:11.773     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.773     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.773     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.773 
09:56:11.773   Client Component SSR:
09:56:11.773     ./src/components/third-party/SimpleBar.jsx [Client Component SSR]
09:56:11.773     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component SSR]
09:56:11.773     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component SSR]
09:56:11.774     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.774     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.774     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.774 
09:56:11.774 https://nextjs.org/docs/messages/module-not-found
09:56:11.774 
09:56:11.774 
09:56:11.774 ./src/components/Breadcrumbs.jsx:15:1
09:56:11.774 Module not found: Can't resolve 'react-intl'
09:56:11.774 [0m [90m 13 |[39m
09:56:11.774  [90m 14 |[39m [90m// @third-party[39m
09:56:11.774 [31m[1m>[22m[39m[90m 15 |[39m [36mimport[39m { [33mFormattedMessage[39m } [36mfrom[39m [32m'react-intl'[39m[33m;[39m
09:56:11.774  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.774  [90m 16 |[39m
09:56:11.775  [90m 17 |[39m [90m// @project[39m
09:56:11.775  [90m 18 |[39m [36mimport[39m { [33mAPP_DEFAULT_PATH[39m } [36mfrom[39m [32m'@/config'[39m[33m;[39m[0m
09:56:11.775 
09:56:11.775 
09:56:11.776 
09:56:11.776 Import traces:
09:56:11.776   Client Component Browser:
09:56:11.776     ./src/components/Breadcrumbs.jsx [Client Component Browser]
09:56:11.776     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.776     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.776     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.776 
09:56:11.776   Client Component SSR:
09:56:11.776     ./src/components/Breadcrumbs.jsx [Client Component SSR]
09:56:11.776     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.776     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.777     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.777 
09:56:11.777 https://nextjs.org/docs/messages/module-not-found
09:56:11.777 
09:56:11.777 
09:56:11.777 ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavCollapse.jsx:31:1
09:56:11.777 Module not found: Can't resolve 'react-intl'
09:56:11.777 [0m [90m 29 |[39m
09:56:11.777  [90m 30 |[39m [90m// @third-party[39m
09:56:11.777 [31m[1m>[22m[39m[90m 31 |[39m [36mimport[39m { [33mFormattedMessage[39m } [36mfrom[39m [32m'react-intl'[39m[33m;[39m
09:56:11.777  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.778  [90m 32 |[39m
09:56:11.778  [90m 33 |[39m [90m// @assets[39m
09:56:11.778  [90m 34 |[39m [36mimport[39m { [33mIconChevronRight[39m } [36mfrom[39m [32m'@tabler/icons-react'[39m[33m;[39m[0m
09:56:11.778 
09:56:11.778 
09:56:11.778 
09:56:11.778 Import traces:
09:56:11.778   Client Component Browser:
09:56:11.778     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavCollapse.jsx [Client Component Browser]
09:56:11.778     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavGroup.jsx [Client Component Browser]
09:56:11.779     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/index.jsx [Client Component Browser]
09:56:11.779     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component Browser]
09:56:11.779     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component Browser]
09:56:11.779     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.779     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.779     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.779 
09:56:11.779   Client Component SSR:
09:56:11.779     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavCollapse.jsx [Client Component SSR]
09:56:11.779     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavGroup.jsx [Client Component SSR]
09:56:11.779     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/index.jsx [Client Component SSR]
09:56:11.779     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component SSR]
09:56:11.779     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component SSR]
09:56:11.779     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.779     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.779     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.779 
09:56:11.779 https://nextjs.org/docs/messages/module-not-found
09:56:11.779 
09:56:11.779 
09:56:11.779 ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavItem.jsx:22:1
09:56:11.779 Module not found: Can't resolve 'react-intl'
09:56:11.779 [0m [90m 20 |[39m
09:56:11.780  [90m 21 |[39m [90m// @third-party[39m
09:56:11.780 [31m[1m>[22m[39m[90m 22 |[39m [36mimport[39m { [33mFormattedMessage[39m } [36mfrom[39m [32m'react-intl'[39m[33m;[39m
09:56:11.780  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.780  [90m 23 |[39m
09:56:11.780  [90m 24 |[39m [90m/***************************  MINI DRAWER - ITEM  ***************************/[39m
09:56:11.782  [90m 25 |[39m[0m
09:56:11.782 
09:56:11.782 
09:56:11.782 
09:56:11.782 Import traces:
09:56:11.782   Client Component Browser:
09:56:11.782     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavItem.jsx [Client Component Browser]
09:56:11.783     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavGroup.jsx [Client Component Browser]
09:56:11.783     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/index.jsx [Client Component Browser]
09:56:11.783     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component Browser]
09:56:11.783     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component Browser]
09:56:11.783     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.783     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.783     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.783 
09:56:11.783   Client Component SSR:
09:56:11.783     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavItem.jsx [Client Component SSR]
09:56:11.783     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavGroup.jsx [Client Component SSR]
09:56:11.783     ./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/index.jsx [Client Component SSR]
09:56:11.783     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component SSR]
09:56:11.783     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component SSR]
09:56:11.783     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.783     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.783     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.783 
09:56:11.783 https://nextjs.org/docs/messages/module-not-found
09:56:11.783 
09:56:11.783 
09:56:11.783 ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavCollapse.jsx:24:1
09:56:11.783 Module not found: Can't resolve 'react-intl'
09:56:11.783 [0m [90m 22 |[39m
09:56:11.783  [90m 23 |[39m [90m// @third-party[39m
09:56:11.783 [31m[1m>[22m[39m[90m 24 |[39m [36mimport[39m { [33mFormattedMessage[39m } [36mfrom[39m [32m'react-intl'[39m[33m;[39m
09:56:11.784  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.784  [90m 25 |[39m
09:56:11.784  [90m 26 |[39m [90m// @assets[39m
09:56:11.784  [90m 27 |[39m [36mimport[39m { [33mIconChevronDown[39m[33m,[39m [33mIconChevronUp[39m } [36mfrom[39m [32m'@tabler/icons-react'[39m[33m;[39m[0m
09:56:11.784 
09:56:11.784 
09:56:11.784 
09:56:11.784 Import traces:
09:56:11.784   Client Component Browser:
09:56:11.784     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavCollapse.jsx [Client Component Browser]
09:56:11.784     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavGroup.jsx [Client Component Browser]
09:56:11.784     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/index.jsx [Client Component Browser]
09:56:11.784     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component Browser]
09:56:11.784     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component Browser]
09:56:11.784     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.784     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.784     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.784 
09:56:11.784   Client Component SSR:
09:56:11.785     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavCollapse.jsx [Client Component SSR]
09:56:11.785     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavGroup.jsx [Client Component SSR]
09:56:11.785     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/index.jsx [Client Component SSR]
09:56:11.785     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component SSR]
09:56:11.785     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component SSR]
09:56:11.785     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.785     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.785     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.785 
09:56:11.785 https://nextjs.org/docs/messages/module-not-found
09:56:11.785 
09:56:11.785 
09:56:11.785 ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavGroup.jsx:12:1
09:56:11.785 Module not found: Can't resolve 'react-intl'
09:56:11.785 [0m [90m 10 |[39m
09:56:11.785  [90m 11 |[39m [90m// @third-party[39m
09:56:11.785 [31m[1m>[22m[39m[90m 12 |[39m [36mimport[39m { [33mFormattedMessage[39m } [36mfrom[39m [32m'react-intl'[39m[33m;[39m
09:56:11.785  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.786  [90m 13 |[39m
09:56:11.786  [90m 14 |[39m [90m/***************************  RESPONSIVE DRAWER - GROUP  ***************************/[39m
09:56:11.786  [90m 15 |[39m[0m
09:56:11.786 
09:56:11.786 
09:56:11.786 
09:56:11.786 Import traces:
09:56:11.786   Client Component Browser:
09:56:11.786     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavGroup.jsx [Client Component Browser]
09:56:11.786     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/index.jsx [Client Component Browser]
09:56:11.786     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component Browser]
09:56:11.786     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component Browser]
09:56:11.786     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.787     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.787     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.787 
09:56:11.787   Client Component SSR:
09:56:11.787     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavGroup.jsx [Client Component SSR]
09:56:11.787     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/index.jsx [Client Component SSR]
09:56:11.787     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component SSR]
09:56:11.787     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component SSR]
09:56:11.787     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.788     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.788     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.788 
09:56:11.788 https://nextjs.org/docs/messages/module-not-found
09:56:11.788 
09:56:11.788 
09:56:11.788 ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavItem.jsx:21:1
09:56:11.788 Module not found: Can't resolve 'react-intl'
09:56:11.788 [0m [90m 19 |[39m
09:56:11.788  [90m 20 |[39m [90m// @third-party[39m
09:56:11.788 [31m[1m>[22m[39m[90m 21 |[39m [36mimport[39m { [33mFormattedMessage[39m } [36mfrom[39m [32m'react-intl'[39m[33m;[39m
09:56:11.788  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.788  [90m 22 |[39m
09:56:11.788  [90m 23 |[39m [90m/***************************  RESPONSIVE DRAWER - ITEM  ***************************/[39m
09:56:11.788  [90m 24 |[39m[0m
09:56:11.788 
09:56:11.788 
09:56:11.788 
09:56:11.788 Import traces:
09:56:11.788   Client Component Browser:
09:56:11.788     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavItem.jsx [Client Component Browser]
09:56:11.788     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavGroup.jsx [Client Component Browser]
09:56:11.788     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/index.jsx [Client Component Browser]
09:56:11.789     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component Browser]
09:56:11.789     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component Browser]
09:56:11.789     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.789     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.789     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.789 
09:56:11.789   Client Component SSR:
09:56:11.789     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavItem.jsx [Client Component SSR]
09:56:11.789     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavGroup.jsx [Client Component SSR]
09:56:11.789     ./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/index.jsx [Client Component SSR]
09:56:11.789     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component SSR]
09:56:11.789     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component SSR]
09:56:11.789     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.789     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.789     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.789 
09:56:11.789 https://nextjs.org/docs/messages/module-not-found
09:56:11.789 
09:56:11.789 
09:56:11.790 ./src/components/third-party/SimpleBar.jsx:9:1
09:56:11.790 Module not found: Can't resolve 'simplebar-react'
09:56:11.790 [0m [90m  7 |[39m
09:56:11.790  [90m  8 |[39m [90m// @third-party[39m
09:56:11.790 [31m[1m>[22m[39m[90m  9 |[39m [36mimport[39m [33mMainSimpleBar[39m [36mfrom[39m [32m'simplebar-react'[39m[33m;[39m
09:56:11.790  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.790  [90m 10 |[39m [36mimport[39m { [33mBrowserView[39m[33m,[39m [33mMobileView[39m } [36mfrom[39m [32m'react-device-detect'[39m[33m;[39m
09:56:11.790  [90m 11 |[39m
09:56:11.790  [90m 12 |[39m [90m// @project[39m[0m
09:56:11.790 
09:56:11.790 
09:56:11.790 
09:56:11.790 Import traces:
09:56:11.790   Client Component Browser:
09:56:11.790     ./src/components/third-party/SimpleBar.jsx [Client Component Browser]
09:56:11.790     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component Browser]
09:56:11.790     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component Browser]
09:56:11.790     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.790     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.790     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.790 
09:56:11.790   Client Component SSR:
09:56:11.790     ./src/components/third-party/SimpleBar.jsx [Client Component SSR]
09:56:11.791     ./src/layouts/AdminLayout/Drawer/DrawerContent/index.jsx [Client Component SSR]
09:56:11.791     ./src/layouts/AdminLayout/Drawer/index.jsx [Client Component SSR]
09:56:11.791     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.791     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.791     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.791 
09:56:11.791 https://nextjs.org/docs/messages/module-not-found
09:56:11.791 
09:56:11.791 
09:56:11.791 ./src/states/breadcrumbs.js:7:1
09:56:11.791 Module not found: Can't resolve 'swr'
09:56:11.791 [0m [90m  5 |[39m
09:56:11.791  [90m  6 |[39m [90m// @third-party[39m
09:56:11.792 [31m[1m>[22m[39m[90m  7 |[39m [36mimport[39m useSWR[33m,[39m { mutate } [36mfrom[39m [32m'swr'[39m[33m;[39m
09:56:11.792  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.792  [90m  8 |[39m
09:56:11.792  [90m  9 |[39m [36mconst[39m initialState [33m=[39m {
09:56:11.792  [90m 10 |[39m   activePath[33m:[39m [32m''[39m[33m,[39m[0m
09:56:11.792 
09:56:11.792 
09:56:11.793 
09:56:11.793 Import traces:
09:56:11.793   Client Component Browser:
09:56:11.793     ./src/states/breadcrumbs.js [Client Component Browser]
09:56:11.793     ./src/components/Breadcrumbs.jsx [Client Component Browser]
09:56:11.793     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.793     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.793     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.793 
09:56:11.793   Client Component SSR:
09:56:11.793     ./src/states/breadcrumbs.js [Client Component SSR]
09:56:11.793     ./src/components/Breadcrumbs.jsx [Client Component SSR]
09:56:11.793     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.793     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.793     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.793 
09:56:11.793 https://nextjs.org/docs/messages/module-not-found
09:56:11.793 
09:56:11.793 
09:56:11.793 ./src/states/menu.js:4:1
09:56:11.793 Module not found: Can't resolve 'swr'
09:56:11.793 [0m [90m 2 |[39m
09:56:11.794  [90m 3 |[39m [90m// @third-party[39m
09:56:11.794 [31m[1m>[22m[39m[90m 4 |[39m [36mimport[39m useSWR[33m,[39m { mutate } [36mfrom[39m [32m'swr'[39m[33m;[39m
09:56:11.794  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
09:56:11.794  [90m 5 |[39m
09:56:11.794  [90m 6 |[39m [36mconst[39m initialState [33m=[39m {
09:56:11.794  [90m 7 |[39m   openedItem[33m:[39m [32m''[39m[33m,[39m[0m
09:56:11.794 
09:56:11.794 
09:56:11.794 
09:56:11.794 Import traces:
09:56:11.794   Client Component Browser:
09:56:11.794     ./src/states/menu.js [Client Component Browser]
09:56:11.794     ./src/layouts/AdminLayout/index.jsx [Client Component Browser]
09:56:11.794     ./src/app/dashboard/layout.jsx [Client Component Browser]
09:56:11.794     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.794 
09:56:11.794   Client Component SSR:
09:56:11.794     ./src/states/menu.js [Client Component SSR]
09:56:11.794     ./src/layouts/AdminLayout/index.jsx [Client Component SSR]
09:56:11.794     ./src/app/dashboard/layout.jsx [Client Component SSR]
09:56:11.794     ./src/app/dashboard/layout.jsx [Server Component]
09:56:11.794 
09:56:11.794 https://nextjs.org/docs/messages/module-not-found
09:56:11.794 
09:56:11.794 
09:56:11.794     at <unknown> (./src/components/third-party/SimpleBar.jsx:10:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/components/Breadcrumbs.jsx:15:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavCollapse.jsx:31:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/layouts/AdminLayout/Drawer/DrawerContent/MiniDrawer/NavItem.jsx:22:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavCollapse.jsx:24:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavGroup.jsx:12:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/layouts/AdminLayout/Drawer/DrawerContent/ResponsiveDrawer/NavItem.jsx:21:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/components/third-party/SimpleBar.jsx:9:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/states/breadcrumbs.js:7:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.795     at <unknown> (./src/states/menu.js:4:1)
09:56:11.795     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
09:56:11.993 error Command failed with exit code 1.
09:56:11.993 info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
09:56:12.020 Error: Command "yarn run build" exited with 1
