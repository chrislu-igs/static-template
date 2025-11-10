# 圖片放置的規範

為了日後 git 用量超過使用上限，可以快速拆分圖片資源到另一個儲存庫，請依照以下規範放置圖片：

public/[站台名稱]/其下圖片檔案
例如：
- public/action/images/圖片1.png
- public/prize/images/圖片1.png

本機資料夾位： `/public/action/images/圖片1.png`
對應網址： `http://localhost:3001/action/images/圖片1.png`

本機資料夾位： `/public/prize/images/圖片1.png`
對應網址： `http://localhost:3001/prize/images/圖片1.png`

## CI/CD 的設定說明

上傳的設定在 `.github/workflows/upload-to-*.yml` 檔案中，其中有以下需要設定的環境變數：

GCS_BUCKET_NAME: GCS 儲存桶名稱，例如：`gs://production-gametower-web-cdn`
LOCAL_UPLOAD_PATH: 本地 git 目錄，例如：`public`
IGNORE_PATH_LIST: 排除不需要上傳的路徑清單，使用逗號分隔，例如：`public/exclude1,public/exclude2`

以語意說明是: 將 LOCAL_UPLOAD_PATH 內所有檔案上傳到 GCS_BUCKET_NAME 指定的 GCS 儲存桶中
並將 LOCAL_UPLOAD_PATH 內不存在的檔案刪除，如果有 IGNORE_PATH_LIST 就排除掉不處理(不上傳也不刪除)。

### 在不拆分儲存庫的情況下，可以用以下的設定範例

```
GCS_BUCKET_NAME: gs://production-gametower-web-cdn
LOCAL_UPLOAD_PATH: "public"
```

### 在拆分儲存庫為 action 的情況下，可以用以下的設定範例

新拆分的儲存庫中，請使用以下設定範例，只上傳 public/action 的圖片

```
GCS_BUCKET_NAME: "gs://production-gametower-web-cdn/action"
LOCAL_UPLOAD_PATH: "public/action"
```

在原本儲存庫中，請使用以下設定範例，上傳 public/action 以外的圖片

```
GCS_BUCKET_NAME: "gs://production-gametower-web-cdn"
IGNORE_PATH_LIST: "action"
LOCAL_UPLOAD_PATH: "public"
```