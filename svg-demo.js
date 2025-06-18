// SVG Animation Demo JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const animationSpeedSlider = document.getElementById('animationSpeed');
    const svgScaleSlider = document.getElementById('svgScale');
    const opacitySlider = document.getElementById('opacity');
    const speedValue = document.getElementById('speedValue');
    const scaleValue = document.getElementById('scaleValue');
    const opacityValue = document.getElementById('opacityValue');
    const pauseButton = document.getElementById('pauseAnimation');
    const resetButton = document.getElementById('resetAnimation');
    const svgObject = document.querySelector('.animated-svg');
    
    let isPaused = false;
    
    // SVGが読み込まれた後にアニメーションを制御
    svgObject.addEventListener('load', function() {
        const svgDoc = svgObject.contentDocument;
        if (svgDoc) {
            initializeAnimationControls(svgDoc);
        }
    });
    
    function initializeAnimationControls(svgDoc) {
        const svgElement = svgDoc.querySelector('svg');
        const styleElement = svgDoc.querySelector('style');
        
        if (!svgElement || !styleElement) return;
        
        // アニメーション速度の制御
        animationSpeedSlider.addEventListener('input', function() {
            const speed = parseFloat(this.value);
            speedValue.textContent = speed + 'x';
            updateAnimationSpeed(svgDoc, speed);
        });
        
        // SVGサイズの制御
        svgScaleSlider.addEventListener('input', function() {
            const scale = parseFloat(this.value);
            scaleValue.textContent = Math.round(scale * 100) + '%';
            svgObject.style.transform = `scale(${scale})`;
        });
        
        // 透明度の制御
        opacitySlider.addEventListener('input', function() {
            const opacity = parseFloat(this.value);
            opacityValue.textContent = Math.round(opacity * 100) + '%';
            svgObject.style.opacity = opacity;
        });
        
        // アニメーション一時停止/再生
        pauseButton.addEventListener('click', function() {
            isPaused = !isPaused;
            toggleAnimation(svgDoc, isPaused);
            this.textContent = isPaused ? 'アニメーション再生' : 'アニメーション一時停止';
        });
        
        // リセット
        resetButton.addEventListener('click', function() {
            resetAllControls();
            resetAnimation(svgDoc);
        });
    }
    
    function updateAnimationSpeed(svgDoc, speed) {
        const styleElement = svgDoc.querySelector('style');
        if (!styleElement) return;
        
        let css = styleElement.innerHTML;
        
        // 各アニメーションの継続時間を調整
        const animations = [
            { name: 'drop1Animation', originalDuration: 3 },
            { name: 'drop2Animation', originalDuration: 3 },
            { name: 'drop3Animation', originalDuration: 3 },
            { name: 'poolFilling', originalDuration: 6 },
            { name: 'steamAnimation', originalDuration: 4 },
            { name: 'frameGlow', originalDuration: 8 },
            { name: 'dripperPulse', originalDuration: 4 }
        ];
        
        animations.forEach(anim => {
            const newDuration = anim.originalDuration / speed;
            const regex = new RegExp(`animation: ${anim.name} \\d+(?:\\.\\d+)?s`, 'g');
            css = css.replace(regex, `animation: ${anim.name} ${newDuration}s`);
        });
        
        styleElement.innerHTML = css;
    }
    
    function toggleAnimation(svgDoc, pause) {
        const animatedElements = svgDoc.querySelectorAll('[class*="coffee-"], [class*="steam-"], [class*="frame-"], [class*="dripper-"]');
        animatedElements.forEach(element => {
            element.style.animationPlayState = pause ? 'paused' : 'running';
        });
    }
    
    function resetAllControls() {
        animationSpeedSlider.value = 1;
        svgScaleSlider.value = 1;
        opacitySlider.value = 1;
        speedValue.textContent = '1x';
        scaleValue.textContent = '100%';
        opacityValue.textContent = '100%';
        
        svgObject.style.transform = 'scale(1)';
        svgObject.style.opacity = '1';
        
        isPaused = false;
        pauseButton.textContent = 'アニメーション一時停止';
    }
    
    function resetAnimation(svgDoc) {
        const animatedElements = svgDoc.querySelectorAll('[class*="coffee-"], [class*="steam-"], [class*="frame-"], [class*="dripper-"]');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
            element.offsetHeight; // トリガー再フロー
            element.style.animation = null;
            element.style.animationPlayState = 'running';
        });
        
        // アニメーション速度もリセット
        updateAnimationSpeed(svgDoc, 1);
    }
    
    // カラーピッカーの追加（将来の拡張用）
    function addColorControls() {
        const controlsSection = document.querySelector('.controls');
        
        const colorControlHTML = `
            <div class="control-group">
                <label for="coffeeColor">コーヒーの色:</label>
                <input type="color" id="coffeeColor" value="#8B4513">
            </div>
            <div class="control-group">
                <label for="steamColor">蒸気の色:</label>
                <input type="color" id="steamColor" value="#d4a574">
            </div>
        `;
        
        controlsSection.insertAdjacentHTML('beforeend', colorControlHTML);
        
        // カラー変更のイベントリスナー（将来の実装用）
        document.getElementById('coffeeColor').addEventListener('change', function() {
            console.log('コーヒーの色を変更:', this.value);
        });
        
        document.getElementById('steamColor').addEventListener('change', function() {
            console.log('蒸気の色を変更:', this.value);
        });
    }
    
    // 開発者向けのデバッグ情報
    console.log('🍒 MAHOT COFFEE SVG Animation Demo loaded');
    console.log('📝 カスタマイズのヒント:');
    console.log('   - svg-demo.css を編集してスタイルを永続化');
    console.log('   - img/mahot-animated.svg を直接編集してSVG構造を変更');
    console.log('   - このJSファイルを編集して新しいコントロールを追加');
});