'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import NewsForm from '@/app/components/Admin/NewsForm';
import AdminRoute from '@/app/components/Admin/AdminRoute';

const EditNewsPage = () => {
  const params = useParams();
  const newsId = params.id as string;

  return (
    <AdminRoute>
      <NewsForm editMode={true} newsId={newsId} />
    </AdminRoute>
  );
};

export default EditNewsPage;