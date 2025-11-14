import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const RESPONSES_FILE = path.join(process.cwd(), 'data', 'survey_responses.json');

const ensureDataDir = () => {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export async function POST(request: Request) {
  try {
    ensureDataDir();
    
    const { groupType, responses, createdAt } = await request.json();

    let allResponses = [];
    if (fs.existsSync(RESPONSES_FILE)) {
      const data = fs.readFileSync(RESPONSES_FILE, 'utf-8');
      allResponses = JSON.parse(data);
    }

    allResponses.push({
      id: allResponses.length + 1,
      groupType,
      responses,
      createdAt,
    });

    fs.writeFileSync(RESPONSES_FILE, JSON.stringify(allResponses, null, 2));

    return NextResponse.json({ success: true, totalResponses: allResponses.length });
  } catch (error) {
    console.error('❌ Ошибка:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function GET() {
  try {
    ensureDataDir();

    if (!fs.existsSync(RESPONSES_FILE)) {
      return NextResponse.json({ responses: [] });
    }

    const data = fs.readFileSync(RESPONSES_FILE, 'utf-8');
    const responses = JSON.parse(data);

    return NextResponse.json({ responses });
  } catch (error) {
    console.error('❌ Ошибка:', error);
    return NextResponse.json({ error: 'Failed to read' }, { status: 500 });
  }
}

// ✅ НОВЫЙ DELETE МЕТОД - ОЧИСТКА ОТВЕТОВ
export async function DELETE(request: Request) {
  try {
    ensureDataDir();

    // Проверяем пароль (опционально)
    const { password } = await request.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    if (fs.existsSync(RESPONSES_FILE)) {
      fs.unlinkSync(RESPONSES_FILE);
    }

    return NextResponse.json({ success: true, message: 'All responses deleted' });
  } catch (error) {
    console.error('❌ Ошибка:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
