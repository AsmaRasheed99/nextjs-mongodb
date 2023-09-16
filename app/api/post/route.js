import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/post";

export async function GET(request, { params }) {
  await connectMongoDB();
  const posts = await Post.find()
  return NextResponse.json({posts});
}

export async function POST(request) {
  const { title, des } = await request.json();
  console.log(title, des);
  await connectMongoDB();
  await Post.create({ title, des });
  return NextResponse.json({ message: "Created" }, { status: 201 });
}


export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ message: " deleted" }, { status: 200 });
}


