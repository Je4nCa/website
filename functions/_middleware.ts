/**
 * Runs before every request. Keeps a single address for Google:
 * www.montevostudio.com → montevostudio.com, and *.pages.dev previews
 * are marked noindex so they never compete with the real domain.
 */

const CANONICAL_HOST = 'montevostudio.com';

export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);

  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }

  const response = await next();
  if (url.hostname.endsWith('.pages.dev')) {
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
  return response;
};
