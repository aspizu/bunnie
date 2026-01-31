function normalizeClassName(value: any): string {
    if (Array.isArray(value)) {
        return value.join(" ")
    }
    if (typeof value === "object" && value !== null) {
        return Object.entries(value)
            .filter(([_, isActive]) => isActive)
            .map(([className]) => className)
            .join(" ")
    }
    return String(value)
}

function renderAttributes(props: Record<string, any> | undefined): string {
    if (!props) return ""

    const attributes = Object.entries(props)
        .filter(([key, value]) => key !== "children")
        .map(([key, value]) => {
            if (key === "class" || key === "className") {
                return ["class", normalizeClassName(value)]
            }
            return [key, value]
        })
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")

    return attributes ? " " + attributes : ""
}

export function render(jsx: any): string {
    // Handle primitives
    if (typeof jsx === "string" || typeof jsx === "number") {
        return `${jsx}`
    }
    if (jsx === undefined || jsx === null || typeof jsx === "boolean") {
        return ""
    }

    // Handle arrays
    if (Array.isArray(jsx)) {
        return jsx.map(render).join("")
    }

    // Handle HTML elements
    if (typeof jsx.type === "string") {
        const attributes = renderAttributes(jsx.props)
        const children = render(jsx.props?.children)
        return `<${jsx.type}${attributes}>${children}</${jsx.type}>`
    }

    // Handle components
    const component = jsx.type
    const props = jsx.props || {}
    const rendered = component(props)
    return render(rendered)
}
