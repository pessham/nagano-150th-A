// Emergency Alert Banner Management
function closeAlert() {
    const alertBanner = document.getElementById('alert-banner');
    if (alertBanner) {
        alertBanner.classList.add('hiding');
        setTimeout(() => {
            alertBanner.style.display = 'none';
        }, 300);
    }
}

function checkAlertExpiry() {
    const alertBanner = document.getElementById('alert-banner');
    if (alertBanner) {
        const expiryDate = alertBanner.getAttribute('data-expires');
        if (expiryDate) {
            const now = new Date();
            const expiry = new Date(expiryDate);
            if (now > expiry) {
                alertBanner.style.display = 'none';
            }
        }
    }
}

// 管理者向け：アラート表示関数（ブラウザコンソールで実行可能）
function showAlert(type = 'important', category = '【重要】', title = '', message = '', linkUrl = '/news/', linkText = '詳細を見る', expiryDate = '') {
    const alertBanner = document.getElementById('alert-banner');
    if (!alertBanner) return false;
    
    // クラスをリセット
    alertBanner.className = 'alert-banner alert-' + type;
    
    // 内容を更新
    alertBanner.querySelector('.alert-category').textContent = category;
    alertBanner.querySelector('.alert-title').textContent = title;
    alertBanner.querySelector('.alert-message').textContent = message;
    alertBanner.querySelector('.alert-link').href = linkUrl;
    alertBanner.querySelector('.alert-link').textContent = linkText;
    
    // 有効期限を設定
    if (expiryDate) {
        alertBanner.setAttribute('data-expires', expiryDate);
    } else {
        alertBanner.removeAttribute('data-expires');
    }
    
    // 表示
    alertBanner.style.display = 'block';
    
    console.log('Alert displayed:', {type, category, title, message, expiryDate});
    return true;
}

// 管理者向け：アラート非表示関数
function hideAlert() {
    const alertBanner = document.getElementById('alert-banner');
    if (alertBanner) {
        alertBanner.style.display = 'none';
        console.log('Alert hidden');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // アラートの有効期限チェック
    checkAlertExpiry();
    
    // 定期的に有効期限をチェック（1分ごと）
    setInterval(checkAlertExpiry, 60000);

    // ヒーローテキストのアニメーション
    const phrases = document.querySelectorAll('.hero-text .phrase');
    
    // タイムラインノードのキーボードナビゲーション
    const timelineNodes = document.querySelectorAll('.timeline-node');
    timelineNodes.forEach(node => {
        node.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                node.click();
            }
        });
    });
    phrases.forEach((phrase, index) => {
        setTimeout(() => {
            phrase.style.opacity = 1;
            phrase.style.transform = 'translateY(0)';
        }, index * 800 + 500); // 0.8秒ごとに出現
    });

    // 背景動画の再生／停止コントロール
    const video = document.getElementById('bg-video');
    const videoBtn = document.getElementById('video-control-btn');

    // 動画の状態をデバッグ
    console.log('Video element:', video);
    console.log('Video readyState:', video.readyState);
    console.log('Video paused:', video.paused);
    console.log('Video autoplay:', video.autoplay);

    // 動画読み込み完了後に自動再生を試行
    video.addEventListener('loadeddata', function() {
        console.log('Video loaded, attempting to play...');
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video autoplay successful');
            }).catch(error => {
                console.error('Video autoplay failed:', error);
                // 自動再生失敗時の処理
                video.muted = true;
                video.play().catch(e => console.error('Muted autoplay also failed:', e));
            });
        }
    });

    // WCAG準拠: 4.5秒で動画を停止する処理
    video.addEventListener('timeupdate', function() {
        if (video.currentTime >= 4.5) {
            video.pause();
        }
    });

    // 動画が一時停止されたときにボタンの表示を更新
    video.addEventListener('pause', function() {
        videoBtn.innerHTML = '<span class="icon-play"></span>';
        videoBtn.setAttribute('aria-label', '背景動画を再生');
    });

    // 動画が再生されたときにボタンの表示を更新
    video.addEventListener('play', function() {
        videoBtn.innerHTML = '<span class="icon-pause"></span>';
        videoBtn.setAttribute('aria-label', '背景動画を一時停止');
    });

    videoBtn.addEventListener('click', () => {
        if (video.paused) {
            video.currentTime = 0; // 再生位置を最初に戻す
            video.play();
        } else {
            video.pause();
        }
    });

    // スクロールで要素をフェードインさせる
    const valueItems = document.querySelectorAll('.value-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // 一度表示したら監視を解除
            }
        });
    }, {
        threshold: 0.2
    });

    valueItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(item);
    });

    // アクセシビリティバナーの制御
    const banner = document.getElementById('video-banner');
    const disableBtn = document.getElementById('disable-autoplay');
    const closeBtn = document.getElementById('close-banner');
    
    // デバッグログを追加
    console.log('Banner element:', banner);
    console.log('Disable button:', disableBtn);
    console.log('Close button:', closeBtn);
    
    // 要素が存在する場合のみ処理を実行
    if (banner && disableBtn && closeBtn) {
        // ページ読み込み時にバナーを表示
        setTimeout(() => {
            console.log('Showing banner...');
            banner.classList.add('show');
        }, 1000); // 1秒に延長してデバッグ
    
        // 自動再生無効ボタン
        disableBtn.addEventListener('click', () => {
            video.pause();
            video.currentTime = 0;
            video.removeAttribute('autoplay');
            banner.classList.remove('show');
            localStorage.setItem('autoplay-disabled', 'true');
        });
        
        // バナー閉じるボタン
        closeBtn.addEventListener('click', () => {
            banner.classList.remove('show');
        });
        
        // 既に自動再生を無効にしている場合の処理
        if (localStorage.getItem('autoplay-disabled') === 'true') {
            video.pause();
            video.removeAttribute('autoplay');
            banner.style.display = 'none';
            return; // バナー表示処理をスキップ
        }
        
        // reduced-motion設定の確認
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            video.pause();
            video.style.display = 'none';
            banner.style.display = 'none';
            return; // バナー表示処理をスキップ
        }
        
        // 上記の条件に該当しない場合のみバナーを表示
        console.log('Ready to show banner...');
        banner.style.display = 'block'; // display: noneを上書き
        
        // 動画の自動再生状態もチェック
        console.log('Video autoplay state when showing banner:', video.autoplay);
        console.log('Video current paused state:', video.paused);
    } else {
        console.error('Banner elements not found');
    }
});
