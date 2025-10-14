import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1 className="text-xl text-gray-800 md:text-3xl md:leading-normal">Тестовое задание: CRUD приложение на React</h1>
      <Link href="/users" passHref>
        <Button type="primary" size="large">Смотреть!</Button>
      </Link>
    </main>
  );
}
