import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { childInclude, handle, requireSelf } from '../../../../../lib/server';
import { storyById, storyPrice } from '../../../../../lib/stories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ clerkId: string }> };

export const POST = handle(async (req: Request, { params }: Ctx) => {
  const { clerkId } = await params;
  await requireSelf(clerkId);

  const { storyId } = (await req.json().catch(() => ({}))) as { storyId?: string };
  const meta = storyId ? storyById(storyId) : undefined;
  if (!meta) return NextResponse.json({ error: 'story not found' }, { status: 404 });

  const child = await prisma.child.findUnique({ where: { clerkId } });
  if (!child) return NextResponse.json({ error: 'not found' }, { status: 404 });

  if (child.unlockedStories.includes(meta.id)) {
    const full = await prisma.child.findUnique({ where: { clerkId }, include: childInclude });
    return NextResponse.json(full);
  }

  const price = storyPrice(meta);
  if (child.coins < price) return NextResponse.json({ error: 'not enough coins' }, { status: 402 });

  const updated = await prisma.child.update({
    where: { id: child.id },
    data: {
      coins: { decrement: price },
      unlockedStories: { push: meta.id },
    },
    include: childInclude,
  });
  return NextResponse.json(updated);
});
