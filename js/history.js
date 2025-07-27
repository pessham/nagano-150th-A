document.addEventListener('DOMContentLoaded', function() {
    // タイムライン機能の初期化
    initializeTimeline();
    
    // 時代別タブ機能の初期化
    initializeEraTabs();
    
    // フィルター・表示切り替え機能の初期化
    initializeViewControls();
});

function initializeTimeline() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const detailPanel = document.querySelector('.timeline-detail-panel');
    
    timelineNodes.forEach(node => {
        node.addEventListener('click', function() {
            const year = this.dataset.year;
            showTimelineDetail(year);
            
            // アクティブノードの更新
            timelineNodes.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
        });
        
        // キーボードナビゲーション
        node.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function showTimelineDetail(year) {
    const detailContents = document.querySelectorAll('.detail-content');
    const targetDetail = document.getElementById(`detail-${year}`);
    const defaultDetail = document.getElementById('detail-default');
    
    // すべての詳細コンテンツを非表示
    detailContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    // 対象年の詳細があれば表示、なければデフォルト表示
    if (targetDetail) {
        targetDetail.classList.add('active');
        targetDetail.style.display = 'block';
    } else {
        // 動的に詳細コンテンツを生成（簡易版）
        showDynamicDetail(year);
    }
}

function showDynamicDetail(year) {
    const detailPanel = document.querySelector('.timeline-detail-panel');
    const defaultDetail = document.getElementById('detail-default');
    
    // 簡易的な年代情報を表示
    const yearData = getYearData(year);
    if (yearData) {
        const dynamicContent = createDynamicDetailContent(yearData);
        
        // 既存の動的コンテンツがあれば削除
        const existingDynamic = document.getElementById('detail-dynamic');
        if (existingDynamic) {
            existingDynamic.remove();
        }
        
        detailPanel.appendChild(dynamicContent);
        dynamicContent.classList.add('active');
        dynamicContent.style.display = 'block';
    } else {
        defaultDetail.classList.add('active');
        defaultDetail.style.display = 'block';
    }
}

function getYearData(year) {
    const yearDatabase = {
        '1885': {
            title: '長野師範学校設立',
            category: 'culture',
            description: '教育県長野の基盤となる師範学校が設立され、優秀な教員の養成が始まりました。',
            impact: '高い教育水準の確立により、長野県の人材育成力が向上しました。',
            learning: '教育への投資が地域の発展につながることを示した重要な出来事です。'
        },
        '1888': {
            title: '上田製糸場操業開始',
            category: 'economy',
            description: '製糸業の発展により、長野県の近代産業化が本格的に始まりました。',
            impact: '女性の社会参加が進み、県の経済基盤が大きく発展しました。',
            learning: '地域資源を活かした産業発展のモデルケースとなりました。'
        },
        '1949': {
            title: '信州大学設立',
            category: 'culture',
            description: '戦後の学制改革により、県内の高等教育機関が統合され信州大学が設立されました。',
            impact: '県内での高等教育機会が拡充し、研究開発の基盤が整備されました。',
            learning: '高等教育の充実が地域の知的資源蓄積につながることを示しました。'
        },
        '1975': {
            title: '精密機械工業の発展',
            category: 'economy',
            description: '時計産業から発展した精密機械技術が、現在の長野県製造業の基盤となりました。',
            impact: '高付加価値製造業への転換により、県経済の競争力が向上しました。',
            learning: '技術の継承と発展が産業の持続的成長をもたらすことを証明しました。'
        }
    };
    
    return yearDatabase[year] || null;
}

function createDynamicDetailContent(data) {
    const content = document.createElement('div');
    content.className = 'detail-content';
    content.id = 'detail-dynamic';
    
    const categoryClass = data.category;
    const categoryName = getCategoryName(data.category);
    
    content.innerHTML = `
        <h3>${data.title}</h3>
        <h4 class="detail-category ${categoryClass}">${categoryName}</h4>
        <h5>${data.title}</h5>
        
        <div class="detail-body">
            <div class="historical-context">
                <h6>概要</h6>
                <p>${data.description}</p>
            </div>
            
            <div class="impact-analysis">
                <h6>当時の影響</h6>
                <p>${data.impact}</p>
            </div>
            
            <div class="learning-points">
                <h6>現代への学び</h6>
                <p>${data.learning}</p>
            </div>
        </div>
    `;
    
    return content;
}

function getCategoryName(category) {
    const categoryNames = {
        'politics': '政治・行政',
        'economy': '経済・産業',
        'culture': '文化・教育',
        'disaster': '災害・復興'
    };
    return categoryNames[category] || '一般';
}

function initializeEraTabs() {
    const eraTabs = document.querySelectorAll('.era-tab');
    const eraContents = document.querySelectorAll('.era-content');
    
    eraTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetEra = this.dataset.era;
            
            // タブの状態更新
            eraTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // コンテンツの表示切り替え
            eraContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetEra) {
                    content.classList.add('active');
                }
            });
        });
    });
}

function initializeViewControls() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const timelineView = document.getElementById('timeline-view');
    const listView = document.getElementById('list-view');
    
    // フィルターボタンの制御
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // ボタンの状態更新
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // フィルター適用
            applyFilter(filter);
        });
    });
    
    // 表示切り替えボタンの制御
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // ボタンの状態更新
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 表示切り替え
            switchView(view);
        });
    });
}

function applyFilter(filter) {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const historyEntries = document.querySelectorAll('.history-entry');
    
    // タイムラインノードのフィルタリング
    timelineNodes.forEach(node => {
        const category = node.dataset.category;
        const importance = node.dataset.importance;
        
        let shouldShow = false;
        
        if (filter === 'all') {
            shouldShow = true;
        } else if (filter === 'important') {
            shouldShow = importance === 'high';
        } else {
            shouldShow = category === filter;
        }
        
        if (shouldShow) {
            node.style.display = 'block';
            node.style.opacity = '1';
        } else {
            node.style.display = 'none';
            node.style.opacity = '0.3';
        }
    });
    
    // リストエントリのフィルタリング
    historyEntries.forEach(entry => {
        const category = entry.dataset.category;
        const importance = entry.dataset.importance;
        
        let shouldShow = false;
        
        if (filter === 'all') {
            shouldShow = true;
        } else if (filter === 'important') {
            shouldShow = importance === 'high';
        } else {
            shouldShow = category === filter;
        }
        
        if (shouldShow) {
            entry.style.display = 'flex';
        } else {
            entry.style.display = 'none';
        }
    });
}

function switchView(view) {
    const timelineView = document.getElementById('timeline-view');
    const listView = document.getElementById('list-view');
    
    switch (view) {
        case 'timeline':
            timelineView.style.display = 'block';
            listView.style.display = 'none';
            break;
        case 'list':
            timelineView.style.display = 'none';
            listView.style.display = 'block';
            break;
        case 'print':
            // 印刷用表示への切り替え
            window.print();
            break;
    }
}

// スクロールでタイムラインノードをアニメーション
function initializeScrollAnimations() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    timelineNodes.forEach(node => {
        observer.observe(node);
    });
}

// 初期化完了後にスクロールアニメーションを開始
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeScrollAnimations, 500);
});