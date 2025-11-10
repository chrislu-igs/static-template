# 錦標賽靜態資源 CDN

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