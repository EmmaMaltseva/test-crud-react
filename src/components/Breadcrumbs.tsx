import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={'flex text-md sm:text-xl md:text-2xl font-semibold md:font-normal md:leading-normal'}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={breadcrumb.active ? 'text-gray-900 dark:text-white' : 'text-zinc-400 hover:text-gray-900 active:text-gray-900'}
          >
            <Link href={breadcrumb.href} prefetch>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-1 sm:mx-3 inline-block ">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}