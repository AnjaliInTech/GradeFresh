import React from 'react';
import NewsForm from '@/app/components/Admin/NewsForm';
import AdminRoute from '@/app/components/Admin/AdminRoute';

const CreateNewsPage = () => {
  return (
    <AdminRoute>
      <NewsForm />
    </AdminRoute>
  );
};

export default CreateNewsPage;