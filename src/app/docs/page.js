'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { notFound } from 'next/navigation';

export default function Docs() {
  if (process.env.NODE_ENV === "production") {
    return notFound();
  }

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <SwaggerUI url="/api/docs" />
    </div>
  );
}
