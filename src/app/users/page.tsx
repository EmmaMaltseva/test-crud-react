import UserTable from "@/components/UserTable";

export default async function Page() {
  return(
    <div className="w-full"> 
      <h1 className="text-xl text-gray-800 md:text-2xl md:leading-normal">Таблица пользователей</h1>
      <UserTable />
    </div>
  );
}