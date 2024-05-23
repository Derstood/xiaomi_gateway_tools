// ==UserScript==
// @name         Highlight Blinking Elements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Highlight blinking elements on a specific website
// @author       Derstood
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 检查网页标题是否为“米家自动化极客版”
    function checkTitle() {
        return document.title.includes("米家自动化极客版");
    }

    // 主函数，执行高亮逻辑
    function highlightBlinkingElements() {
        const targetNode = document.body;
        // 观察器的配置（需要观察哪些变动）
        const config = {
            childList: true,
            subtree: true,
        };
        // 当观察到变动时执行的回调函数
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // 处理新添加的 .panel-log-card-blink 元素
                            if (node.classList.contains('panel-log-card-blink')) {
                                node.style.backgroundColor = 'red'; // 修改背景颜色为红色
                                node.style.border = '2px solid yellow'; // 修改边框为黄色
                            } else {
                                const blinkElement = node.querySelector('.panel-log-card-blink');
                                if (blinkElement) {
                                    blinkElement.style.backgroundColor = 'red'; // 修改背景颜色为红色
                                    blinkElement.style.border = '2px solid yellow'; // 修改边框为黄色
                                }
                            }

                            // 处理新添加的 <animate> 元素
                            if (node.tagName === 'ANIMATE') {
                                const pathElement = node.parentElement;
                                if (pathElement) {
                                     pathElement.setAttribute('stroke', 'red');
                                }
                            } else {
                                const animateElements = node.querySelectorAll('animate');
                                animateElements.forEach(animateElement => {
                                    const pathElement = animateElement.parentElement;
                                    if (pathElement) {
                                         pathElement.setAttribute('stroke', 'red');
                                    }
                                });
                            }
                        }
                    });
                }
            }
        };
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(callback);
        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config);
        // 你可以在适当的时候停止观察
        // observer.disconnect();
    }

    // 检查标题
    if (checkTitle()) {
        highlightBlinkingElements()
    }
})();
