// API route for authentication
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { kv } from '@vercel/kv';

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // Default: "password"
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export async function POST(request: NextRequest) {
  try {
    const { password, deviceFingerprint } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Compare password with hash
    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Generate JWT token with longer expiry for trusted devices
    const token = jwt.sign(
      { admin: true, deviceFingerprint },
      JWT_SECRET,
      { expiresIn: '30d' } // 30 days for trusted devices
    );

    // Store device fingerprint as trusted
    if (deviceFingerprint) {
      const trustedDevices = (await kv.get('trusted_devices') as string[]) || [];
      if (!trustedDevices.includes(deviceFingerprint)) {
        await kv.set('trusted_devices', [...trustedDevices, deviceFingerprint]);
      }
    }

    // Set HTTP-only cookie
    const response = NextResponse.json({ 
      message: 'Authentication successful',
      admin: true 
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2592000 // 30 days
    });

    return response;
  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

// Check if device is trusted
export async function GET(request: NextRequest) {
  try {
    const deviceFingerprint = request.nextUrl.searchParams.get('deviceFingerprint');
    
    if (!deviceFingerprint) {
      return NextResponse.json({ trusted: false });
    }

    const trustedDevices = (await kv.get('trusted_devices') as string[]) || [];
    const isTrusted = trustedDevices.includes(deviceFingerprint);

    // Also check if there's a valid cookie
    const token = request.cookies.get('admin_token')?.value;
    let validToken = false;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        validToken = decoded.admin && decoded.deviceFingerprint === deviceFingerprint;
      } catch (error) {
        validToken = false;
      }
    }

    return NextResponse.json({ 
      trusted: isTrusted && validToken,
      authenticated: validToken 
    });
  } catch (error) {
    console.error('Error checking device trust:', error);
    return NextResponse.json({ trusted: false });
  }
}

export async function DELETE() {
  try {
    // Clear authentication cookie
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
