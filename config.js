export const API配置 = {
    endpoints: {
       订阅信息: '/v1/dashboard/billing/subscription',
       使用量统计: '/v1/dashboard/billing/usage',
       调用日志: '/api/log/token'
    },
    模型价格计算: (p, c, mr, mp, cr, gr) => {
        return `提示词花费: $${(p*mr*mp).toFixed(6)}\n补全花费: $${(c*mr*mp*cr).toFixed(6)}\n总花费: $${((p*mr*mp + c*mr*mp*cr)*gr).toFixed(6)}`
    }
};
