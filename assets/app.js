import { API配置 } from './config';
import axios from 'axios';
import { renderTimestamp, renderUseTime, stringToColor } from './utils';
import { copy, exportCSV } from './functions';

// 初始化状态
const initialState = {
    apikey: '',
    activeTabKey: 'API.kaka11.top',
    tabData: {},
    loading: false,
    activeKeys: [],
    pageSize: 10
};

// 渲染函数
function renderContent() {
    return `
        <div class="container">
            <!-- 输入框 -->
            <div class="input-container">
                <input 
                    type="text"
                    value="${initialState.apikey}"
                    onChange={(e) => setAPIKey(e.target.value)}
                    placeholder="请输入令牌 sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    onKeyPress={(e) => e.key === 'Enter' && fetchData()}
                >
                <button 
                    class="primary-btn"
                    ${initialState.apikey ? '' : 'disabled'}
                    onClick={fetchData}
                >
                    ${initialState.loading ? '查询中...' : '查询'}
                </button>
            </div>

            <!-- 标签页 -->
            <div class="tabs-container">
                ${Object.entries(API配置.baseUrls).map(([key, url]) => `
                    <div 
                        class="tab-item ${initialState.activeTabKey === key ? 'active' : ''}"
                        onClick={() => setActiveTabKey(key)}
                    >
                        ${key}
                    </div>
                `).join('')}
            </div>

            <!-- 主内容 -->
            <div class="main-content">
                ${initialState.loading ? `
                    <div class="spin-container">
                        <div class="spin"></div>
                    </div>
                ` : `
                    <!-- 令牌信息面板 -->
                    <div class="collapse-panel">
                        <div class="panel-header">
                            <span>令牌信息</span>
                            <button 
                                class="copy-btn"
                                onClick=${initialState.tokenValid ? `() => copyTokenInfo()` : 'disabled'}
                            >
                                <i class="semi-icon semi-icon-copy"></i>
                            </button>
                        </div>
                        <div class="panel-content">
                            ${getBalancePanelContent()}
                        </div>
                    </div>

                    <!-- 调用详情面板 -->
                    <div class="collapse-panel">
                        <div class="panel-header">
                            <span>调用详情</span>
                            <button 
                                class="export-btn"
                                ${initialState.logs.length > 0 ? '' : 'disabled'}
                                onClick=${`() => exportCSV()`}
                            >
                                <i class="semi-icon semi-icon-download"></i>
                            </button>
                        </div>
                        <div class="panel-content">
                            ${getTableContent()}
                        </div>
                    </div>
                `}
            </div>
        </div>
    `;
}

// 辅助函数
function getBalancePanelContent() {
    const { balance, usage, accessdate, tokenValid } = tabData[activeTabKey] || {};
    return `
        <div class="balance-info">
            <div class="info-item">
                <span>令牌总额：</span>
                ${balance === '无限' ? '<div class="tag green">无限</div>' : 
                    `<div class="tag blue">${balance.toFixed(3)}</div>`}
            </div>
            <div class="info-item">
                <span>剩余额度：</span>
                ${getQuotaText(balance, usage)}
            </div>
            <div class="info-item">
                <span>有效期至：</span>
                ${renderTimestamp(accessdate)}
            </div>
        </div>
    `;
}

function getTableContent() {
    return `
        <table class="semi-table">
            <thead>
                <tr>
                    <th>时间</th>
                    <th>模型</th>
                    <th>用时</th>
                    <th>提示</th>
                    <th>补全</th>
                    <th>花费</th>
                    <th>详情</th>
                </tr>
            </thead>
            <tbody>
                ${initialState.logs.map(log => `
                    <tr>
                        <td>${renderTimestamp(log.created_at)}</td>
                        <td>
                            <div class="tag grey" onClick={() => copy(log.token_name)}>${log.token_name}</div>
                        </td>
                        <td>${renderUseTime(log.use_time)}</td>
                        <td>${log.prompt_tokens}</td>
                        <td>${log.completion_tokens}</td>
                        <td>${renderQuota(log.quota)}</td>
                        <td>
                            <div class="tooltip" title="${log.content}">
                                ${log.content.slice(0, 50)}...
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// 事件处理函数
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerHTML = renderContent();
    document.querySelector('.copy-btn').addEventListener('click', copyTokenInfo);
    document.querySelector('.export-btn').addEventListener('click', exportCSV);
});
