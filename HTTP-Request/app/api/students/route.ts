import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/types/student";

let students: Student[] = [
  {
    id: 1,
    name: "Manoj",
    age: 20,
    department: "Computer Science",
  },
  {
    id: 2,
    name: "Rahul",
    age: 21,
    department: "Information Technology",
  },
  {
    id: 3,
    name: "Priya",
    age: 22,
    department: "Electronics",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: students,
  });
}


export async function POST(request: NextRequest) {
  const body = await request.json();

  const newStudent: Student = {
    id: students.length + 1,
    name: body.name,
    age: body.age,
    department: body.department,
  };

  students.push(newStudent);

  return NextResponse.json(
    {
      success: true,
      message: "Student added successfully",
      data: newStudent,
    },
    { status: 201 }
  );
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = Number(searchParams.get("id"));

  const body = await request.json();

  const studentIndex = students.findIndex(
    (student) => student.id === id
  );

  if (studentIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        message: "Student not found",
      },
      { status: 404 }
    );
  }

  students[studentIndex] = {
    ...students[studentIndex],
    ...body,
  };

  return NextResponse.json({
    success: true,
    message: "Student updated successfully",
    data: students[studentIndex],
  });
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = Number(searchParams.get("id"));

  const body = await request.json();

  const studentIndex = students.findIndex(
    (student) => student.id === id
  );

  if (studentIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        message: "Student not found",
      },
      { status: 404 }
    );
  }

  students[studentIndex] = {
    ...students[studentIndex],
    ...body,
  };

  return NextResponse.json({
    success: true,
    message: "Student updated successfully",
    data: students[studentIndex],
  });
}

export async function DELETE(request : NextRequest){
  const body = await request.json();

  const filteredStudent = students.filter((student) => {
    return student.id !== body.id;
  })

  students = [...filteredStudent];

  return NextResponse.json({
    success : true,
    status : 204,
    message : "Student deleted successfully"
  })
}