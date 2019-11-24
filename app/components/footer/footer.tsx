import React, { memo } from "react"
import { ActivityIndicator, View } from "react-native"
import { spacing } from "@theme"

interface FooterProps {
  isLoading: boolean
}

const loadingFooter = {
  padding: spacing[2],
}

export const Footer = memo(
  (props: FooterProps) => {
    if (props.isLoading) {
      return (
        <View style={loadingFooter}>
          <ActivityIndicator size={32} />
        </View>
      )
    }
    return null
  },
  (prevProps, nextProps) => prevProps.isLoading === nextProps.isLoading,
)

Footer.displayName = "Footer"
