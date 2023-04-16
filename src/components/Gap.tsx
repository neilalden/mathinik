import React from "react"
import { View } from "react-native"

const Gap = ({ height = 12, width = 12 }: { height?: number, width?: number }) => {
    return (<View style={{ height, width }} />)
}
export default Gap