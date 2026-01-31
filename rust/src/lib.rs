use std::{collections::BTreeMap, sync::OnceLock};

pub type Props = BTreeMap<String, serde_json::Value>;

pub struct Bunnie {
    client: reqwest::Client,
}

impl Bunnie {
    pub fn new() -> Self {
        Bunnie {
            client: reqwest::Client::builder()
                .unix_socket("/tmp/bunnie.sock")
                .build()
                .unwrap(),
        }
    }

    pub async fn render(&self, component: &str, props: Props) -> reqwest::Result<String> {
        let res = self
            .client
            .post("http://127.0.0.1/")
            .json(&serde_json::json!({
                "component": component,
                "props": props,
            }))
            .send()
            .await?;
        res.text().await
    }
}

pub fn bunnie() -> &'static Bunnie {
    static INSTANCE: OnceLock<Bunnie> = OnceLock::new();
    INSTANCE.get_or_init(|| Bunnie::new())
}
