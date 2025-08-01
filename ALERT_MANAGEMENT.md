# 緊急・重要情報アラート管理ガイド

## 概要
長野県150周年記念サイトのTOPページに、緊急・重要情報を表示するアラート機能を実装しています。
通常は非表示で、必要な時のみ最上段に表示される仕組みです。

## 使用場面
- **イベント中止・延期・会場変更**：台風・地震等による式典の急な変更
- **募集・申込の重要変更**：締切延長・抽選方法の変更等
- **広報トーンの一時変更**：災害時・弔意表明時の祝祭トーン抑制
- **ブランド・ロゴ利用に関する注意喚起**：不正使用発生時の対応

## 簡単な操作方法

### 1. HTMLファイルでの表示設定（推奨）

**ファイル場所**: `/index.html` の13行目から

**表示手順**:
1. `style="display: none;"` を削除または `style="display: block;"` に変更
2. 緊急度に応じてクラスを変更:
   - `alert-emergency`（赤・最重要）
   - `alert-important`（オレンジ・重要） 
   - `alert-notice`（青・お知らせ）
3. 文面を編集:
   - `alert-category`: 【緊急】【重要】【お知らせ】
   - `alert-title`: 見出し（20-30文字程度）
   - `alert-message`: 詳細説明（80-120文字程度）
   - リンク先URLを変更

**例**:
```html
<div id="alert-banner" class="alert-banner alert-emergency" style="display: block;" role="alert" data-expires="2025-08-01 18:00">
    <div class="alert-content">
        <div class="alert-main">
            <span class="alert-category">【緊急】</span>
            <span class="alert-title">本日の記念式典は緊急事態により中止いたします。</span>
            <span class="alert-message">参加予定の皆様には個別にご連絡いたします。</span>
        </div>
        <a href="/news/emergency-cancel/" class="alert-link">詳細を見る</a>
        <button class="alert-close" onclick="closeAlert()" aria-label="アラートを閉じる">&times;</button>
    </div>
</div>
```

### 2. ブラウザコンソールでの操作（上級者向け）

**表示**:
```javascript
showAlert('important', '【重要】', '記念式典の延期について', '台風接近のため8月15日に延期いたします。', '/news/', '詳細を見る', '2025-08-01 18:00');
```

**非表示**:
```javascript
hideAlert();
```

## 緊急度別の色・設定

### 🔴 緊急（alert-emergency）
- **用途**: 生命・安全に関わる重大事項
- **色**: 赤色グラデーション
- **閉じるボタン**: 無効（強制表示）
- **例**: 地震・台風による避難指示、式典の緊急中止

### 🟠 重要（alert-important）
- **用途**: イベント変更・重要な告知
- **色**: オレンジ色グラデーション  
- **閉じるボタン**: 有効
- **例**: 記念式典の延期、応募締切の変更

### 🔵 お知らせ（alert-notice）
- **用途**: 一般的な重要情報
- **色**: 青色グラデーション
- **閉じるボタン**: 有効
- **例**: 交通規制情報、駐車場案内

## 自動消去機能

`data-expires` 属性に終了日時を設定すると、自動的に非表示になります。

**設定例**:
```html
data-expires="2025-08-01 18:00"
```

**形式**: YYYY-MM-DD HH:MM

## アクセシビリティ対応

- **role="alert"**: スクリーンリーダーが警告として認識
- **キーボードナビゲーション**: Tabキーでフォーカス可能
- **カラーコントラスト**: WCAG AA準拠
- **文字サイズ**: モバイルでも読みやすい大きさ

## 運用ガバナンス

### 掲出基準
- 県全体への影響がある事項
- 参加者の安全に関わる事項
- 運営判断が必要な重要事項

### 承認フロー
1. **県側決裁**: 担当部署での内容確認・承認
2. **技術確認**: 2名以上での確認後に反映
3. **効果測定**: 表示後の反響・効果を記録

### 文面ガイドライン
- **見出し**: 20-30文字以内
- **本文**: 80-120文字以内
- **リンク**: 詳細情報への適切な誘導
- **敬語**: です・ます調で統一

## トラブルシューティング

### 表示されない場合
1. `style="display: none;"` が設定されていないか確認
2. HTMLの構文エラーがないか確認
3. ブラウザキャッシュをクリア

### デザインが崩れる場合
1. クラス名が正しく設定されているか確認
2. 文字数が想定範囲内か確認
3. CSSファイルが正しく読み込まれているか確認

### 自動消去されない場合
1. `data-expires` の日時形式が正しいか確認
2. JavaScriptエラーがないかコンソールで確認

## お問い合わせ

技術的な問題や設定方法についてご不明な点がございましたら、開発チームまでお問い合わせください。

---
*最終更新: 2025年7月26日*