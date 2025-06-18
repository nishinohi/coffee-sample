// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ナビゲーションバーのスクロール効果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // 数値カウントアップアニメーション
            if (entry.target.classList.contains('stat-number')) {
                animateValue(entry.target);
            }
        }
    });
}, observerOptions);

// 数値アニメーション
function animateValue(element) {
    const endValue = element.textContent;
    const duration = 2000;
    let startValue = 0;
    
    // 数値以外の文字を取得
    const suffix = endValue.replace(/[0-9]/g, '');
    const numericValue = parseInt(endValue.replace(/[^0-9]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (numericValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    // フェードインアニメーション要素の監視
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // セクションのアニメーション
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('scroll-fade');
        observer.observe(section);
    });
    
    // 統計数値の監視
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
    
    // メニューアイテムの順次アニメーション
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    menuItems.forEach(item => menuObserver.observe(item));
    
    // プロセスアイテムのアニメーション
    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach(item => observer.observe(item));
});

// ヒーローSVGのパララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSvg = document.querySelector('.hero-animated-svg');
    if (heroSvg && scrolled < window.innerHeight) {
        heroSvg.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.02}deg)`;
    }
});

// マウス移動によるインタラクション
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    // ヒーローコンテンツの微細な動き
    const heroContent = document.querySelector('.hero-text-wrapper');
    if (heroContent) {
        heroContent.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
});

// 画像の遅延読み込みと表示アニメーション
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.8s ease';
            
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.onload = () => {
                    img.style.opacity = '1';
                };
            }
            
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// スクロール位置に応じたプログレスバー（将来的な実装用）
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // プログレスバー要素があれば更新
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});