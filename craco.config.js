const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#F59337',
                            '@error-color': '#f25b5b',

                            // Table
                            // --
                            '@table-bg': '#383b46',
                            '@table-header-bg': '#3c3e49',
                            '@table-row-hover-bg': '#383a44',
                            '@table-border-color': '#333541',
                            // @table-border-radius-base: @border-radius-base;
                            // @table-footer-bg: @background-color-light;
                            // @table-footer-color: @heading-color;
                            // @table-header-bg-sm: @table-header-bg;
                            // @table-header-cell-split-color: rgba(0, 0, 0, 0.06);
                            // // Sorter
                            // // Legacy: `table-header-sort-active-bg` is used for hover not real active
                            // @table-header-sort-active-bg: rgba(0, 0, 0, 0.04);
                            // @table-fixed-header-sort-active-bg: hsv(0, 0, 96%);

                            // // Filter
                            // @table-header-filter-active-bg: rgba(0, 0, 0, 0.04);
                            // @table-filter-btns-bg: inherit;
                            // @table-filter-dropdown-bg: @component-background;
                            // @table-expand-icon-bg: @component-background;
                            // @table-selection-column-width: 32px;
                            // // Sticky
                            // @table-sticky-scroll-bar-bg: fade(#000, 35%);
                            // @table-sticky-scroll-bar-radius: 4px;
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
