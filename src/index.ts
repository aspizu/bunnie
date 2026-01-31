import {render} from "./render"

export interface Options {
    unix?: string
}

export interface Payload {
    component: string
    props?: any
}

export function serve(hook: (path: string) => Promise<any>, opts: Options = {}): void {
    Bun.serve({
        unix: opts.unix || "/tmp/bunnie.sock",
        development: false,
        async fetch(request) {
            const payload = (await request.json()) as Payload
            const component = await hook(payload.component)
            const jsx = component.default(payload.props)
            const html = render(jsx)
            return new Response(`${html}\n`)
        },
    })
}
