"use client"
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from 'next-themes'
import { useStateContext } from '@/contexts/contextprovider';

function IconSkeleton() {
  const { resolvedTheme  } = useTheme()
  const { mounted } = useStateContext()
  if (!mounted) return null
  // const isLight = theme === "light" || theme === "system" && window.matchMedia("(prefers-color-scheme: light)").matches
  return (
    <SkeletonTheme baseColor={resolvedTheme  === "light" ? "#EBEBEB" : "#2F323D"} highlightColor={resolvedTheme  === "light" ? "#F5F5F5" : "#7C839C"}>
      <Skeleton width={24} height={24} className="rounded-full"/>
    </SkeletonTheme>
  )
}

export default IconSkeleton