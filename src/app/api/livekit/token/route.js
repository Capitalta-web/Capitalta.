import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const roomName = searchParams.get('room') || 'capitalta-room';
  const participantName = searchParams.get('username') || `user-${Math.floor(Math.random() * 1000)}`;

  if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
    return NextResponse.json(
      { error: 'LiveKit credentials not configured' },
      { status: 500 }
    );
  }

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
      // Token expiration (1 hour)
      ttl: 60 * 60,
    }
  );

  at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });

  return NextResponse.json({
    token: await at.toJwt(),
    url: process.env.LIVEKIT_URL,
  });
}
