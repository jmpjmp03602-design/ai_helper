import React from 'react';

export interface Attachment {
  name: string;
  type: string;
  data: string; // Base64 string
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  attachment?: Attachment;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
}