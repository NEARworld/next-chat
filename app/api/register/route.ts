import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new Response('Missing info', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const found = await prisma.user.findUnique({ where: { email } });

    if (found)
      return NextResponse.json('이미 존재하는 회원입니다.', { status: 400 });

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return Response.json(user);
  } catch (error) {
    console.log(error, 'REGISTRATION ERROR');
    return new Response('Internal Error', { status: 500 });
  }
}
