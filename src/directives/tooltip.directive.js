export default {
    bind(el, { value }) {
        if (typeof value === 'object' && value !== null) {
            M.Tooltip.init(el, value)
        }
        else {
            M.Tooltip.init(el, { html: value })
        }
    },

    unbind(el) {
        const tooltip = M.Tooltip.getInstance(el)

        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}