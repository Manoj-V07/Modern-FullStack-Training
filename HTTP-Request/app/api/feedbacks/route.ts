import { NextRequest, NextResponse } from "next/server";
import Feedback from "@/types/feedback";

let feedbacks: Feedback[] = [
  {
    id: 1,
    message: "Appreciated, Good Work !!",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: feedbacks,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newFeedback: Feedback = {
    id: feedbacks.length + 1,
    message: body.message,
  };

  feedbacks.push(newFeedback);

  return NextResponse.json({
    success: true,
    message: "Feedback added successfully",
    data: newFeedback,
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = Number(searchParams.get("id"));

  feedbacks = feedbacks.filter(
    (feedback) => feedback.id !== id
  );

  return NextResponse.json({
    success: true,
    message: "Feedback deleted successfully",
  });
}