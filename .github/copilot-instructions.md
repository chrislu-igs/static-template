# Copilot 自訂程式碼審查指令

When performing a code review, respond in Traditional Chinese.

When performing a code review, check for any hardcoded credentials (passwords, tokens, API keys).
If any are detected, mark the PR as **needs resolved**, and in the Pull Request Overview block list the first affected file path along with the message:
偵測到硬編碼密碼或憑證，請改用 Secret Manager 或 GitHub Secret 注入後移除並在 PR 中標記為已 **resolved**
Then, in the Resolved block output exactly:
偵測到硬編碼密碼或憑證，請改用 Secret Manager 或 GitHub Secret 注入後移除

When performing a code review, if any modified content includes `PersonalDataDES`, in the Pull Request Overview block display:
偵測到使用個資物件，請注意
(1) 若是 Admin 站台，必須重新審查該程式有使用到的權限項目是否符合並啟用個資旗標，不熟可找系統管理員討論
