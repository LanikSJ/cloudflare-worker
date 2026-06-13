import { describe, it, expect } from 'vitest';
import worker from './index';

// Helper to create a minimal env with the required vars
function makeEnv(overrides: Partial<Env> = {}): Env {
	return {
		CONTACT_EMAIL: 'admin@lanik.us',
		POLICY_URL: 'https://laniksj.github.io',
		PREFERRED_LANGUAGES: 'en',
		...overrides,
	} as Env;
}

describe('security.txt worker', () => {
	it('returns security.txt for /.well-known/security.txt', async () => {
		const request = new Request('https://lanik.us/.well-known/security.txt');
		const response = await worker.fetch(request, makeEnv());

		expect(response.status).toBe(200);
		const text = await response.text();
		expect(text).toContain('Contact: mailto:admin@lanik.us');
		expect(text).toContain('Canonical: https://lanik.us/.well-known/security.txt');
		expect(text).toContain('Policy: https://laniksj.github.io');
		expect(text).toContain('Preferred-Languages: en');
		expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
		expect(response.headers.get('Cache-Control')).toBe('max-age=86400');
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
	});

	it('returns security.txt for /security.txt', async () => {
		const request = new Request('https://lanik.us/security.txt');
		const response = await worker.fetch(request, makeEnv());

		expect(response.status).toBe(200);
		const text = await response.text();
		expect(text).toContain('Contact: mailto:admin@lanik.us');
	});

	it('derives Canonical from request hostname', async () => {
		const request = new Request('https://lanik.us.co.uk/.well-known/security.txt');
		const response = await worker.fetch(request, makeEnv());

		const text = await response.text();
		expect(text).toContain('Canonical: https://lanik.us.co.uk/.well-known/security.txt');
	});

	it('returns 200 with empty body for HEAD requests', async () => {
		const request = new Request('https://lanik.us/.well-known/security.txt', {
			method: 'HEAD',
		});
		const response = await worker.fetch(request, makeEnv());

		expect(response.status).toBe(200);
		const body = await response.text();
		expect(body).toBe('');
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
	});

	it('returns 405 for non-GET/HEAD methods', async () => {
		const request = new Request('https://lanik.us/.well-known/security.txt', {
			method: 'POST',
		});
		const response = await worker.fetch(request, makeEnv());
		expect(response.status).toBe(405);
	});

	it('uses env vars when provided', async () => {
		const request = new Request('https://lanik.us/.well-known/security.txt');
		const response = await worker.fetch(request, makeEnv({
			CONTACT_EMAIL: 'security@example.com',
			POLICY_URL: 'https://example.com/security',
			PREFERRED_LANGUAGES: 'en,de',
		}));

		const text = await response.text();
		expect(text).toContain('Contact: mailto:security@example.com');
		expect(text).toContain('Policy: https://example.com/security');
		expect(text).toContain('Preferred-Languages: en,de');
	});

	it('passes through non-security-txt requests', async () => {
		// Verifies the worker doesn't intercept requests for non-security.txt paths.
		// The response comes from the upstream runtime (404 in the test pool).
		const request = new Request('https://lanik.us/some-other-path');
		const response = await worker.fetch(request, makeEnv());
		expect(response.status).toBe(404);
	});
});