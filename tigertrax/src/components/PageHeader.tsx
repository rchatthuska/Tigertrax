// components/PageHeader.tsx
// page header with title and back button (use this instead of inlining creation of headers)

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { pageHeaderStyles } from "../styles/pageHeaderStyles";

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <View style={pageHeaderStyles.pageHeader}>
      <TouchableOpacity onPress={onBack} style={pageHeaderStyles.headerBackButton}>
        <Text style={pageHeaderStyles.headerBackButtonText}>← Back</Text>
      </TouchableOpacity>
      
      <Text style={pageHeaderStyles.pageTitle}>{title}</Text>
      <View style={{ width: 60 }} />
    </View>
  );
}