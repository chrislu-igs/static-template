# 靜態資源 CDN 模版

## 首次開庫的設定步驟

1. 設定 action ci/cd 流程檔案 `.github/workflows/deploy-to-xxxx.yml` 填入以下資料
  - APP_NAME: 儲存庫名稱，例如：`https://github.com/old-ts-web/GTW_SlamWeb` 就是 `GTW_SlamWeb`
  - BRANCH_NAME: 填入要發佈的分支名稱，例如：`uat`、`master`
  - GCP_PROJECT_ID: GCP 專案 ID，例如： `${{ vars.ORG_GCP_PROJECT_ID_IGS_OLD_WEB }}`
  - GCP_TOKEN_KEY_NAME: 更新 gcp 專案金鑰名稱，例如：`ORG_GKE_KEY_FILE_IGS_OLD_WEB`
  - GCS_BUCKET_NAME: GCS 儲存桶名稱，例如：`gs://production-gametower-web-cdn`
2. 開 `伺服主機上線/異動申請單` 跟文哲申請建置的伺服主機資源 `GCS`, `CDN` ，並發信通知文哲，cc: 嘉男、阿草，內容範例如下，並附上申請單單號及截圖：
  - `cdn` 名稱同 `gcs bucket` 名稱去掉 `gs://` 開頭的部分
```
因製作
w189197 《大滿貫》美猴王第1平台製作
https://webcase.towergame.com/view.aspx?no=189197

申請相關資源

專案： igs-old-web

開發環境：
gcs bucket: gs://staging-gametower-web-cdn
cdn: staging-gametower-web-cdn
對應網址： test-web-cdn.gametower.com.tw

測試環境：
gcs bucket: gs://uat-gametower-web-cdn
cdn: uat-gametower-web-cdn
對應網址： uat-web-cdn.gametower.com.tw

正式環境：
gcs bucket: gs://production-gametower-web-cdn
cdn: production-gametower-web-cdn
對應網址： web-cdn.gametower.com.tw

```

## 圖片放置的規範

為了日後 git 用量超過使用上限，可以快速拆分圖片資源到另一個儲存庫，請依照以下規範放置圖片：

public/[站台名稱]/其下圖片檔案
例如：
- public/action/images/圖片1.png
- public/prize/images/圖片1.png

本機資料夾位： `/public/action/images/圖片1.png`
對應網址： `http://localhost:3001/action/images/圖片1.png`

本機資料夾位： `/public/prize/images/圖片1.png`
對應網址： `http://localhost:3001/prize/images/圖片1.png`

### CI/CD 的設定說明

上傳的設定在 `.github/workflows/upload-to-*.yml` 檔案中，其中有以下需要設定的環境變數：

GCS_BUCKET_NAME: GCS 儲存桶名稱，例如：`gs://production-gametower-web-cdn`
LOCAL_UPLOAD_PATH: 本地 git 目錄，例如：`public`
IGNORE_PATH_LIST: 排除不需要上傳的路徑清單，使用逗號分隔，例如：`public/exclude1,public/exclude2`

以語意說明是: 將 LOCAL_UPLOAD_PATH 內所有檔案上傳到 GCS_BUCKET_NAME 指定的 GCS 儲存桶中
並將 LOCAL_UPLOAD_PATH 內不存在的檔案刪除，如果有 IGNORE_PATH_LIST 就排除掉不處理(不上傳也不刪除)。

#### 在不拆分儲存庫的情況下，可以用以下的設定範例

```
GCS_BUCKET_NAME: gs://production-gametower-web-cdn
LOCAL_UPLOAD_PATH: "public"
```

#### 在拆分儲存庫為 action 的情況下，可以用以下的設定範例

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

## 如何在開發時使用

### 初次下載儲存庫時

```bash
# 安裝相依套件
pnpm i

# 開啟指令
pnpm dev

# 關閉指令
# 在載入指令的地方按下 ctrl + c
```

### 之後每次要使用時

```bash
# 開啟指令
pnpm dev

# 關閉指令
# 在載入指令的地方按下 ctrl + c
```

### 如何看到本機端的圖片

本機資料夾位： `/public/images/圖片1.png`
對應網址： `http://localhost:3001/images/圖片1.png`

## 如何發佈到各環境的 CDN

點 action 使用對應的環境進行建置， `test`, `uat` 環境在 push 時會自動觸發建置，`master` 需要經過 PR 合版後，手動去建置

## 上傳/同步說明

已改成使用 `deploy-static-file-to-gcs` 的共用發佈流程進行發佈