import Breadcrumbs from "@/components/Breadcrumbs";
import UserTable from "@/components/UserTable";

export default async function Page() {
  return(
    <div className="w-full"> 
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Главная', href: '/' },
          { label: 'Пользователи', href: '/users', active: true },
        ]}
      />
      <UserTable />
    </div>
  );
}