// Quiz Admin Authentication - Separate from CMS admin
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { kvGet, kvSet } from '../../../../lib/kv-store';

// Production should use QUIZ_ADMIN_PASSWORD_HASH (SHA-256 hex string)
// Local dev can fallback to QUIZ_ADMIN_PASSWORD (plain text)
const QUIZ_ADMIN_PASSWORD_HASH = process.env.QUIZ_ADMIN_PASSWORD_HASH || '';
const QUIZ_ADMIN_PASSWORD = process.env.QUIZ_ADMIN_PASSWORD || '';

function sha256Hex(text: string): string {
  return createHash('sha256').update(text).digest('hex');
}

// Helper to get expected hash 
function getExpectedHash(): string {
  if (QUIZ_ADMIN_PASSWORD_HASH) return QUIZ_ADMIN_PASSWORD_HASH;
  if (QUIZ_ADMIN_PASSWORD) return sha256Hex(QUIZ_ADMIN_PASSWORD);
  return '';
}

// POST: Login with password
export async function POST(request: NextRequest) {
  try {
    const { password, deviceFingerprint } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const expectedHash = getExpectedHash();
    if (!expectedHash) {
      console.error('Quiz admin password is not configured in environment variables');
      return NextResponse.json({ error: 'Quiz admin not configured' }, { status: 500 });
    }

    // Hash the incoming password 
    const incomingHash = sha256Hex(password);
    const isValid = incomingHash === expectedHash;

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Generate token for cookie (use the expected hash in the payload to obscure the real password)
    const tokenPayload = `quiz_admin:${expectedHash}:${deviceFingerprint || 'no-fp'}`;
    const token = sha256Hex(tokenPayload);

    // Store token
    const validTokens = (await kvGet('quiz:admin_tokens') as string[]) || [];
    if (!validTokens.includes(token)) {
      await kvSet('quiz:admin_tokens', [...validTokens, token]);
    }

    // Store device fingerprint
    if (deviceFingerprint) {
      const trustedDevices = (await kvGet('quiz:admin_sessions') as string[]) || [];
      if (!trustedDevices.includes(deviceFingerprint)) {
        await kvSet('quiz:admin_sessions', [...trustedDevices, deviceFingerprint]);
      }
    }

    const response = NextResponse.json({ 
      message: 'Authentication successful',
      authenticated: true 
    });

    response.cookies.set('quiz_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 * 7
    });

    return response;
  } catch (error) {
    console.error('Quiz auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

// GET: Check if already authenticated
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('quiz_admin_token')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    const validTokens = (await kvGet('quiz:admin_tokens') as string[]) || [];
    if (validTokens.length > 0) {
      return NextResponse.json({ authenticated: validTokens.includes(token) });
    }

    // Fallback for local dev: re-verify token
    const expectedHash = getExpectedHash();
    if (expectedHash) {
      const expectedToken = sha256Hex(`quiz_admin:${expectedHash}:no-fp`);
      return NextResponse.json({ authenticated: token === expectedToken });
    }

    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error('Quiz auth check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}

// DELETE: Logout
export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('quiz_admin_token')?.value;
    if (token) {
      const validTokens = (await kvGet('quiz:admin_tokens') as string[]) || [];
      await kvSet('quiz:admin_tokens', validTokens.filter((t: string) => t !== token));
    }

    const response = NextResponse.json({ message: 'Logged out' });
    response.cookies.set('quiz_admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    });
    return response;
  } catch (error) {
    console.error('Quiz logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
