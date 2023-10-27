"use client";

import React from "react";
import styles from "styles/page.module.css";
import PropertyInfo from "../../../../components/Result/propertypage";

export default function Signup() {
  return (
    <main className={`${styles.main} flex-start flex-grow overflow-auto`}>
      <PropertyInfo />
    </main>
  );
}
