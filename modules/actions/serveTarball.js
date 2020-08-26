import { getTarball } from '../utils/npm.js';

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export default async function serveTarball(req, res) {
  const tarball = await getTarball(
    req.packageName,
    req.packageVersion,
    req.log
  );

  const tags = ['file', 'gz-file'];

  res.set({
    'Content-Type': tarball.headers['content-type'],
    'Content-Length': tarball.headers['content-length'],
    'Cache-Control': 'public, immutable, max-age=31536000', // 1 year
    'Last-Modified': tarball.headers['last-modified'],
    ETag: tarball.headers['etag'],
    'Cache-Tag': tags.join(', ')
  });

  tarball.pipe(res, { end: true });
}
