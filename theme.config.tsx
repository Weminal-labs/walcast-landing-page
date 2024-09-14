import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useConfig, DocsThemeConfig } from 'nextra-theme-docs';
import Link from 'next/link';
import SelectVersion from './components/select-version/SelectVersion';

const config: DocsThemeConfig = {
  head: function useHead() {
    const config = useConfig<{ description?: string; image?: string }>();
    const description = config.frontMatter.description || 'Website description';
    const title = `${config.title} | Walcast`;
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />

        {/* Favicons, meta */}
        {/* Get favicon here from png */}
        {/* https://favicon.io/favicon-converter/#google_vignette */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
        <link rel="manifest" href="/logo/site.webmanifest" />
      </>
    );
  },
  notFound: {
    content: () => {
      return (
        <h1>Not found</h1>
      )
    },
    labels: "Not found 404"
  },
  toc: {
    backToTop: true,
    float: true
  },
  logoLink: false,
  logo: function useRouterLogo() {
    const [selectedVersion, setSelectedVersion] = useState('latest');
    const [renderSelect, setRenderSelect] = useState(true);

    const versionsArr = ['v1.0.1', 'v1.0.2', 'v1.0.3', 'v1.0.4']; // Danh sách các phiên bản có sẵn

    useEffect(() => {
      const pathArray = window.location.pathname.split('/');
      setRenderSelect(pathArray.includes('docs') && pathArray[1] === 'docs');
      const currentVersion = pathArray[pathArray.length - 1];

      if (currentVersion === 'latest') {
        const latestVersion = versionsArr.sort((a, b) => (a > b ? -1 : 1))[0];
        setSelectedVersion(latestVersion);
      } else if (versionsArr.includes(currentVersion)) {
        setSelectedVersion(currentVersion);
      }
    }, [versionsArr]);

    const handleChange = (e) => {
      let version = e.target.value;
      const latestVersion = versionsArr.sort((a, b) => (a > b ? -1 : 1))[0];
      if (version === latestVersion) {
        version = 'latest';
      }
      setSelectedVersion(version);
      if (version) {
        window.location.href = `/docs/${version}`;
      }
    };

    return (
      <div className='flex flex-row'>
        <Link
          href="/"
          className="hidden sm:flex items-center text-current no-underline hover:opacity-75 ltr:mr-auto rtl:ml-auto"
        >
          <Image src="/logo/logo.png" alt="logo" width={45} height={45} />
          <span className="select-none font-bold ltr:ml-2 rtl:mr-2 inline">Walcast</span>
        </Link>

        {
          renderSelect &&
          <select
            value={selectedVersion}
            onChange={handleChange}
            className="bg-gray-100 sm:ms-[80px] py-2 px-4 pe-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          >
            {versionsArr.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        }
      </div>
    );
  },
  darkMode: true,
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1
  },
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',

  footer: {
    component: (
      <footer className="bg-white dark:bg-neutral-900">
        <hr className="dark:nx-border-neutral-800" />

      </footer>
    ),
  },
}

export default config
