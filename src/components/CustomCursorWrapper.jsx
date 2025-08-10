"use client";

import { useMediaQuery } from 'react-responsive';
import CustomCursor from '@/src/components/TargetCursor';

export default function CustomCursorWrapper() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) return null; // Hide on mobile

  return <CustomCursor spinDuration={2} hideDefaultCursor={true} />;
}
