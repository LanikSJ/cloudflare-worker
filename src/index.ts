export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Only handle GET and HEAD requests for the security.txt paths
		if (
			url.pathname === '/.well-known/security.txt' ||
			url.pathname === '/security.txt'
		) {
			if (request.method === 'HEAD') {
				return new Response(null, { headers: securityHeaders() });
			}
			if (request.method !== 'GET') {
				return new Response('Method Not Allowed', { status: 405 });
			}

			const content = buildSecurityTxt(url, env);
			return new Response(content, {
				headers: {
					'Content-Type': 'text/plain; charset=utf-8',
					'Cache-Control': 'max-age=86400',
					...securityHeaders(),
				},
			});
		}

		// Pass through everything else
		try {
			return await fetch(request);
		} catch (err) {
			return new Response('Upstream fetch failed', { status: 502 });
		}
	},
};

function buildSecurityTxt(url: URL, env: Env): string {
	const hostname = url.hostname;
	const contactEmail = env.CONTACT_EMAIL ?? 'admin@lanik.us';
	const policyUrl = env.POLICY_URL ?? 'https://laniksj.github.io';
	const preferredLanguages = env.PREFERRED_LANGUAGES ?? 'en';

	return `#
#  Lanik.us
# 
#  Hey there, curious one.
#  Found something? We want to hear it.
#  Responsible disclosure is always appreciated.
#
#  Full policy: ${policyUrl}
#

Contact: mailto:${contactEmail}
Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('.')[0] + 'Z'}
Canonical: https://${hostname}/.well-known/security.txt
Policy: ${policyUrl}
Preferred-Languages: ${preferredLanguages}
`;
}

function securityHeaders(): Record<string, string> {
	return {
		'X-Content-Type-Options': 'nosniff',
	};
}