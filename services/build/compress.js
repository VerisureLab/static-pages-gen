const minifyHtml = require('@minify-html/js');

module.exports.compress = html => {
    const cfg = minifyHtml.createConfiguration({
        ensure_spec_compliant_unquoted_attribute_values: false,
        keep_closing_tags: true,
        keep_html_and_head_opening_tags: true,
        keep_spaces_between_attributes: true,
        keep_comments: false,
        minify_css: true,
        minify_js: true,
        do_not_minify_doctype: true,
        remove_bangs: false,
        remove_processing_instructions: true,
    });
    const minified = minifyHtml.minify(html, cfg);
    return minified;
}