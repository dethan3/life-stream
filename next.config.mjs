import withPWA from 'next-pwa';
import createNextIntlPlugin from 'next-intl/plugin';
import i18nConfig from './i18n.config.js';

const withNextIntl = createNextIntlPlugin(i18nConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
