import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-5 min-h-[100dvh] container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-12">
      <h1 className="text-xl text-gray-800 md:text-3xl md:leading-normal text-center dark:text-white">Тестовое задание: CRUD приложение на React</h1>
      <Link href="/users" passHref>
        <Button type="primary" size="large">Вперёд!</Button>
      </Link>
    </main>
  );
}
