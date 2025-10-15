'use client';

import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
}

export default function AppBreadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  const items = breadcrumbs.map((item, index) => {
    const isFirst = index === 0;
    const isLast = index === breadcrumbs.length - 1;

    return {
      key: item.href,
      title: isLast ? (
        <span className="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl font-semibold">
          {item.label}
        </span>
      ) : (
        <Link
          href={item.href}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-lg sm:text-xl md:text-2xl font-semibold"
        >
          {item.label}
        </Link>
      ),
      icon: isFirst ? <HomeOutlined style={{ fontSize: '1.2rem' }} /> : undefined,
    };
  });

  return (
    <div className="mb-6">
      <Breadcrumb items={items} separator={<span className="text-lg sm:text-xl md:text-2xl">/</span>}  />
    </div>
  );
}
