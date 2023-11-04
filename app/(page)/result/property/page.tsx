"use client";

import React from "react";
import styles from "styles/page.module.css";
import PropertyInfo from "../../../../components/Result/propertypage";
import { useSearchParams  } from 'next/navigation';

export default function PropertyPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get('propertyId')
  return (
    <main className={`${styles.main} flex-grow`}>
      <PropertyInfo propertyId={search}/>
    </main>
  );
}
