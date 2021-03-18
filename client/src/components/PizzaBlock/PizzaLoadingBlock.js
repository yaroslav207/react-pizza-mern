import React from "react"
import ContentLoader from "react-content-loader"

const PizzaLoadingBlock = () => (
    <ContentLoader
        speed={2}
        width={300}
        height={460}
        viewBox="0 0 300 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="130" cy="124" r="120" />
        <rect x="275" y="75" rx="0" ry="0" width="2" height="0" />
        <rect x="-1" y="252" rx="6" ry="6" width="280" height="36" />
        <rect x="2" y="299" rx="6" ry="6" width="280" height="84" />
        <rect x="6" y="404" rx="0" ry="0" width="92" height="42" />
        <rect x="127" y="406" rx="20" ry="20" width="146" height="42" />
    </ContentLoader>
)

export default PizzaLoadingBlock