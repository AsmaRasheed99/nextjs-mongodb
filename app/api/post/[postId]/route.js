import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { postId } = params;
  const { title: title, des: des} = await request.json();
  await connectMongoDB();
  await Post.findByIdAndUpdate(postId, { title, des});
  return NextResponse.json({ message: "Postupdated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { postId } = params;
  await connectMongoDB();
  const post = await Post.findOne({ _id: postId });
  return NextResponse.json({post}, { status: 200 });
}