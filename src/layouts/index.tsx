/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import SettingsContextProvider from '@/context/SettingsContext';
import { useSettings } from '@/hooks';
import '@/i18n/i18n.js';
import { LocaleProvider } from '@douyinfe/semi-ui';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'umi';
import './index.css';

export default function Layout() {
  return (
    <LocaleProvider locale={en_US}>
      <SettingsContextProvider>
        <RestoreScroll />
        <ThemedPage>
          <Outlet />
        </ThemedPage>
      </SettingsContextProvider>
    </LocaleProvider>
  );
}

function ThemedPage({ children }: any) {
  const { setSettings } = useSettings();

  useLayoutEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setSettings((prev) => ({ ...prev, mode: 'dark' }));
      const body = document.body;
      if (body.hasAttribute('theme-mode')) {
        body.setAttribute('theme-mode', 'dark');
      }
    } else {
      setSettings((prev) => ({ ...prev, mode: 'light' }));
      const body = document.body;
      if (body.hasAttribute('theme-mode')) {
        body.setAttribute('theme-mode', 'light');
      }
    }
  }, [setSettings]);

  return children;
}

function RestoreScroll() {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);
  return null;
}
