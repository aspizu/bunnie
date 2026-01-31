<p align="center">
  <img src="docs/bunnie.svg" width="64" />
  <br />
  <strong align="center">bunnie</strong>
  <hr />
</p>


bunnie lets u use Bun as the templating language in ur Rust applications.

```rs
use bunnie::{bunnie, Props};

#[tokio::main]
async fn main() {
  let mut props = Props::new();
  props.insert("variant".to_owned(), "primary".to_owned());
  let html = bunnie().render("@/components/button.jsx", props).await.unwrap();
  println!("{html}");
}
```

```jsx
export default function Button(props) {
  return <button class={[props.variant === "primary" && "bg-primary", props.variant === "secondary" && "bg-secondary"]}>{props.children}</button>;
}
```

The bunnie server runs separately from the Rust application.
the Rust application communicates with it via a unix socket.
bunnie takes requests for rendering a jsx component and serves rendered HTML.
bunnie components are `.jsx` files similar to React components.
bunnie components can be both full HTML pages or partials (for use with HTMX).

## Usage

See [bunnie-example](https://github.com/aspizu/bunnie-example) for a full Rust applicaation built using bunnie.

